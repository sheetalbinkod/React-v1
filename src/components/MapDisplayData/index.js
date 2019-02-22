// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
import { loadModules } from 'react-arcgis';
// components
import LoadingSpinner from 'components/LoadingSpinner';
// contexts
import { MapContext } from 'contexts/Map';
// services
import { apiUrl } from 'services/webService';
// common esri config
import { commonFields, commonRenderer, commonPopupTemplate } from './esri';
// styles
import './styles.css';

// --- styled components ---
const Loading = styled(LoadingSpinner)`
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
`;

// --- components ---
type Props = {
  map: any, // esri.Map
  view: any, // esri.views.MapView
};

type State = {
  communityBoundaries: any,
  airGrantSensors: any,
  regulatorySensors: any,
  purpleAirSensors: any,
};

class MapData extends React.Component<Props, State> {
  state = {
    communityBoundaries: null,
    airGrantSensors: null,
    regulatorySensors: null,
    purpleAirSensors: null,
  };

  esriModules = {}; // esri modules loaded in cDM();

  static contextType = MapContext;

  handleViewClicks = () => {
    // capture click events on the view and pass along clicked graphic
    this.props.view.on('click', (event) => {
      this.props.view
        .hitTest(event)
        .then((response) => {
          const result = response.results[0];
          if (result && result.graphic) return result.graphic;
        })
        .then((graphic) => {
          if (graphic) {
            // a graphic in a layer was clicked
            this.handleGraphicClick(graphic);
          } else {
            // no graphic in any layer clicked
            this.context.setLocationFocus('state');
            this.context.setActiveCommunity('');
            this.context.setActiveAirGrant('');
          }
        });
    });
  };

  handleGraphicClick = (graphic) => {
    switch (graphic.layer.id) {
      case 'selected-communities':
        this.context.setLocationFocus('community');
        this.context.setActiveCommunity({
          name: graphic.attributes['NAME'],
          geo: graphic.geometry,
        });
        this.context.setActiveAirGrant({ name: '', geo: null });
        break;

      case 'airgrant-sensors':
        this.context.setLocationFocus('grant');
        this.context.setActiveCommunity({ name: '', geo: null });
        this.context.setActiveAirGrant({
          name: graphic.attributes['title'],
          geo: graphic.geometry,
        });
        break;

      default:
        this.context.setLocationFocus('state');
        this.context.setActiveCommunity({ name: '', geo: null });
        this.context.setActiveAirGrant({ name: '', geo: null });
    }
  };

  // --- community boundaries ---
  fetchCommunityBoundaries = () => {
    const { FeatureLayer } = this.esriModules;

    // extend commonRenderer w/ layer specific styles
    const markerRenderer = {
      ...commonRenderer,
      symbol: {
        ...commonRenderer.symbol,
        color: [30, 138, 191, 0.875], // #1e8abf
        size: '20px',
        style: 'diamond',
      },
    };

    const popupTemplate = {
      title: '{Name}',
      // content: [{ }],
    };

    // https://erg.maps.arcgis.com/home/webmap/viewer.html?webmap=98aa884234ce4ab2a95b0bfeeae82d2a
    const layer = new FeatureLayer({
      id: 'selected-communities',
      title: 'AB 617 Selected Communities',
      url:
        'https://services1.arcgis.com/BN5Mj6q47j71sqyJ/arcgis/rest/services/draft_boundaries/FeatureServer/0',
      renderer: markerRenderer,
      popupTemplate,
      visible: true,
    });

    this.props.map.add(layer, 0);
    this.props.view
      .whenLayerView(layer)
      .then((layerView) => this.setState({ communityBoundaries: true }))
      .catch((err) => {
        console.error(err);
        this.setState({ communityBoundaries: true });
      });
  };

  updateCommunityBoundaries = () => {
    const { map, view } = this.props;
    const { watchUtils } = this.esriModules;

    // get community boundaries layer from map
    const layer = map.findLayerById('selected-communities');

    // marker renderer for when map is zoomed out (extend commonRenderer w/ layer specific styles)
    const markerRenderer = {
      ...commonRenderer,
      symbol: {
        ...commonRenderer.symbol,
        color: [30, 138, 191, 0.875], // #1e8abf
        size: '20px',
        style: 'diamond',
      },
    };

    // fill renderer for when map is zoomed in
    const fillRenderer = {
      type: 'simple', // autocasts as new SimpleRenderer()
      symbol: {
        type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        color: [30, 138, 191, 0.75], // #1e8abf
        style: 'solid',
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255, 0.875], // #fff
          width: '1px',
        },
      },
    };

    // watch view zoom changes
    watchUtils.whenTrue(view, 'stationary', function() {
      const type = layer.renderer.symbol.type; // layer's current renderer type
      if (view.zoom <= 7) {
        // if zoomed out, use marker renderer
        if (type !== 'simple-marker') layer.renderer = markerRenderer;
      } else {
        // else zoomed in, so use fill renderer
        if (type !== 'simple-fill') layer.renderer = fillRenderer;
      }
    });
  };

  // --- air grants ---
  fetchAirGrantSensors = () => {
    // TEMP: air grant sensors and regulatory sensors both use this web service endpoint for now
    fetch(`${apiUrl}/Monitors`)
      .then((res) => res.json())
      .then((data) => {
        // return early if data doesn't exist
        if (data.length <= 0) {
          this.setState({ airGrantSensors: true });
          return;
        }

        // because we're using the same data for air grant sensors and regulatory sensors, split data
        // in half and use first half for air grant sensors and last half for regulatory sensors
        const halfIndex = Math.floor(data.length / 2);
        const firstHalf = data.slice(0, halfIndex);
        // const lastHalf = data.slice(halfIndex, data.length);
        this.plotAirGrantSensors(firstHalf);
      })
      .catch((err) => {
        console.error(err);
        this.setState({ airGrantSensors: true });
      });
  };

  plotAirGrantSensors = (data) => {
    const { FeatureLayer, Point } = this.esriModules;

    // extend commonRenderer w/ layer specific styles
    const markerRenderer = {
      ...commonRenderer,
      symbol: {
        ...commonRenderer.symbol,
        color: [256, 183, 43, 0.75], // #fdb72b
        size: '16px',
        style: 'square',
      },
    };

    const features = data.map((location, index) => ({
      geometry: new Point({
        latitude: location.latitude,
        longitude: location.longitude,
      }),
      attributes: {
        ObjectID: index,
        title: location.monitorName,
      },
    }));

    const layer = new FeatureLayer({
      id: 'airgrant-sensors',
      title: 'Air Grant Sensors',
      source: features, // autocast as a Collection of new Graphic()
      objectIdField: 'ObjectID',
      fields: commonFields,
      renderer: markerRenderer,
      popupTemplate: commonPopupTemplate,
      visible: true,
    });

    this.props.map.add(layer, -1);
    this.props.view
      .whenLayerView(layer)
      .then((layerView) => this.setState({ airGrantSensors: true }))
      .catch((err) => console.error(err));
  };

  // --- regulatory sensors ---
  fetchRegulatorySensors = () => {
    // TEMP: air grant sensors and regulatory sensors both use this web service endpoint for now
    fetch(`${apiUrl}/Monitors`)
      .then((res) => res.json())
      .then((data) => {
        // return early if data doesn't exist
        if (data.length <= 0) {
          this.setState({ regulatorySensors: true });
          return;
        }

        // because we're using the same data for air grant sensors and regulatory sensors, split data
        // in half and use first half for air grant sensors and last half for regulatory sensors
        const halfIndex = Math.floor(data.length / 2);
        // const firstHalf = data.slice(0, halfIndex);
        const lastHalf = data.slice(halfIndex, data.length);
        this.plotRegulatorySensors(lastHalf);
      })
      .catch((err) => {
        console.error(err);
        this.setState({ regulatorySensors: true });
      });
  };

  plotRegulatorySensors = (data) => {
    const { FeatureLayer, Point } = this.esriModules;

    // extend commonRenderer w/ layer specific styles
    const markerRenderer = {
      ...commonRenderer,
      symbol: {
        ...commonRenderer.symbol,
        color: [46, 172, 155, 0.75], // #2eac9b
      },
    };

    const features = data.map((location, index) => ({
      geometry: new Point({
        latitude: location.latitude,
        longitude: location.longitude,
      }),
      attributes: {
        ObjectID: index,
        title: location.monitorName,
      },
    }));

    const layer = new FeatureLayer({
      id: 'regulatory-sensors',
      title: 'Regulatory Sensors',
      source: features, // autocast as a Collection of new Graphic()
      objectIdField: 'ObjectID',
      fields: commonFields,
      renderer: markerRenderer,
      popupTemplate: commonPopupTemplate,
      visible: true,
    });

    this.props.map.add(layer, -1);
    this.props.view
      .whenLayerView(layer)
      .then((layerView) => this.setState({ regulatorySensors: true }))
      .catch((err) => console.error(err));
  };

  // --- purple air ---
  fetchPurpleAirSensors = () => {
    // california bounding box lat/lng from: https://boundingbox.klokantech.com
    const nwlat = '42.00949894';
    const selat = '32.52952353';
    const nwlng = '-124.48200307';
    const selng = '-114.13078164';
    const bbox = `nwlat=${nwlat}&selat=${selat}&nwlng=${nwlng}&selng=${selng}`;
    fetch(`https://www.purpleair.com/data.json?fetch=true&${bbox}`)
      .then((res) => res.json())
      .then((data) => {
        // return early if data doesn't exist
        if (data.fields.length < 0 || data.data.length < 0) {
          this.setState({ purpleAirSensors: true });
          return;
        }

        this.plotPurpleAirSensors(data);
      })
      .catch((err) => {
        console.error(err);
        this.setState({ purpleAirSensors: true });
      });
  };

  plotPurpleAirSensors = (data) => {
    const { FeatureLayer, Point } = this.esriModules;

    // get indexes of values from data.fields array
    const dataIndex = {
      label: data.fields.indexOf('Label'),
      lat: data.fields.indexOf('Lat'),
      lon: data.fields.indexOf('Lon'),
    };

    // extend commonRenderer w/ layer specific styles
    const markerRenderer = {
      ...commonRenderer,
      symbol: {
        ...commonRenderer.symbol,
        color: [179, 77, 179, 0.75], // #b34db3
        size: '8px',
      },
    };

    const features = data.data.map((location, index) => ({
      geometry: new Point({
        latitude: location[dataIndex.lat],
        longitude: location[dataIndex.lon],
      }),
      attributes: {
        ObjectID: index,
        title: location[dataIndex.label],
      },
    }));

    const layer = new FeatureLayer({
      id: 'purple-air',
      title: 'Other Sensors',
      source: features, // autocast as a Collection of new Graphic()
      objectIdField: 'ObjectID',
      fields: commonFields,
      renderer: markerRenderer,
      popupTemplate: commonPopupTemplate,
      visible: false,
    });

    this.props.map.add(layer, -1);
    this.props.view
      .whenLayerView(layer)
      .then((layerView) => this.setState({ purpleAirSensors: true }))
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    loadModules([
      'esri/core/watchUtils',
      'esri/layers/FeatureLayer',
      'esri/geometry/Point',
    ])
      .then(([watchUtils, FeatureLayer, Point]) => {
        this.esriModules = { watchUtils, FeatureLayer, Point };
        this.forceUpdate();
      })
      .catch((err) => {
        console.error(err);
      });

    this.handleViewClicks();
  }

  componentDidUpdate() {
    const { watchUtils, FeatureLayer, Point } = this.esriModules;

    // --- create layers ---
    if (!this.state.communityBoundaries && FeatureLayer && Point) {
      this.setState({ communityBoundaries: 'loading' });
      this.fetchCommunityBoundaries();
    }

    if (!this.state.airGrantSensors && FeatureLayer && Point) {
      this.setState({ airGrantSensors: 'loading' });
      this.fetchAirGrantSensors();
    }

    if (!this.state.regulatorySensors && FeatureLayer && Point) {
      this.setState({ regulatorySensors: 'loading' });
      this.fetchRegulatorySensors();
    }

    if (!this.state.purpleAirSensors && FeatureLayer) {
      this.setState({ purpleAirSensors: 'loading' });
      this.fetchPurpleAirSensors();
    }

    // --- update layers ---
    if (this.state.communityBoundaries && watchUtils) {
      // ensure community boundaries layer exists and has finished loading
      if (this.state.communityBoundaries === 'loading') return;
      this.updateCommunityBoundaries();
    }
  }

  componentWillUnmount() {
    this.props.map.removeAll();
  }

  render() {
    if (
      this.state.communityBoundaries === 'loading' ||
      this.state.airGrantSensors === 'loading' ||
      this.state.regulatorySensors === 'loading' ||
      this.state.purpleAirSensors === 'loading'
    ) {
      return <Loading />;
    }

    return null;
  }
}

export default MapData;
