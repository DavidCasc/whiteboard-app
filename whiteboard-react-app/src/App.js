import React, { useState } from 'react';
import LoginPage from './Pages/loginPage'
import './App.css';
import UserStore from './Store/UserStore'


function App() {
  console.log("rendered")

  const componentDidMount = async () => {
    try {
      let res = await fetch("/isLoggedIn", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }
      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }

    
    catch(e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  };

  const doLogout = async () => {
    try {
      let res = await fetch("/logout", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
      
    }

    
    catch(e) {
      console.log(e)
    }
  };
  
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userLogginStatus, setUserLoginStatus] = useState(false);

  /*
      Create a funtion which will handle the information 
      passed from the LoginPage component to the main app
  */
  const fetchUserData = (username, password, loginStatus) => {
    setUserName(username);
    setUserPassword(password);
    setUserLoginStatus(loginStatus);
  };
  /*
    Create a logical structure for routing. This will check to see if 
    the userStore and the login status are true. If so the user does 
    not need to log in again, they will be directed to the home page
  */
 
  if(userLogginStatus === false){
    return ( 
      <LoginPage updateCallback={fetchUserData}/>
    );
  }
  else {
    return (
      <p>Logged in</p>
    );
  }
}

export default App;
