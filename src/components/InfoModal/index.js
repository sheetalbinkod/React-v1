// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
// components
import ModalPopup from 'components/ModalPopup';
// global styles
import { colors } from 'config/styles';

// --- styled components ---
const Button = styled.button`
  /* cross-browser fixes and common button styling */
  overflow: visible;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: 100%;
  line-height: 1;
  text-transform: none;
  white-space: nowrap;
  cursor: pointer;
`;

const InfoButton = styled(Button)`
  box-sizing: content-box;
  margin-right: 0.25rem;
  border: 1px solid ${colors.white()};
  border-radius: 50%;
  height: 16px;
  width: 16px;

  /* match react-select focus */
  &:focus {
    outline: none;
    box-shadow: ${(props) => `0 0 0 1px ${props.bgColor}, 0 0 0 3px #2684ff`};
  }

  circle {
    fill: ${colors.lightBlue()};

    &:hover {
      fill: ${colors.darkBlue()};
    }
  }

  path {
    fill: ${colors.white()};
    pointer-events: none;
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  border-top: none;
  border-right: none;
  border-bottom: 1px solid ${colors.black(0.5)};
  border-left: 1px solid ${colors.black(0.5)};
  width: 38px;
  height: 38px;
  font-size: 0.9375rem;
  line-height: 38px;
  text-align: center;
  color: ${colors.white()};
  background-color: ${colors.lightBlue(0.75)};

  &:hover {
    background-color: ${colors.lightBlue()};
  }
`;

// --- components ---
type Props = {
  header: any,
  body: any,
  // default props
  bgColor: string,
};

type State = {
  modalOpen: boolean,
};

class InfoModal extends React.Component<Props, State> {
  state = {
    modalOpen: false,
  };

  static defaultProps = {
    bgColor: colors.white(),
  };

  toggleModal = (event) => {
    this.setState({ modalOpen: !this.state.modalOpen }, function() {
      // switch focus between info button and close button
      if (this.state.modalOpen) {
        this.closeButton.focus();
      } else {
        this.infoButton.focus();
      }
    });
  };

  render() {
    const { header, body, ...props } = this.props;
    const { modalOpen } = this.state;

    return (
      <>
        <InfoButton
          {...props}
          ref={(el) => (this.infoButton = el)}
          onClick={this.toggleModal}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
            <path d="M7.88,9.93c-1,0-1.41-.43-1.41-1.09C6.47,7.48,8.35,6.89,8.35,6a.69.69,0,0,0-.79-.71.88.88,0,0,0-.88.62c-.14.32-.2.54-.34.81-.06.11-.13.2-.26.2A1.47,1.47,0,0,1,5,5.33C5,4.07,6,3,8,3c2.15,0,3,1.15,3,2.53C11,7.9,8.49,8.39,8.49,9.16c0,.28.31.25.31.43S8.55,9.93,7.88,9.93Zm-1.5,1.82a1.25,1.25,0,0,1,1.4-1.31,1.24,1.24,0,0,1,1.4,1.31c0,.82-.51,1.25-1.4,1.25S6.38,12.57,6.38,11.75Z" />
          </svg>
        </InfoButton>

        {modalOpen && (
          <ModalPopup
            header={
              <>
                {header}
                <CloseButton
                  ref={(el) => (this.closeButton = el)}
                  onClick={this.toggleModal}
                  children={'✕'}
                />
              </>
            }
            body={body}
            footer={null}
          />
        )}
      </>
    );
  }
}

export default InfoModal;
