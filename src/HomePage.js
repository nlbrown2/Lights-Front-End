import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon, Table, Button, Header } from 'semantic-ui-react';
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

  //need: show name, show description, and position in queue.
  render() {
    return (
      <div style={{padding: '5% 10%'}}>
        <BodyImages bgImageArray={['./backgroundRepeat.jpg']} />
        <Button
          floated="right"
          positive
        >
          Submit Show Request
        </Button>
        <Button
          floated="left"
          negative
        >
          Sign Out
        </Button>
        <Table size="large" padded celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={4}>Select a Show</Table.HeaderCell>
              <Table.HeaderCell width={4}>Description</Table.HeaderCell>
              <Table.HeaderCell width={2}>Position in Queue</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.shows && this.props.shows.length ?
                this.props.shows.map((show) => (
                  <Table.Row
                    key={show.name}
                  >
                    <Table.Cell>
                      <Header as="h4">
                        <Icon style={{opacity: 0}} color="green" name="checkmark" size="large" />
                        <Header.Content>
                          {show.name}
                        </Header.Content>
                        <Header.Subheader>
                          {show.options}
                        </Header.Subheader>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {show.description}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {show.position || '- -'}
                    </Table.Cell>
                  </Table.Row>
                ))
              : null
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default HomePage;
