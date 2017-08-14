import React, { Component } from 'react';
import styled from 'styled-components';
import { List, Input, Icon, Table, Button, Header } from 'semantic-ui-react';
import BodyImages from 'react-body-images';
import ShowMore from 'react-show-more';

class HomePage extends Component {

  state = {
    selectedRow: -1,
    //nothing by default
    show_short: true,
    options: {}
    //no show options stored by default
  }

  handleSelect(arg){
    console.log(arg);
  }

  handleClick(index){
    this.setState({ selectedRow: index })
  }

  //need: show name, show description, and position in queue.
  updateOptionValue(show_index, option_name, value){
    let old_options = this.state.options;
    let show_name = this.props.shows[show_index].name;
    if(value.trim() !== ''){
      this.setState({
        options: {
          ...this.state.options,
          [show_name]: {
            ...this.state.options[show_name],
            [option_name]: value
          }
        }
      });
    } else {
      let { [option_name]: deletedKey, ...rest } = this.state.options[show_name];
      //omit the current option from state
      this.setState({
        options: {
          [show_name]: {
            ...rest
          }
        }
      });
    }
  }
  render() {
    return (
      <div style={{padding: '5% 10%'}}>
        <BodyImages bgImageArray={['./backgroundRepeat.jpg']} />
        <Button
          floated="right"
          positive
          onClick={() => this.sendRequest()}
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
              <Table.HeaderCell width={4}>Option</Table.HeaderCell>
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
                        <Header.Content style={{width: '100%'}}>
                          {show.name}
                        </Header.Content>
                        <Header.Subheader style={{}}>
                          {show.options && show.options != 'no options' && Object.keys(show.options).length ?
                              Object.keys(show.options).map((key, j) => (
                                <div key={key} style={{}}>
                                  <Input 
                                    size="mini" 
                                    label={key} 
                                    style={{width: '50%'}} 
                                    placeholder={show.options[key].default} 
                                    onChange={(event, data) => {
                                      console.log(data);
                                      this.updateOptionValue(i, key, data.value);
                                      //i is the show index and key is the name of the option
                                    }}
                                  />
                              </div>
                              ))
                              : null
                          }
                        </Header.Subheader>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <ShowMoreLess
                        long={show.long_description}
                        short={show.short_description}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {show.options && show.options !== 'no options' && Object.keys(show.options).length ?
                            <List
                              key={`${show.name}_List`}
                              bulleted >
                              {Object.keys(show.options).map((option) => (
                                <List.Item
                                  key={`${option}`}
                                >
                                  {`${option}`+ ':  ' + `${show.options[option].type}` + ' between ' + `${show.options[option].lowerBound}` + ' and ' + `${show.options[option].upperBound}. Default: ` + `${show.options[option].default} \n ${show.options[option].description}`
                                  }
                                </List.Item>
                              ))}
                            </List>
                          :
                        'This show does not have any options'
                      }
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
