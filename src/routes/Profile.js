import { authService } from "fbase";
import { useNavigate } from "react-router-dom"

const Profile = () => {

    const navigate = useNavigate();

    const onLogOutClik = () =>{
        authService.signOut();
        navigate("/");    
    };

    return (
    <>
        <button onClick={onLogOutClik}>Log Out</button>
    </>
    );
}

export default Profile;