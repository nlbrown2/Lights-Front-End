import React, { Component } from 'react';
import styled from 'styled-components';
import { List, Input, Icon, Table, Button, Header } from 'semantic-ui-react';
import BodyImages from 'react-body-images';
import ShowMoreLess from './ShowMoreLess.js';
import debounce from 'debounce';

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

  sendRequest(index){
    console.log('attempting to send request');
    if(this.validOptions()) {
      let show_name = this.props.shows[this.state.selectedRow].name;
      this.props.sendRequest(show_name, this.state.options[show_name]);
    }
  }

  debouncedSendRequest = debounce(this.sendRequest, 250);

  validOptions(){
    // return true; used for testing backend with invalid options
    if(this.state.selectedRow === -1){
      return false;
    }
    console.log(this.props.shows[this.state.selectedRow].options);
    var showObj = this.props.shows[this.state.selectedRow];
    let show_name = showObj.name;
    if(this.state.options[show_name]){
      console.log(Object.keys(this.state.options[show_name]));
      for(let i = 0; i < Object.keys(this.state.options[show_name]).length; i++) {
        let optionObj = showObj.options[Object.keys(this.state.options[show_name])[i]];
        console.log(optionObj, 'option obj');
        if(optionObj){
          let userInput = this.state.options[show_name][Object.keys(this.state.options[show_name])[i]];
          let type = showObj.options[Object.keys(this.state.options[show_name])[i]].type;
          console.log(userInput);
          if(type === "Float") {
            userInput = parseFloat(userInput);
            if(isNaN(userInput)) {
              console.log('invalid Floating point number');
              return false;
            } else if(!this.withinBounds(userInput, optionObj)){
              console.log('invalid Floating point number: too low or too high');
              return false;
            }
          } else if(type === "Integer"){
            userInput = parseInt(userInput);
            if(isNaN(userInput)){
              console.log('invalid Integer');
              return false;
            } else if(!this.withinBounds(userInput, optionObj)){
              console.log('invalid Floating point number: too low or too high');
              return false;
            }
          } else if(type === "Boolean"){
            if(userInput.toLowerCase() !== 'true' || userInput.toLowerCase() !== 'false'){
              console.log('invalid boolean', userInput.toLowerCase());
              return false;
            } else if(!this.withinBounds(userInput, optionObj)){
              console.log('invalid Floating point number: too low or too high');
              return false;
            }
          } else if(type === "List of Floats"){
            try {
              userInput = JSON.parse(userInput);
            } catch (e) {
              console.log('Invalid list of floats', e);
              return false;
            }
          } else {
            console.log('not checking this type', type);
          }
          console.log(type);
          console.log(userInput);
          console.log('passed all checks');
        } else {
          console.log(Object.keys(this.state.options[show_name])[i]);
        }
      }
      return true;
    } else {
      console.log('no user options');
      return true;
    }
    console.log('end of function');
    return false;
  }

  withinBounds(user_value, option_obj){
    console.log(user_value, option_obj);
    if(option_obj['type'] === 'Float'){
      if(typeof(option_obj['lowerBound']) === typeof('')){
        //this means the lower bound is another option
        let other_option = option_obj['lowerBound'];
        if(this.state.options[this.props.shows[this.state.selectedRow].name][other_option]){
          //the user has inputted the other option, so parse the string and check 
          try{
            let other_value = parseFloat(this.state.options[this.props.shows[this.state.selectedRow].name][other_option]);
            if(user_value < other_value){
              return false;
            }
          } catch (e){
            alert('please ensure', other_option, 'is valid');
            console.log('error with ', other_option, e);
          }
        } else {
          //use default value
          let other_value = option_obj['default'];
          if(user_value < other_value){
            return false;
          }
        }
      } else {
        //use lower bound from option_obj
        let lower_bound = option_obj['lowerBound'];
        if(user_value < lower_bound){
          return false;
        }
      }
      if(typeof(option_obj['upperBound']) === typeof('')){
        //this means the upper bound is another option
        let other_option = option_obj['upperBound'];
        if(this.state.options[this.props.shows[this.state.selectedRow].name][other_option]){
          //the user has inputted the other option, so parse the string and check 
          try{
            let other_value = parseFloat(this.state.options[this.props.shows[this.state.selectedRow].name][other_option]);
            if(user_value > other_value){
              return false;
            }
          } catch (e){
            alert('please ensure', other_option, 'is valid');
            console.log('error with ', other_option, e);
          }
        } else {
          //use default value
          let other_value = option_obj['default'];
          if(user_value > other_value){
            return false;
          }
        }
      } else {
        //use upper bound from option object
        let upper_bound = option_obj['upperBound'];
        if(user_value > upper_bound){
          return false;
        }
      }
      return true;
    }
    if(option_obj['type'] === 'Integer'){
      if(typeof(option_obj['lowerBound']) === typeof('')){
        //this means the lower bound is another option
        let other_option = option_obj['lowerBound'];
        if(this.state.options[this.props.shows[this.state.selectedRow].name][other_option]){
          //the user has inputted the other option, so parse the string and check 
          try{
            let other_value = parseInt(this.state.options[this.props.shows[this.state.selectedRow].name][other_option]);
            if(user_value < other_value){
              return false;
            }
          } catch (e){
            alert('please ensure', other_option, 'is valid');
            console.log('error with ', other_option, e);
          }
        } else {
          //use default value
          let other_value = option_obj['default'];
          if(user_value < other_value){
            return false;
          }
        }
      } else {
        //use lower bound from option_obj
        let lower_bound = option_obj['lowerBound'];
        if(user_value < lower_bound){
          return false;
        }
      }
      if(typeof(option_obj['upperBound']) === typeof('')){
        //this means the upper bound is another option
        let other_option = option_obj['upperBound'];
        if(this.state.options[this.props.shows[this.state.selectedRow].name][other_option]){
          //the user has inputted the other option, so parse the string and check
          try{
            let other_value = parseInt(this.state.options[this.props.shows[this.state.selectedRow].name][other_option]);
            if(user_value > other_value){
              return false;
            }
            console.log(other_value,'upper bound user inputted');
            console.log(user_value, 'user_value');
          } catch (e){
            alert('please ensure', other_option, 'is valid');
            console.log('error with ', other_option, e);
          }
        } else {
          //use default value
          let other_value = option_obj['default'];
          if(user_value > other_value){
            return false;
          }
            console.log(other_value,'upper bound default');
            console.log(user_value, 'user_value');
        }
      } else {
        //use upper bound from option object
        let upper_bound = option_obj['upperBound'];
        if(user_value > upper_bound){
          return false;
        }
            console.log(upper_bound,'upper bound default');
            console.log(user_value, 'user_value');
      }
      return true;
    }
  }

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
          onClick={() => this.debouncedSendRequest()}
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
