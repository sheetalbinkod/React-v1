// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
// components
import LoadingSpinner from 'components/LoadingSpinner';
// contexts
import { MapProvider } from 'contexts/Map';
// global styles
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { colors } from 'config/styles';

// lazy load components
const Map = React.lazy(() => import('components/Map'));
const LocationDetail = React.lazy(() => import('components/LocationDetail'));

// --- styled components ---
const AppBackground = styled.div`
  background-color: ${colors.graye};
`;

const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 90rem;
  background-color: white;
  box-shadow: 0 0 2.5rem ${colors.black(0.1875)};
`;

// --- components ---
type Props = {
  //
};

const App = ({ ...props }: Props) => (
  <React.Suspense fallback={<LoadingSpinner />}>
    <AppBackground>
      <AppContainer>
        <MapProvider>
          <Map />
          <LocationDetail />
        </MapProvider>
      </AppContainer>
    </AppBackground>
  </React.Suspense>
);

export default App;
