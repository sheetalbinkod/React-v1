// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
// components
import InfoTooltip from 'components/InfoTooltip';
import SelectMenu from 'components/FormSelectMenu';
// contexts
import { MapContext } from 'contexts/Map';
// global styles
import { colors } from 'config/styles';
// data (temporary)
import { timeSeries, monitoringSites } from 'config/data';
// images (temporary)
import graph from './graph.png';

// --- styled components ---
const padding = 8;

const LocationDetailContainer = styled.div`
  background-color: ${colors.slate()};
`;

const Header = styled.header`
  /* */
`;

const Heading = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;
  padding: ${padding * 2}px;
  border-bottom: 1px solid ${colors.black(0.1875)};
  font-size: 1.5rem;
  font-weight: 300;
  color: ${colors.white()};

  @media (min-width: 90rem) {
    padding-right: ${padding * 3}px;
    padding-left: ${padding * 3}px;
  }
`;

const InputControls = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: ${padding}px;
`;

const InputGroup = styled.div`
  display: flex;
  width: 100%;
  padding: ${padding}px ${padding * 2}px;

  @media (min-width: 45rem) {
    flex: ${(props) => (props.primary ? 1 : null)};
    width: auto;
  }

  @media (min-width: 90rem) {
    padding-right: ${padding * 3}px;
    padding-left: ${padding * 3}px;
  }

  /* KendoReact Tooltip doesn't expose className prop and is rendered to a div,
     so unfortunately we need to target it via a div tag selector
  */
  div {
    align-self: center;
    line-height: 1;
  }
`;

const GroupLabel = styled.p`
  align-self: center;
  margin-right: 0.5rem;
  margin-bottom: 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1;
  color: ${colors.white()};
  white-space: nowrap;
  user-select: none;
`;

const Body = styled.div`
  padding: ${padding}px ${padding * 2}px ${padding * 3}px;

  @media (min-width: 90rem) {
    padding-right: ${padding * 3}px;
    padding-left: ${padding * 3}px;
  }
`;

const Img = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  height: auto;
  max-width: 80rem;
`;

// --- components ---
type Props = {};
type State = {};

class LocationDetail extends React.Component<Props, State> {
  static contextType = MapContext;

  render() {
    const { ...props } = this.props;
    const { locationFocus, activeCommunity } = this.context;

    if (locationFocus !== 'community') return null;

    return (
      <LocationDetailContainer {...props}>
        <Header>
          <Heading>{activeCommunity.name}</Heading>
          <InputControls>
            <InputGroup>
              <InfoTooltip
                text="Time Series info..."
                bgColor={colors.slate()}
              />
              <GroupLabel>Time Series:</GroupLabel>
              <SelectMenu options={timeSeries} initialOptionSelected={true} />
            </InputGroup>

            <InputGroup primary>
              <InfoTooltip
                text="Monitoring Sites info..."
                bgColor={colors.slate()}
              />
              <GroupLabel>Monitoring Sites:</GroupLabel>
              <SelectMenu isMulti={true} options={monitoringSites} />
            </InputGroup>
          </InputControls>
        </Header>
        <Body>
          <Img src={graph} alt="Graph of selected location’s data" />
        </Body>
      </LocationDetailContainer>
    );
  }
}

export default LocationDetail;
