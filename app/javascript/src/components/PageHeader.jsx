import React, { Component } from 'react';

export default class PageHeader extends Component {
  render() {
    return <Header>{this.props.children}</Header>;
  }
}
