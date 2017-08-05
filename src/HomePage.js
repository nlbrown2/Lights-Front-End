import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Form, Header } from 'semantic-ui-react';
import BodyImages from 'react-body-images';

const Background = styled.div`
  background-color: white;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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
      <div >
        <BodyImages bgImageArray={['./backgroundRepeat.jpg']} />
        <div style={{padding: "20%", }}>
          <div style={{flexDirection: 'row', backgroundColor: 'white', borderBottom: '1px solid'}}>
            <p style={{paddingLeft: '20%', textAlign: "left"}}>
              Shows and Options:
              <span style={{paddingRight: '20%', float: "right"}}>
                Current Status:
              </span>
            </p>
          </div>
          <Form style={{flexDirection: 'row', paddingLeft: '5%', backgroundColor: 'white'}}>
          <Grid divided columns="equal" padded>
            <Grid.Row>
              <Grid.Column>
            <Form.Group style={{flexDirection: "column"}}>
              <Form.Radio  label="Option 0" value="Option 1" checked={false} onChange={(event, { value }) => console.log(value)}/>
              <Form.Radio label="Option 1"/>
              <Form.Radio label="Option 2"/>
              <Form.Radio label="Option 3"/>
              <Form.Radio label="Option 4"/>
              <Form.Radio label="Option 5"/>
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <p>Idle?</p>
            <p>Idle?</p>
            <p>Idle?</p>
            <p>Idle?</p>
            <p>Idle?</p>
          </Grid.Column>
        </Grid.Row>
        </Grid>
          </Form>
        </div>
      </div>
    );
  }
}

export default HomePage;
