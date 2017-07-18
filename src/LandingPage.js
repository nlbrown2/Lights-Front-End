import React, { Component } from 'react';
import styled from 'styled-components';
import { initalizeFirebaseUI } from './services/initalizeFirebase.js';
import Helmet from 'react-helmet';

const Header = styled.p`
  color: #041E42;
  align-self: center;
  text-align: center;
  -webkit-margin-before:0em;
  -webkit-margin-after:0em;
  margin-top: 1rem;
  text-shadow: -1px 0 #FFC72C, 0 -1px #FFC72C, -1px 0 #FFC72C, 0 -1px #FFC72C;
  font-size: 20px;
`;


const Hr = styled.hr`
  display: block;
  position: relative;
  padding: 0;
  margin: 0.5rem;
  height: 0.25rem;
  width: 100%;
  max-height: 0;
  font-size: 1px;
  line-height: 0;
  clear: both;
  border: none;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #ffffff;
`;

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.firebaseui = initalizeFirebaseUI(this.props.auth, '#firebaseui-auth-container', this.props.onSuccess);
  }

  render(){
    return(
      <div id="firebaseui-auth-container">
        <Helmet title="LED Lights Interface" />
        <Header> Please sign in first </Header>
        <Hr />
      </div>
    );
  }
}

export default LandingPage;
