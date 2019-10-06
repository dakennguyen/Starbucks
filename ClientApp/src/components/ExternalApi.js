import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-wrapper";

const ExternalApi = () => {
    const [showResult, setShowResult] = useState(false);
    const [apiMessage, setApiMessage] = useState("");
    const {
        isAuthenticated,
        logout,
        loginWithRedirect,
        getTokenSilently
    } = useAuth0();
    const logoutWithRedirect = () =>
        logout({
            returnTo: window.location.origin
        });

    const callApi = async () => {
        try {
            var token = "";
            if (isAuthenticated)
            {
                token = await getTokenSilently();
            }
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
