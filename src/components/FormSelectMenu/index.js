// @flow

import React from 'react';
import Select from 'react-select';
import styled from '@emotion/styled/macro';

// --- styled components ---
const SelectMenuContainer = styled.div`
  flex: 1;
  font-size: 0.875rem;
  min-width: 10rem;
`;

// --- components ---
// format text for use as HTML attributes
const formatText = (text) => text.toLowerCase().replace(/[\W_]+/g, '-');

// create an 'option' object from text, for use in a ReactSelect component
const createOption = (text) => {
  if (!text) return null;
  return {
    value: formatText(text),
    label: text,
  };
};

type Props = {
  options: Array<string>,
  // default props
  isMulti: boolean,
  initialOptionSelected: boolean,
};

type State = {
  selectedOptions: Array<string>,
};

class SelectMenu extends React.Component<Props, State> {
  state = { selectedOptions: [] };

  static defaultProps = {
    isMulti: false,
    initialOptionSelected: false,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const { options, initialOptionSelected } = props;
    const { selectedOptions } = state;
    // if initialOptionSelected prop is true,
    // initially set selectedOptions state as the first item in options prop
    if (!initialOptionSelected || selectedOptions.length !== 0) return null;
    return { selectedOptions: [options[0]] };
  }

  handleOptionChange = (selectedOptions) => {
    // handle single and multi-select
    const options = selectedOptions.label ? [selectedOptions] : selectedOptions;
    this.setState({ selectedOptions: options.map((option) => option.label) });
  };

  render() {
    const { isMulti, options, ...props } = this.props;
    const { selectedOptions } = this.state;

    return (
      <SelectMenuContainer {...props}>
        <Select
          isMulti={isMulti}
          options={options.map((option) => createOption(option))}
          value={selectedOptions.map((option) => createOption(option))}
          onChange={this.handleOptionChange}
        />
      </SelectMenuContainer>
    );
  }
}

export default SelectMenu;
