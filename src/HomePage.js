import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon, Table, Rail, Button, Container, Grid, Header } from 'semantic-ui-react';
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
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                <Icon style={{opacity: 0}} color="green" name="checkmark" size="large" />
                  <Header.Content>
                    Option 1
                    <Header.Subheader>
                      Selections?
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                Description of Option 1
              </Table.Cell>
              <Table.Cell textAlign="center">
                - -
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="left" verticalAlign="middle">
                <Header as='h4'>
                <Icon style={{opacity: 1}} color="green" name="checkmark" size="large" />
                  <Header.Content>
                    Option 2
                    <Header.Subheader>
                      Selections?
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                Description of Option 2
              </Table.Cell>
              <Table.Cell textAlign="center">
                15
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                <Icon style={{opacity: 0}} color="green" name="checkmark" size="large" />
                  <Header.Content>
                    Option 3
                    <Header.Subheader>
                      Selections?
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                Description of Option 3
              </Table.Cell>
              <Table.Cell textAlign="center">
                12
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4'>
                <Icon style={{opacity: 0}} color="green" name="checkmark" size="large" />
                  <Header.Content>
                    Option 4
                    <Header.Subheader>
                      Selections?
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                Description of Option 4
              </Table.Cell>
              <Table.Cell textAlign="center">
                Running
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default HomePage;
