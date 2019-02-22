// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
// components
import Modal from 'components/Modal';
// global styles
import { colors } from 'config/styles';

// --- styled components ---
const ModalBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${colors.black(0.875)};
`;

const ModalContainer = styled.div`
  margin: 1rem;
  width: 100%;
  max-width: 30rem;
  max-height: calc(100vh - 2rem);
  background-color: ${colors.white()};
  box-shadow: 0 0 0.5rem ${colors.black(0.1875)};
`;

const Content = styled.div`
  padding: 0.5rem 0.625rem;

  * {
    margin-top: 1rem;
    margin-bottom: 0;
  }

  > :first-of-type {
    margin-top: 0;
  }
`;

const Header = styled(Content)`
  position: relative;
  color: ${colors.white()};
  background-color: ${colors.darkBlue()};
`.withComponent('header');

const Body = styled(Content)`
  /* */
`;

const Footer = styled(Content)`
  border-top: 1px solid ${colors.grayc};
  background-color: ${colors.graye};
`.withComponent('footer');

// --- components ---
type Props = {
  header: any,
  body: any,
  footer: any,
};

const ModalPopup = ({ header, body, footer, ...props }: Props) => (
  <Modal>
    <ModalBackground>
      <ModalContainer {...props}>
        <Header>{header}</Header>
        <Body>{body}</Body>
        {// footer content is optional
        footer && <Footer>{footer}</Footer>}
      </ModalContainer>
    </ModalBackground>
  </Modal>
);

export default ModalPopup;
