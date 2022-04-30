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
        setIsLoggedIn(user);
        setUserobj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  setInterval(() => console.log(authService.currentUser), 2000);
  console.log(authService.currentUser)
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn= { isLoggedIn } userObj={userObj}/>
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} firebase_twitter </footer>
    </>
  );
}

export default App;
