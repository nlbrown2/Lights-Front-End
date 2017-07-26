import React, { Component } from 'react';
import './App.css';
import initalizeFirebase, { initalizeFirebaseUI } from './services/initalizeFirebase.js';
import styled from 'styled-components';
import LandingPage from './LandingPage.js';
import HomePage from './HomePage.js';

var Paho = window.Paho;
const Background = styled.div`
  width: 100%;
  height: 100%;
`;


class App extends Component {

  constructor(){
    super();
    this.firebase = initalizeFirebase();
    let signedIn = false;
    let mqtt = new Paho.MQTT.Client("m12.cloudmqtt.com", 30048, "web_" + parseInt(Math.random() * 100, 10));

    mqtt.onMessageArrived = this.messageArrived.bind(this);
    this.state = {
      mqtt,
      signedIn,
      showStrings: 'loading,',
      connected: false
    };

    let options = {
      useSSL: true,
      userName: "RpiLightsClient",
      password: "T2c%I02504O&",
      onSuccess: () => {
        this.onConnect();
      },
      onFailure:() => alert('There was an error in sending/recieving data. Please refresh')
    }
    this.state.mqtt.connect(options);
  }

  connect(){
    let options = {
      useSSL: true,
      userName: "RpiLightsClient",
      password: "T2c%I02504O&",
      onSuccess: () => {
        this.onConnect();
      },
      onFailure:() => alert('There was an error in sending/recieving data. Please refresh')
    }
    this.state.mqtt.connect(options);

  }

  onAuthStateChanged(user){
    if(user != null){
      this.setState({ signedIn: true });
    } else {
      this.firebaseui = initalizeFirebaseUI(this.firebase.auth(), '#root', this.onSuccess.bind(this));
    }
  }

  onSuccess(){
    console.log("signed in");
    this.setState({ signedIn: true });
  }

  onConnect() {
    this.setState({ connected: true });
    console.log("connected");
    this.state.mqtt.subscribe("/status", {qos: 2, onSuccess: (qos) => console.log(qos), onFailure: (msg) => console.log(msg) });
    this.state.mqtt.subscribe("/options", {qos: 2, onSuccess: (qos) => console.log(qos) });
    console.log("subscribed");
    this.getShowNames();
    this.sendRequest("Hello T.");
    console.log("sent message");
  }

  getShowNames() {
    console.log('test');
    let message = new Paho.MQTT.Message("show list");
    message._setQos(2);
    message.destinationName = "/get";
    this.state.mqtt.send(message);
  }

  sendRequest(request){
    if(typeof request !== 'string'){
      console.log("error! request is not a string");
      return null;
    }
    let message = new Paho.MQTT.Message(request);
    message._setQos(2); //need to ensure it is delivered, but only once
    message.destinationName = "/request";
    this.state.mqtt.send(message);
  }

  messageArrived(message){
    console.log(message);
    console.log("recieved: ", message.payloadString);
    console.log(message.destinationName);
    if(message.destinationName === "/options") {
      console.log('error?');
      this.setState({ showStrings: message.payloadString });
      console.log('yep');
    }
    console.log(message.destinationName);
    alert('wat');
  }

  render() {
    console.log(this.state.showStrings);
    if(this.state.signedIn && this.state.connected){
      return (
        <HomePage mqtt={this.state.mqtt} items={this.state.showStrings.split(',')}/>
      );
    } else {
      return (
          <Background>
            <LandingPage  auth={this.firebase.auth()} onSuccess={this.onSuccess.bind(this)} />
          </Background>
      );
    }
  }
}

export default App;
