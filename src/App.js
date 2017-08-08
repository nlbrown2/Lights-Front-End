import React, { Component } from 'react';
import './App.css';
import initalizeFirebase, { initalizeFirebaseUI, firebaseUIConfig } from './services/initalizeFirebase.js';
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
    this.firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
    let signedIn = false;
    let mqtt = new Paho.MQTT.Client("m12.cloudmqtt.com", 30048, "web_" + parseInt(Math.random() * 100, 10));

    mqtt.onMessageArrived = this.messageArrived.bind(this);
    this.state = {
      mqtt,
      signedIn,
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
      this.firebaseui = initalizeFirebaseUI(this.firebase.auth(), '#firebaseui-auth-container', this.onSuccess.bind(this));
    this.startFirebaseUI();
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

  signOut = () => {
    this.firebaseui.reset();
    this.setState({ startFirebaseUI: true, signedIn: false });
  }

  componentDidUpdate(){
    if(this.state.startFirebaseUI){
      this.startFirebaseUI();
    }
  }

  startFirebaseUI(){
    this.firebaseui.start('#firebaseui-auth-container', firebaseUIConfig(this.onSuccess.bind(this)));
    this.setState({ startFirebaseUI: false });
  }

  onAuthStateChanged(user){
    if(user != null){
      console.log(user);
    } else {
      console.log('hi');
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
    console.log('subscribed');
    this.getShowNames();
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
    if(message.destinationName === "/options") {
      this.setState({ info: JSON.parse(message.payloadString) });
    }
  }

  render() {
    console.log(this.state);
    if(this.state.signedIn && this.state.connected){
      return (
        <Background>
          <HomePage signOut={this.signOut} mqtt={this.state.mqtt} shows={this.state.info}/>
        </Background>
      );
    } else {
      return (
          <Background>
            <LandingPage  startFirebaseUI={this.startFirebaseUI.bind(this)} auth={this.firebase.auth()} onSuccess={this.onSuccess.bind(this)} />
          </Background>
      );
    }
  }
}

export default App;
