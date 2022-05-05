import { dbService, storageService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="ftweet">
            {editing ?(
                <>
                    <form onSubmit={onSubmit} className="container ftweetEdit">
                        <input 
                            onChange={onChange} 
                            value = {newFtweet} 
                            required 
                            placeholder="Eidt your ftweet"
                            autoFocus
                            className="formInput"
                        />
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
                <div className="ftweet__actions">
                    <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                </div>
                )}
            </>
            )}
        </div>
    );
};

export default Ftweet;