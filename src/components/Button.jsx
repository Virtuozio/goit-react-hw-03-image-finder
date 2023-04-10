import { Component } from 'react';

export class Button extends Component {
  state = {
    page: 1,
  };
  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.props.onLoadMore(this.state.page + 1);
  };
  render() {
    return (
      <button className="Button" onClick={this.handleClick}>
        Load More
      </button>
    );
  }
}
