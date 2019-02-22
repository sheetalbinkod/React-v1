// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
// components
import MapHeader from 'components/MapHeader';
import MapBody from 'components/MapBody';

// --- styled components ---
const MapContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: calc(100vh - 138px); /* account for CARB header height */
`;

// --- components ---
type Props = {
  //
};

const Map = ({ ...props }: Props) => (
  <MapContainer {...props}>
    <MapHeader />
    <MapBody />
  </MapContainer>
);

export default Map;
