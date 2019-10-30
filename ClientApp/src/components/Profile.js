import React from "react";
import decodeJWT from 'jwt-decode';
import Highlight from './Highlight';

const Profile = () => {
    var token = localStorage.getItem('token');
    if (!token) return;
    return (
        <Highlight>{JSON.stringify(decodeJWT(token), null, 2)}</Highlight>
    );
}

export default Profile;
