import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon, Table, Button, Header } from 'semantic-ui-react';
import BodyImages from 'react-body-images';
import ShowMore from 'react-show-more';

class HomePage extends Component {

  state = {
    selectedRow: -1 //nothing by default
  }

  handleSelect(arg){
    console.log(arg);
  }

  handleClick(index){
    this.setState({ selectedRow: index })
  }

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
          onClick={() => this.props.signOut()}
        >
          Sign Out
        </Button>
        <Table size="large" padded celled selectable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={4}>Select a Show</Table.HeaderCell>
              <Table.HeaderCell width={4}>Description</Table.HeaderCell>
              <Table.HeaderCell width={2}>Position in Queue</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.shows && this.props.shows.length ?
                this.props.shows.map((show, i) => (
                  <Table.Row
                    key={show.name}
                  >
                    <Table.Cell
                      onClick={() => this.handleClick(i)}
                    >
                      <Header as="h4">
                        <Icon style={{opacity: this.state.selectedRow === i ? 1 : 0}} color="green" name="checkmark" size="large" />
                        <Header.Content>
                          {show.name}
                        </Header.Content>
                        <Header.Subheader>
                          {show.options}
                        </Header.Subheader>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <ShowMore
                      >
                        {show.description}

                      </ShowMore>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {show.position !== -1 ? show.position : '- -'}
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
