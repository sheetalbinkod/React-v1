// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
import { Map } from 'react-arcgis';
// components
import MapWidgets from 'components/MapDisplayWidgets';
import MapData from 'components/MapDisplayData';
// contexts
import { MapContext } from 'contexts/Map';
// global styles
import { colors } from 'config/styles';

// --- styled components ---
const MapDisplayContainer = styled.div`
  height: 100%;

  & .esri-view {
    width: 100%;
    height: 100%;
  }
`;

// --- components ---
type Props = {
  //
};

type State = {
  map: any, // esri.Map
  view: any, // esri.views.MapView
};

class MapDisplay extends React.Component<Props, State> {
  state = {
    map: null,
    view: null,
  };

  static contextType = MapContext;

  handleMapLoad = (map: any, view: any) => {
    this.setState({ map, view });
    this.context.setEsriMap(map);
    this.context.setEsriView(view);
  };

  handleMapFail = (err: any) => {
    console.error(err);
  };

  componentDidUpdate() {
    if (this.state.view) this.state.view.ui.move('zoom', 'top-right');
  }

  render() {
    const { ...props } = this.props;

    return (
      <MapDisplayContainer {...props}>
        <Map
          mapProperties={{ basemap: 'osm' }}
          viewProperties={{
            center: [-119.449444, 37.166111],
            zoom: 6,
            popup: {
              collapseEnabled: false,
              dockEnabled: false,
              dockOptions: {
                buttonEnabled: false, // disables the dock button from popups
                // breakpoint: false, // ignore breakpoints that trigger docking
              },
            },
            highlightOptions: {
              color: colors.lightBlue(),
              haloOpacity: 0.625,
              fillOpacity: 0,
            },
          }}
          onLoad={this.handleMapLoad}
          onFail={this.handleMapFail}
        >
          <MapWidgets />
          <MapData />
        </Map>
      </MapDisplayContainer>
    );
  }
}

export default MapDisplay;
