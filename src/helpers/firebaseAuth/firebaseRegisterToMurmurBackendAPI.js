//We use this helper function to dispatch values to googlesignup state

function RegisterOnMurmurBackend(
  { result: { credential, additionalUserInfo } },
  props
) {
  //props.dispatch(google_signup("Emin Emin"));
  //console.log("From", additionalUserInfo);
  props.google(additionalUserInfo.profile,props.history);
}

export { RegisterOnMurmurBackend };
