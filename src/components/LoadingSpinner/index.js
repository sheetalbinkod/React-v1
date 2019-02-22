// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/core';
// global styles
import { colors } from 'config/styles';

// --- styled components ---
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: 150;
    transform: rotate(0deg);
  }
  50% {
   stroke-dashoffset: 50;
   transform: rotate(300deg);
  }
  100% {
   stroke-dashoffset: 150;
   transform: rotate(720deg);
  }
`;

const color = keyframes`
  0% {
    stroke: ${colors.lightBlue()};
  }
  25% {
    stroke: ${colors.gold()};
  }
  50% {
    stroke: ${colors.teal()};
  }
  75% {
    stroke: ${colors.darkBlue()};
  }
  100% {
    stroke: ${colors.lightBlue()};
  }
`;

const Svg = styled.svg`
  display: block;
  margin: 1rem auto;
  animation: ${rotate} 5s linear infinite;
`;

const Circle = styled.circle`
  fill: none;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-dasharray: 150;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${dash} 1.25s ease-in-out infinite,
    ${color} 5s ease-in-out infinite;
`;

// --- components ---
type Props = {};

const LoadingSpinner = ({ ...props }: Props) => (
  <Svg width="50" height="50" viewBox="0 0 50 50" {...props}>
    <Circle cx="25" cy="25" r="20" />
  </Svg>
);

export default LoadingSpinner;
