import { dbService } from 'fbase';
import React from 'react'
import { useEffect, useState } from "react";
import Ftweet from "components/Ftweet";

const Home = ({ userObj }) => {
    const [ftweet, setFtweet] = useState("");
    const [ftweets, setFtweets] = useState([]);
    const [attachment, setAttachment] = useState("");
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

    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => setAttachment("");

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
                <input type="file" accept="image/*" />
                <input type="submit" value="Ftweet" />
                <div>
                    {attachment && <img src={attachment} width="50px" height="50px" />}
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
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