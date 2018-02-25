const regPopup = document.getElementById("reg-form");
//var passInputs = document.querySelectorAll('input[type="password"]');

function displayRegisterPopup() {
  regPopup.style.display = "block";

}

function hideRegisterPopup() {
  regPopup.style.display = "";
  clearPassword();
}

function hideWarning() {
  let warning = document.querySelectorAll('.warning');
  //let passInputs = document.querySelectorAll('input[type="password"]');
  for (let i = 0;i < warning.length; i++){
    if (warning[i].style.visibility == 'visible'){
      warning[i].style.visibility = 'hidden';
      // for (let j = 0; j < passInputs.length; j++){
      //   passInputs[j].value = '';
      clearPassword();
      
    }
  }
}

function clearPassword(){
  let passInputs = document.querySelectorAll('input[type="password"]');
  for (let j = 0; j < passInputs.length; j++){
    passInputs[j].value = '';
  }
}

function toggleSignOut() {
  if (sidebarMenu.className !== "menu ") {displayMenu();}
  clearPassword();
  firebase
    .auth()
    .signOut()
    .catch(err => {
      console.log(err);
    });
}

function toggleSignIn() {

    var email = document.getElementById('auth_login').value;
    var password = document.getElementById('auth_password').value;
    var warning = document.querySelector('.warning');

    // warning.style.visibility = 'hidden';
    if (email.length < 4 || password.length < 4) {
      warning.style.visibility = 'visible';
      warning.textContent = 'Enter e-mail and password';
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        warning.style.visibility = 'visible';
        warning.textContent = 'Invalid password!';
        //alert('Wrong password.');
      }
      if (errorCode === 'auth/invalid-email'){
        warning.style.visibility = 'visible';
        warning.textContent = 'Invalid e-mail!';
      }
      if (errorCode === 'auth/user-not-found' ) {
        warning.style.visibility = 'visible';
        warning.textContent = 'No user exists with this login!';
      }
       else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END authwithemail]
}

function handleSignUp() {
  var email = document.getElementById('register_login').value;
  var password = document.getElementById('register_password').value;
  var confirm = document.getElementById('register_confirmation').value;
  var alertMessage = document.querySelectorAll('#reg-form .warning');

  if (email.length < 4) {
    alertMessage[0].style.visibility = 'visible';
    alertMessage[0].textContent = 'Please enter login!';
    return;
  }
  if (password.length < 6) {
    alertMessage[1].style.visibility = 'visible';
    alertMessage[1].textContent = 'The password must have 6 characters or more!';
    return;
  }
  if (confirm !== password) {
    alertMessage[2].style.visibility = 'visible';
    alertMessage[2].textContent = 'Passwords do not match!';
    return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      let name = email.slice(0, email.lastIndexOf('@'));
      hideRegisterPopup();
      user.updateProfile({displayName: name})
      .then(() => initApp());

    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alertMessage[1].style.visibility = 'visible';
      alertMessage[1].textContent = 'The password is too weak';
    }
    if (errorCode == 'auth/invalid-email'){
      alertMessage[0].style.visibility = 'visible';
      alertMessage[0].textContent = 'Invalid e-mail address';
    }
    if (errorCode == 'auth/email-already-in-use') {
      alertMessage[0].style.visibility = 'visible';
      alertMessage[0].textContent = 'This e-mail adress already in use!';
    }
    else {
      alertMessage[3].style.visibility = 'visible';
      alertMessage[3].textContent = errorMessage;
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END createwithemail]
}

function initApp() {

  var inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(user => {

    const LogInForm = document.querySelector('.autoriz-reg-form');
    const LogOutForm = document.querySelector('.logOut');
    const welcome = document.querySelector('.logOut span');
    const sidebar = document.getElementById('sidebar');

    if (user) {
      //User is signed in.
      var displayName = user.displayName;

      // [START_EXCLUDE]
      //change elements on page when user is signed in
      console.log('signed in');
      LogInForm.style.display = 'none';
      welcome.title = displayName;
      if (displayName.length > 13) {
        displayName = displayName.substr(0,13) + '..';
      }
      welcome.textContent = 'Welcome, ' + displayName;
      LogOutForm.style.display = 'block';
      sidebar.firstElementChild.onclick = displayMenu;
      sidebar.style.opacity = '1.0';
      sidebar.style.cursor = 'pointer';
      sidebar.firstElementChild.classList.add('enableBurger');
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      console.log('signed out');
      LogInForm.style.display = 'block';
      LogOutForm.style.display = 'none';
      welcome.textContent = 'Welcome to our website!'
      sidebar.firstElementChild.onclick = null;
      sidebar.style.opacity = '';
      sidebar.style.cursor = '';
      sidebar.firstElementChild.classList.remove('enableBurger');
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]

    // [END_EXCLUDE]
  });
  // [END authstatelistener]
  document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
  document.getElementById('auth').addEventListener('click', toggleSignIn, false);
  document.querySelector('.logOut button').addEventListener('click', toggleSignOut, false);
  for (let i = 0 ;i < inputs.length; i++){
    inputs[i].addEventListener('focus', hideWarning, false);
  }
}

window.onload = function() {
  initApp();
};
