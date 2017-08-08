import * as firebase from 'firebase';
import firebaseui from 'firebaseui';

export default function initalizeFirebaseApp(){
  // new comment
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD8aV_iPuJrkx-GAuT5hv67cHMfFGfrxig",
      authDomain: "rpi-lights.firebaseapp.com",
      databaseURL: "https://rpi-lights.firebaseio.com",
      projectId: "rpi-lights",
      storageBucket: "",
      messagingSenderId: "407575179834"
    };
  return firebase.initializeApp(config);
}

export function firebaseUIConfig(onSignIn) {
  return {
    callbacks: {
          // Called when the user has been successfully signed in.
      signInSuccess: function(user, credential, redirectUrl) {
        console.log(onSignIn);
        onSignIn(user);
      //                       // Do not redirect.
        return false;
      }
    },
    signInOptions: [ {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
    } ],
    signInFlow: 'redirect',
  };
}

export function initalizeFirebaseUI(firebaseAuth, startString, onSignIn){
  var ui = new firebaseui.auth.AuthUI(firebaseAuth)
  // ui.start(startString, firebaseUIConfig(onSignIn));
  return ui;
}
