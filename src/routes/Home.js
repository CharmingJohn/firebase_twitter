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
      dbService
        .collection("ftweets")
        .orderBy("created At", "desc")
        .onSnapshot((snapshot) => {
          const newArray = snapshot.docs.map((document) => ({
              id:document.id,
              ...document.data(),
          }));
          setFtweets(newArray);
      });
    }, []);

    return (
        <div className="container">
             <FtweetFactory userObj={userObj}/>
             <div style={{ marginTop: 30 }}>
                 {ftweets.map((ftweet) => (
                     <Ftweet
                        key={ ftweet.id }
                        ftweetObj={ ftweet }
                        isOwner={ ftweet.creatorId === userObj.uid}
                    />
                 ))}
                 </div>
             </div>
    );
};

export default Home;