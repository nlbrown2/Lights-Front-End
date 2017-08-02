import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Header } from 'semantic-ui-react';
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

const GridFull = styled(Grid)`
  height: 100%;
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
        <GridFull columns="equal">
          <Grid.Row>
            <Grid.Column>
              <p> Text </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{backgroundColor: 'red'}} />
            <Grid.Column style={{backgroundColor: 'green'}}>
              <p> Text 2 </p>
            </Grid.Column>
          </Grid.Row>
        </GridFull>
      </div>
    );
  }
}

export default HomePage;
