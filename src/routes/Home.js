import { dbService } from 'fbase';
import React from 'react'
import { useEffect, useState } from "react";
import Ftweet from "components/Ftweet";
import FtweetFactory from 'components/FtweetFactory';

const Home = ({ userObj }) => {
    const [ftweets, setFtweets] = useState([]);
    /*
    const getFtweets = async () => {
        const dbFtweets = await dbService.collection("ftweets").get();
        dbFtweets.forEach((document) => {
            const ftweetObject = { ...document.data(), id: document.id };
            setFtweets((prev) => [document.data(), ...prev])
        }
            
        );
    };
    */

    useEffect(() => {
      //  getFtweets();
      dbService.collection("ftweets").onSnapshot((snapshot) => {
          const newArray = snapshot.docs.map((document) => ({
              id:document.id,
              ...document.data(),
          }));
          setFtweets(newArray);
      });
    }, []);

    return (
        <>
             <FtweetFactory userObj={userObj}/>
        </>
    );
};

export default Home;