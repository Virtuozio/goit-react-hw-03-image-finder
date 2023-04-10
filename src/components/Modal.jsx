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
      <Overlay onClick={this.handleOverlayClick}>
        <DivModal>
          <img src={this.props.largeImageURL} alt="" />
        </DivModal>
      </Overlay>
    );
  }
}
