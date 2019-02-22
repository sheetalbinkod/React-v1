// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
// components
import InfoTooltip from 'components/InfoTooltip';
import SelectMenu from 'components/FormSelectMenu';
import ToggleSwitch from 'components/FormToggleSwitch';
// global styles
import { colors } from 'config/styles';
// data (temporary)
import { dataLayers, qualityLevels } from 'config/data';

// --- styled components ---
const padding = 8;

const MapHeaderContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding-top: ${padding}px;
  padding-bottom: ${padding}px;
  background-color: white;
  box-shadow: 0 0.25rem 0.5rem -0.25rem ${colors.black(0.1875)};
  z-index: 1;

  @media (min-width: 60rem) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: ${padding}px ${padding * 2}px;
  width: ${(props) => (props.primary ? '100%' : 'auto')};

  @media (min-width: 60rem) {
    flex: ${(props) => props.primary && 1};
    width: ${(props) => props.primary && 'auto'};
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
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  user-select: none;
`;

const Select = styled(SelectMenu)`
  min-width: 8rem;
`;

const Switch = styled(ToggleSwitch)`
  margin-right: 0.875rem;

  &:last-of-type {
    margin-right: 0;
  }
`;

// --- components ---
type Props = {
  //
};

const MapHeader = ({ ...props }: Props) => {
  return (
    <MapHeaderContainer {...props}>
      <InputGroup primary>
        <InfoTooltip text="Data Layer info..." />
        <GroupLabel>Data Layer:</GroupLabel>
        <Select options={dataLayers} initialOptionSelected={true} />
      </InputGroup>

      <InputGroup>
        <InfoTooltip text="Data Confidence info..." />
        <GroupLabel>Data Confidence:</GroupLabel>
        {qualityLevels.map((text) => (
          <Switch key={text} label={text} initiallySelected={true} />
        ))}
      </InputGroup>

      <InputGroup>
        <InfoTooltip text="Weather info..." />
        <GroupLabel>Weather:</GroupLabel>
        <Switch label="Wind Speed/Direction" />
      </InputGroup>
    </MapHeaderContainer>
  );
};

export default MapHeader;
