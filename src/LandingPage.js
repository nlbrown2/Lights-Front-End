import React, { Component } from 'react';
import styled from 'styled-components';
import { initalizeFirebaseUI } from './services/initalizeFirebase.js';
import { Grid, Header } from 'semantic-ui-react';
import BodyImages from 'react-body-images';

const Headers = styled(Header)`
  color: #041E42;
  align-self: center;
  text-align: center;
  -webkit-margin-before:0em;
  -webkit-margin-after:0em;
  margin-top: 1rem;
  text-shadow: -1px 0 #FFC72C, 0 -1px #FFC72C, -1px 0 #FFC72C, 0 -1px #FFC72C;
  font-size: 20px;
  padding-top: 1em;
`;

const GridFull = styled(Grid)`
  height: 100%;
`;

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.firebaseui = initalizeFirebaseUI(this.props.auth, '#firebaseui-auth-container', this.props.onSuccess);
  }

  render(){
    return(
      <div >
        <BodyImages bgImageArray={['./Cube.png']}>
          <div style={{height: "100vh"}} >
            <GridFull>
              <Grid.Row style={{marginBottom: '-1rem'}}>
              <Grid.Column verticalAlign="bottom">
                <Headers as={"h1"} textAlign="center"> Please sign in first </Headers>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center" style={{marginTop: '-1rem', justifyContent: 'center'}}>
                <div style={{width: '100%'}}id="firebaseui-auth-container">
                </div>
            </Grid.Row>
            <Grid.Row />
            <Grid.Row />
            </GridFull>
        </div>
        </BodyImages>
      </div>
    );
  }
}

export default LandingPage;
