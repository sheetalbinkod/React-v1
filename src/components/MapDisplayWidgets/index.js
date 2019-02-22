// @flow

import React from 'react';
import { loadModules } from 'react-arcgis';
// styles
import './styles.css';

// --- components ---
type Props = {
  map: any, // esri.Map
  view: any, // esri.views.MapView
};

type State = {
  search: any,
  basemap: any,
  home: any,
  fullscreen: any,
  print: any,
  download: any,
  legend: any,
};

class MapWidgets extends React.Component<Props, State> {
  state = {
    search: null,
    basemap: null,
    home: null,
    fullscreen: null,
    print: null,
    download: null,
    legend: null,
  };

  esriModules = {}; // esri modules loaded in cDM();

  componentDidMount() {
    loadModules([
      'esri/widgets/Search',
      'esri/widgets/Expand',
      'esri/widgets/BasemapGallery',
      'esri/widgets/Home',
      'esri/widgets/Fullscreen',
      'esri/widgets/Print',
      'esri/widgets/LayerList',
    ])
      .then(
        ([
          Search,
          Expand,
          BasemapGallery,
          Home,
          Fullscreen,
          Print,
          LayerList,
        ]) => {
          this.esriModules = {
            Search,
            Expand,
            BasemapGallery,
            Home,
            Fullscreen,
            Print,
            LayerList,
          };
          this.forceUpdate();
        },
      )
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidUpdate() {
    const { view } = this.props;
    const {
      search,
      basemap,
      home,
      fullscreen,
      print,
      download,
      legend,
    } = this.state;
    const {
      Search,
      Expand,
      BasemapGallery,
      Home,
      Fullscreen,
      Print,
      LayerList,
    } = this.esriModules;

    if (!view) return;

    if (!search && Search) {
      const search = new Search({ view });

      this.setState({ search }, function() {
        view.ui.add(search, { position: 'top-left', index: 0 });
      });
    }

    if (!basemap && Expand && BasemapGallery) {
      const basemap = new Expand({
        view,
        content: new BasemapGallery({ view }),
        expandIconClass: 'esri-icon-layers',
        expandTooltip: 'Change Basemap',
        autoCollapse: true,
        mode: 'floating',
      });

      this.setState({ basemap }, function() {
        view.ui.add(basemap, { position: 'top-right', index: 0 });
      });
    }

    if (!home && Home) {
      const home = new Home({ view });

      this.setState({ home }, function() {
        view.ui.add(home, { position: 'top-right', index: 1 });
      });
    }

    if (!fullscreen && Fullscreen) {
      const fullscreen = new Fullscreen({ view });

      this.setState({ fullscreen }, function() {
        view.ui.add(fullscreen, { position: 'bottom-right', index: 0 });
      });
    }

    if (!print && Expand && Print) {
      const printServiceUrl =
        'http://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';

      const print = new Expand({
        view,
        content: new Print({ view, printServiceUrl }),
        expandIconClass: 'esri-icon-save',
        expandTooltip: 'Export Map',
        autoCollapse: true,
        mode: 'floating',
      });

      this.setState({ print }, function() {
        view.ui.add(print, { position: 'bottom-right', index: 1 });
      });
    }

    // NOTE: temporarily waiting for when Expand and Print are ready,
    // so the widget is displayed at the same time as the print widget.
    // TODO: remove Expand and Print from conditional if print widget is removed
    if (!download && Expand && Print) {
      const download = document.createElement('div');
      download.className = 'esri-component esri-widget esri-widget--button';
      download.setAttribute('role', 'button');
      download.setAttribute('tabindex', '0');
      download.setAttribute('aria-label', 'Download Map');
      download.setAttribute('title', 'Download Map');
      download.addEventListener('click', (event) => {
        view.takeScreenshot({ format: 'png' }).then((screenshot) => {
          const anchor = document.createElement('a');
          anchor.download = 'screenshot';
          anchor.href = screenshot.dataUrl;
          anchor.click();
        });
      });

      const icon = document.createElement('span');
      icon.className = 'esri-icon esri-icon-download';
      icon.setAttribute('aria-hidden', 'true');
      download.appendChild(icon);

      const text = document.createElement('span');
      text.className = 'esri-icon-font-fallback-text';
      text.textContent = 'Download Map';
      download.appendChild(text);

      this.setState({ download }, function() {
        view.ui.add(download, { position: 'bottom-right', index: 2 });
      });
    }

    if (!legend && LayerList) {
      const legend = new LayerList({
        view: view,
        listItemCreatedFunction: function(event) {
          event.item.panel = {
            content: ['legend', '<p>Last Updated:</p>'],
            open: true,
            visible: false,
          };
        },
      });

      this.setState({ legend }, function() {
        view.ui.add(legend, 'bottom-left');
      });
    }
  }

  componentWillUnmount() {
    const { view } = this.props;

    view.ui.empty('top-left');
    view.ui.empty('top-right');
    view.ui.empty('bottom-right');
    view.ui.empty('bottom-left');
  }

  render() {
    return null;
  }
}

export default MapWidgets;
