// @flow

import React from 'react';
import { Tooltip } from '@progress/kendo-react-tooltip';
import styled from '@emotion/styled/macro';
// components
import MapDisplay from 'components/MapDisplay';
import MapSidebar from 'components/MapSidebar';
// global styles
import { colors } from 'config/styles';

// --- styled components ---
const MapBodyContainer = styled.div`
  display: flex;
  /* map and sidebar top/bottom on small screens */
  flex-direction: column;
  background-color: ${colors.graye};

  /* account for map header height */
  height: calc(100% - 138px);

  @media (min-width: 45rem) {
    height: calc(100% - 104px);
  }

  @media (min-width: 60rem) {
    height: calc(100% - 54px);
  }

  /* map and sidebar left/right on larger screens */
  @media (min-width: 45rem) {
    flex-direction: row;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  height: calc(100% - 7.5rem);
  /* leave room on left/right of map for scrolling on small screens */
  margin-right: 1.25rem;
  margin-left: 1.25rem;
  background-color: ${colors.white()};
  box-shadow: 0 0 2.5rem ${colors.black(0.1875)};

  @media (min-width: 45rem) {
    margin-right: 0;
    margin-left: 0;
    height: 100%;
    box-shadow: none;
  }
`;

const RightPanel = styled.div`
  position: relative;
  border-top: 3px solid ${colors.lightBlue(0.875)};
  height: 7.5rem;
  background-color: ${colors.white()};
  overflow-y: ${(props) => (props.expanded ? 'auto' : 'hidden')};

  @media (min-width: 45rem) {
    z-index: 0;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: ${(props) => (props.expanded ? '22.5rem' : '2rem')};
    padding-left: ${(props) => (props.expanded ? '0' : '2rem')};
    padding-right: ${(props) => (props.expanded ? '2rem' : '0')};
    height: 100%;
    box-shadow: -0.25rem 0 0.5rem -0.25rem ${colors.black(0.1875)};
  }
`;

const ToggleButton = styled.button`
  display: none; /* hide on small screens */
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  margin: 0;
  padding: 0;
  border: none;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.75rem;
  color: ${colors.black(0.375)};
  cursor: pointer;

  /* fake button bottom border */
  &::after {
    content: '';
    display: block;
    position: relative;
    bottom: -10px;
    left: -4px;
    width: 32px;
    height: 1px;
    background-color: ${colors.black(0.125)};
  }

  &:hover {
    color: ${colors.black(0.625)};
  }

  /* match react-select focus */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #2684ff;
  }

  @media (min-width: 45rem) {
    display: block;
  }
`;

// --- components ---
type Props = {
  //
};

type State = {
  sidebarOpen: boolean,
};

class MapBody extends React.Component<Props, State> {
  state: State = {
    sidebarOpen: true,
  };

  toggleSidebar = (event) => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  render() {
    const { ...props } = this.props;
    const { sidebarOpen } = this.state;

    return (
      <MapBodyContainer {...props}>
        <LeftPanel>
          <MapDisplay />
        </LeftPanel>
        <RightPanel expanded={sidebarOpen}>
          <Tooltip anchorElement="target" showCallout={false} position="left">
            <ToggleButton
              className={
                sidebarOpen ? 'esri-icon-collapse' : 'esri-icon-expand'
              }
              title="Toggle Sidebar"
              onClick={this.toggleSidebar}
            />
          </Tooltip>
          <MapSidebar />
        </RightPanel>
      </MapBodyContainer>
    );
  }
}

export default MapBody;
