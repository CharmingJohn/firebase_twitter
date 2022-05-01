import React from 'react'
import AppRouter from "components/Router";
import { useEffect, useState } from "react";
import { authService } from "fbase";

function App() {
  const [ init, setInit] = useState(false);
  const [ isLoggedIn, setIsLoggedIn] = useState(false);
  const [ userObj, setUserobj ] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserobj({
          uid:user.uid,
          displayName:user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  setInterval(() => console.log(authService.currentUser), 2000);
  console.log(authService.currentUser)

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserobj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser= { refreshUser } 
          isLoggedIn= { Boolean(userObj) } 
          userObj={userObj}/>
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
