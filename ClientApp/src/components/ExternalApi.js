import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import Profile from './Profile';

const ExternalApi = () => {
    const [showResult, setShowResult] = useState(false);
    const [apiMessage, setApiMessage] = useState("");
    const {
        isAuthenticated,
        logout,
        loginWithRedirect
    } = useAuth0();
    const logoutWithRedirect = () => {
        localStorage.removeItem('token');
        logout({
            returnTo: window.location.origin
        });
    }

    const callApi = async () => {
        try {
            var token = localStorage.getItem('token');
            const response = await fetch(
                "https://localhost:5002/api/SampleData/CallApi",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const responseData = await response.json();

            setShowResult(true);
            setApiMessage(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isAuthenticated && <Profile />}
            <h1>External API</h1>
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Login</button>
            )}
            {isAuthenticated && (
                <button onClick={() => logoutWithRedirect()}>Logout</button>
            )}
            <button onClick={callApi}>Ping API</button>
            {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
        </>
    );
};

export default ExternalApi;
