import React, { useEffect, useState } from 'react';

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const displayName = user?.user?.displayName;
        const email = user?.user?.email;
        const currentUser = {
            email: email,
            displayName: displayName
        };
        if (email && displayName) {
            fetch(`https://floating-stream-33356.herokuapp.com/profile?email=${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken)
                })
        }
    }, [user])
    return [token]
};

export default useToken;