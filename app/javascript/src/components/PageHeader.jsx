import React, { Component } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  text-align: center;
  color: var(--main-dark);
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 25px;
`

export default class PageHeader extends Component {
  render() {
    return <Header>{this.props.children}</Header>;
  }
}
