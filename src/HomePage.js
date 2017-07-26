import React, { Component } from 'react';
import logo from './logo.svg';
// import Menu, { Item, SubMenu } from 'rc-menu';
// import { RadioGroup, Radio } from 'react-radio-group';
// import 'rc-menu/assets/index.css';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';

const Background = styled.div`
  background-color: white;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  margin-top: -3.6vh;
  align-self: center;
  text-align: center;
`;

class HomePage extends Component {

  constructor(props){
    super(props);
    let options = {
      useSSL: true,
      userName: "RpiLightsClient",
      password: "T2c%I02504O&",
      onSuccess: () => {
        console.log('connected');
      },
      onFailure:() => alert('There was an error in sending/recieving data. Please refresh')
    }
    // this.props.mqtt.connect(options);
    // this.props.mqtt.subscribe("/options", {qos: 2, onSuccess: (qos) => console.log(qos)});
    console.log(this.props.mqtt.isConnected());
  }

  handleSelect(arg){
    console.log(arg);
  }

  handleClick(arg){
    console.log(arg);
  }

  _renderTitle = () => (
    <span>Select a Show ></span>
  );

  render() {
    console.log(this.props.items);
    return (
      <Background >
        <p>Text</p>
      <p> Text 2 </p>
      <Header as="h1">Header</Header>
      </Background>
    );
  }
}

export default HomePage;
