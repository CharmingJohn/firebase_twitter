import { dbService, storageService } from "fbase";
import { useState } from "react";

const Ftweet = ({ ftweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newFtweet, setNewFtweet] = useState(ftweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Do you really delete it?");
        if (ok) {
            await dbService.doc(`ftweets/${ftweetObj.id}`).delete();
            if (ftweetObj.attachmentUrl !== ""){
                await storageService.refFromURL(ftweetObj.attachmentUrl).delete();
            }
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewFtweet(value);
    };
    
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`ftweets/${ftweetObj.id}`).update({ text: newFtweet });
        setEditing(false);
    }

    return (
        <div>
            {editing ?(
                <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value = {newFtweet} required />
                        <input type="submit" value="Update Ftweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ):(
                <>
                    <h4>{ftweetObj.text}</h4>
                    {ftweetObj.attachmentUrl && (
                        <img src={ftweetObj.attachmentUrl} width = "50px" height = "50px" alt="" />
                    )}
                    {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Ftweet</button>
                    <button onClick={toggleEditing}>Edit Ftweet</button>
                </>
                )}
            </>
            )}
        </div>
    );
};

export default Ftweet;