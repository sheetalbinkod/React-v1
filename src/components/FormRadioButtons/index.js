// @flow

import React from 'react';
import styled from '@emotion/styled';

// --- styled components ---
const RadioButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Group = styled.div`
  margin-top: -3px; /* account for cagov input[type="radio"] stying */
  margin-right: 0.875rem;

  :last-of-type {
    margin-right: 0;
  }
`;

const Input = styled.input`
  /* */
`;

const Label = styled.label`
  margin-bottom: 0;
  margin-left: 0.375rem;
  font-size: 0.8125rem;
  font-weight: normal;
  white-space: nowrap;
`;

// --- components ---
// format text for use as HTML attributes
const formatText = (text) => text.toLowerCase().replace(/[\W_]+/g, '-');

type Props = {
  name: string,
  options: Array<string>,
};

type State = {
  selectedOption: string,
};

class RadioButtons extends React.Component<Props, State> {
  state = { selectedOption: '' };

  static getDerivedStateFromProps(props: Props, state: State) {
    const { options } = props;
    const { selectedOption } = state;
    // initially set selectedOption state as the first item in options prop
    if (selectedOption !== '') return null;
    return { selectedOption: options[0] };
  }

  handleOptionChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  render() {
    const { name, options, ...props } = this.props;
    const { selectedOption } = this.state;

    return (
      <RadioButtonsContainer {...props}>
        {options.map((option) => {
          const id = `${formatText(name)}-${formatText(option)}`;
          return (
            <Group key={id}>
              <Input
                id={id}
                type="radio"
                name={name}
                value={formatText(option)}
                checked={option === selectedOption}
                onChange={(event) =>
                  this.handleOptionChange(
                    event.target.nextElementSibling.textContent,
                  )
                }
              />
              <Label htmlFor={id}>{option}</Label>
            </Group>
          );
        })}
      </RadioButtonsContainer>
    );
  }
}

export default RadioButtons;
