import firebase from "firebase";
import { firebaseConfig } from "./../firebaseConfig";
import { RegisterOnMurmurBackend } from "./firebaseRegisterToMurmurBackendAPI";
import { queryForEmail } from "../fakebackend_helper";

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const providerFacebook = new firebase.auth.FacebookAuthProvider();
const providerGoogle = new firebase.auth.GoogleAuthProvider();

function FirebaseAuth(value, props) {
  console.log(value, props);
  if (value === "GoogleLoginRegister") {
    firebase
      .auth()
      .signInWithPopup(providerGoogle)
      .then((result) => {
        RegisterOnMurmurBackend({ result }, props);
      });
  }
  if (value === "GoogleLogin") {
    firebase
      .auth()
      .signInWithPopup(providerGoogle)
      .then((result) => {
      
        const credential = result.credential;
        const additionalUserInfo = result.additionalUserInfo;

       
        props.login({profile: additionalUserInfo.profile, history: props.history})

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  if (value === "FacebookLogin") {
    firebase
      .auth()
      .signInWithPopup(providerFacebook)
      .then((result) => {
        console.log(result);
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
}

function FirebaseSignout() {
  firebase
    .auth()
    .signOut()
    .then((response) => {
      // Sign-out successful.
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
}

export { FirebaseAuth, FirebaseSignout };
