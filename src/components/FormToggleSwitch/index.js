// @flow

import * as React from 'react';
import styled from '@emotion/styled/macro';
// global styles
import { colors } from 'config/styles';

// --- styled components ---
const ToggleSwitchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Toggle = styled.label`
  display: inline-block;
  position: relative;
  margin-bottom: 0;
  border-radius: ${(props) => `${props.switchHeight}px`};
  height: ${(props) => `${props.switchHeight}px`};
  width: ${(props) => `${props.switchWidth}px`};

  /* match react-select focus */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.white()}, 0 0 0 4px #2684ff;
  }
`;

const Slider = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${(props) => `${props.switchHeight}px`};
  background-color: ${(props) => props.switchOffColor};
  transition: ${(props) => `all ${props.switchTime}ms ease-in`};
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    margin: ${(props) => `${props.switchStroke}px`};
    border-radius: 50%;
    width: ${(props) => `${props.switchDiameter}px`};
    height: ${(props) => `${props.switchDiameter}px`};
    background-color: ${(props) => props.switchHandleColor};
    transition: inherit;
  }
}`;

const Input = styled.input`
  display: none;

  &:checked + ${Slider} {
    background-color: ${(props) => props.switchOnColor};
  }

  &:checked + ${Slider}::before {
    transform: ${(props) => `translateX(${props.switchDiameter}px)`};
  }
`;

const Label = styled.label`
  margin-bottom: 0;
  margin-left: 0.375rem;
  width: ${(props) => `calc(100% - ${props.switchWidth}px - 0.375rem)`};
  font-size: 0.8125rem;
  font-weight: normal;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
`;

// --- components ---
// format text for use as HTML attributes
const formatText = (text) => text.toLowerCase().replace(/[\W_]+/g, '-');

type Props = {
  label: string,
  // default props
  initiallySelected: boolean,
  switchOnColor: string,
  switchOffColor: string,
  switchHandleColor: string,
  switchDiameter: number,
  switchStroke: number,
  switchTime: number,
};

type State = {
  checked: boolean,
  initializedByProp: boolean,
};

class ToggleSwitch extends React.Component<Props, State> {
  state = {
    checked: false,
    initializedByProp: false, // conditionally set once in gDSFP()
  };

  static defaultProps = {
    initiallySelected: false,
    switchOnColor: colors.teal(),
    switchOffColor: colors.grayc,
    switchHandleColor: colors.white(),
    switchDiameter: 14,
    switchStroke: 1,
    switchTime: 100,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const { initiallySelected } = props;
    const { initializedByProp } = state;
    // if initiallySelected prop is true, initially set checked state to true
    if (!initiallySelected || initializedByProp) return null;
    return { checked: true, initializedByProp: true };
  }

  toggleChecked = (event) => {
    this.toggle.focus();
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const {
      label,
      switchOnColor,
      switchOffColor,
      switchHandleColor,
      switchDiameter,
      switchStroke,
      switchTime,
      ...props
    } = this.props;
    const { checked } = this.state;

    const switchHeight = switchDiameter + 2 * switchStroke;
    const switchWidth = 2 * switchDiameter + 2 * switchStroke;

    return (
      <ToggleSwitchContainer {...props}>
        <Toggle
          ref={(el) => (this.toggle = el)}
          switchHeight={switchHeight}
          switchWidth={switchWidth}
          tabIndex="0"
          onKeyDown={(event) => {
            if (event.key !== ' ') return;
            event.preventDefault();
            this.toggleChecked(event);
          }}
        >
          <Input
            id={formatText(label)}
            type="checkbox"
            checked={checked}
            onChange={this.toggleChecked}
            switchOnColor={switchOnColor}
            switchDiameter={switchDiameter}
          />
          <Slider
            switchHandleColor={switchHandleColor}
            switchOffColor={switchOffColor}
            switchDiameter={switchDiameter}
            switchStroke={switchStroke}
            switchTime={switchTime}
            switchHeight={switchHeight}
          />
        </Toggle>
        <Label
          htmlFor={formatText(label)}
          switchWidth={switchWidth}
          children={label}
        />
      </ToggleSwitchContainer>
    );
  }
}

export default ToggleSwitch;
