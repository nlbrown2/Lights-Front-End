import React, { Component } from 'react';
import logo from './logo.svg';
import Helmet from 'react-helmet';
import './App.css';
import initalizeFirebase, { initalizeFirebaseUI } from './services/initalizeFirebase.js';

var Paho = window.Paho;

class App extends Component {

  constructor(){
    super();
    this.firebase = initalizeFirebase();
    let signedIn = false;
    let mqtt = new Paho.MQTT.Client("m12.cloudmqtt.com", 30048, "web_" + parseInt(Math.random() * 100, 10));

    mqtt.onMessageArrived = this.messageArrived
    this.state = {
      mqtt,
      signedIn
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

  onAuthStateChanged(user){
    console.log(user);
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
    console.log("connected");
    this.state.mqtt.subscribe("/status", {qos: 2, onSuccess: (qos) => console.log(qos) });
    console.log("subscribed");
    this.sendRequest("Hello T.");
    console.log("sent message");
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
    console.log("recieved: ", message);
  }

  render() {
    console.log(this.firebase.auth().currentUser);
    if(this.state.signedIn){
      console.log('signed in');
      return (
        <div className="App">
          <Helmet title="You are doing great" />
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
            Like this
            or this <br/> so cool
          </p>
        </div>
      );
    } else {
      console.log('not');
      this.firebaseui = initalizeFirebaseUI(this.firebase.auth(), '#root', this.onSuccess.bind(this));
      return (
        <div id="#firebaseui-auth-container">
          <p> Please sign in first </p>
        </div>
      );
    }
  }
}

export default App;
