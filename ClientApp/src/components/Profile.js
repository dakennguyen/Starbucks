import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import Highlight from './Highlight';

const Profile = () => {
    const { user } = useAuth0();
    return (
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
    );
}

export default Profile;
