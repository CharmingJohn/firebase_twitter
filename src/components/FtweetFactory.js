import React from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4} from "uuid";
import { useState } from "react";

const FtweetFactory = ({userObj}) => {

    const [ftweet, setFtweet] = useState("");
    const [attachment, setAttachment] = useState("");


    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl=""
        if (attachmentUrl !== ""){
        const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
    }
        await dbService.collection("ftweets").add({
            text: ftweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        });
        setFtweet("");
        setAttachment("");
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
        <form onSubmit={onSubmit}>
            <input
                value={ftweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxlength={120}
            />
            <input type="file" accept="image/* onChange={onFileChange}" />
            <input type="submit" value="Ftweet" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" alt="" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </form>
    );
}

export default FtweetFactory;