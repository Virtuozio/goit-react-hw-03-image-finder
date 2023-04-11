import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlePressESC);
  }
  handlePressESC = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressESC);
  }
  render() {
    return (
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
