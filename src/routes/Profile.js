import { authService, dbService } from "fbase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Profile = ( { userObj, refreshUser } ) => {

    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClik = () =>{
        authService.signOut();
        navigate("/");
    };
    /*
    const getMyFtweets = async () => {
        const ftweets = await dbService
        .collection("ftweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAy", "asc")
        .get();
    };

    useEffect(() => {
        getMyFtweets();
    }, []);
    */

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName });
            refreshUser();
        }
    }
    return (
    <>
        <form onSubmit={onSubmit}>
            <input 
                onChange = {onChange}
                type="text" 
                placeholder="Display name" 
                value={newDisplayName}/>
            <input type="submit" placeholder="Update Profile" />
        </form>
        <button onClick={onLogOutClik}>Log Out</button>
    </>
    );
}

export default Profile;