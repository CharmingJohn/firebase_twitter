import { dbService } from "fbase";
import { useState } from "react";

const Ftweet = ({ ftweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newFtweet, setNewFtweet] = useState(ftweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Do you really delete it?");
        console.log(ok);
        if (ok) {
            console.log(ftweetObj.id);
            const data = await dbService.doc(`ftweets/${ftweetObj.id}`).delete();
            console.log(data)
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