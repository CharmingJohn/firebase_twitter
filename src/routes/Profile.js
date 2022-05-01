import { authService, dbService } from "fbase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Profile = ( {userObj} ) => {

    const navigate = useNavigate();

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
    return (
    <>
        <button onClick={onLogOutClik}>Log Out</button>
    </>
    );
}

export default Profile;