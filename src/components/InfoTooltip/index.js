// @flow

import React from 'react';
import { Tooltip } from '@progress/kendo-react-tooltip';
import styled from '@emotion/styled/macro';
// global styles
import { colors } from 'config/styles';

// --- styled components ---
const Button = styled.button`
  box-sizing: content-box;
  overflow: visible;
  margin: 0 0.1875rem 0 0;
  padding: 0;
  border: 1px solid ${colors.white()};
  border-radius: 50%;
  height: 14px;
  width: 14px;
  font-family: inherit;
  font-size: 100%;
  line-height: 1;
  text-transform: none;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    circle {
      fill: ${colors.darkBlue()};
    }
  }

  /* match react-select focus */
  &:focus {
    outline: none;
    box-shadow: ${(props) => `0 0 0 1px ${props.bgColor}, 0 0 0 3px #2684ff`};
  }

  svg {
    pointer-events: none;
  }

  circle {
    fill: ${colors.lightBlue()};
  }

  path {
    fill: ${colors.white()};
  }
`;

// --- components ---
type Props = {
  text: string,
  // default props
  bgColor: string,
};

const InfoTooltip = ({ text, ...props }: Props) => {
  return (
    <Tooltip anchorElement="target" showCallout={false}>
      <Button title={text} onClick={(ev) => ev.preventDefault()} {...props}>
        <svg width="14" height="14" viewBox="0 0 14 14">
          <circle cx="7" cy="7" r="7" />
          <path d="M6.89,8.69c-.86,0-1.23-.38-1.23-1,0-1.19,1.65-1.7,1.65-2.48a.61.61,0,0,0-.69-.62.76.76,0,0,0-.77.54c-.13.28-.18.47-.3.71s-.11.17-.23.17a1.27,1.27,0,0,1-1-1.39c0-1.1.9-2,2.65-2s2.61,1,2.61,2.22c0,2.07-2.2,2.5-2.2,3.17,0,.25.27.23.27.38S7.48,8.69,6.89,8.69ZM5.58,10.28A1.1,1.1,0,0,1,6.81,9.14,1.08,1.08,0,0,1,8,10.28c0,.72-.45,1.1-1.22,1.1S5.58,11,5.58,10.28Z" />
        </svg>
      </Button>
    </Tooltip>
  );
};

InfoTooltip.defaultProps = {
  bgColor: colors.white(),
};

export default InfoTooltip;
