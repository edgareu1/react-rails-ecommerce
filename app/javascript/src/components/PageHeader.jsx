import React, { Component } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  text-align: center;
  color: var(--main-blue);
  font-size: 5rem;
  font-weight: bold;
`

export default class PageHeader extends Component {
  render() {
    return <Header>{this.props.children}</Header>;
  }
}
