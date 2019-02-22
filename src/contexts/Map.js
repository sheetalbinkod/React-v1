// @flow

import React from 'react';
import type { Node } from 'react';

// --- contexts ---
export const MapContext = React.createContext();

// --- components ---
type Props = {
  children: Node,
};

type Location = {
  name: string,
  geo: any,
};

type State = {
  esriMap: any,
  esriView: any,
  locationFocus: 'state' | 'community' | 'grant',
  activeCommunity: Location,
  activeAirGrant: Location,
  setLocationFocus: (string) => void,
  setActiveCommunity: ({ name: string, geo: any }) => void,
  setActiveAirGrant: ({ name: string, geo: any }) => void,
};

export class MapProvider extends React.Component<Props, State> {
  state: State = {
    esriMap: null,
    esriView: null,
    locationFocus: 'state',
    activeCommunity: { name: '', geo: null },
    activeAirGrant: { name: '', geo: null },
    setEsriMap: (esriMap: State.esriMap) => {
      this.setState({ esriMap });
    },
    setEsriView: (esriView: State.esriView) => {
      this.setState({ esriView });
    },
    setLocationFocus: (locationFocus: State.locationFocus) => {
      this.setState({ locationFocus });
    },
    setActiveCommunity: (activeCommunity: State.activeCommunity) => {
      this.setState({ activeCommunity });
    },
    setActiveAirGrant: (activeAirGrant: State.activeAirGrant) => {
      this.setState({ activeAirGrant });
    },
  };

  render() {
    return (
      <MapContext.Provider value={this.state}>
        {this.props.children}
      </MapContext.Provider>
    );
  }
}
