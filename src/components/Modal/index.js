// @flow

import React from 'react';
import ReactDOM from 'react-dom';

// --- components ---
const modalRoot: HTMLDivElement = document.getElementById('modal');

type Props = {};
type State = {};

class Modal extends React.Component<Props, State> {
  el = document.createElement('div');

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Modal;
