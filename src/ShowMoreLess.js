import React, { Component } from 'react';

export default class ShowMoreLess extends Component {

  state = {
    show_short: true
  }

  render() {
    return (
      <span>
        <span>
          {this.state.show_short ? this.props.short : this.props.long}
        </span>
        <br />
        <a
          onClick={
            () => this.setState(
              (prevState) => (
                {show_short: !prevState.show_short}
              ))
          }
          style={{color: 'blue'}}
        >
          {this.state.show_short ? 'Show More' : 'Show Less'}
        </a>
      </span>
    )
  }
}
