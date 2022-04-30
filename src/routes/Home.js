import { dbService } from 'fbase';
import React from 'react'
import { useEffect, useState } from "react";
import Ftweet from "components/Ftweet";

const Home = ({ userObj }) => {
    const [ftweet, setFtweet] = useState("");
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

    

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("ftweets").add({
            text: ftweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        });
        setFtweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setFtweet(value);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value={ftweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Ftweet" />
            </form>
            <div>
                {ftweets.map((ftweet) => (
                    <Ftweet 
                        key={ftweet.id} 
                        ftweetObj = {ftweet}
                        isOwner= {ftweet.creatorId === userObj.uid}
                    />
                    ))}
            </div>
        </>
    );
};

export default Home;