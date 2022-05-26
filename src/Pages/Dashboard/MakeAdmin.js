import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import auth from '../../firebase.init';

const MakeAdmin = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const getParts = () => {
            fetch(`http://localhost:5000/users`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        navigate('/home')
                        signOut(auth);
                        localStorage.removeItem('accessToken')
                    }
                    return res.json()
                })
                .then(data => setUsers(data))
        }
        getParts();
    }, [])

    const handleMakeAmin = email => {
        const role = 'admin';
        fetch(`http://localhost:5000/makeAdmin?email=${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ role })
        })
            .then(res => {
                if (res.status === 403) {
                    console.log("It's a fraud !!")
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken);


                    // setToken(accessToken)
                    setReload(reload + 1)

                }

            })

    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Upgrade Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user =>
                                < tr className='text-center' >
                                    <th>{user.index}</th>
                                    <td>{user.displayName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role === 'admin' ? <b className='text-primary'>ADMIN</b> : <b>USER</b>}</td>
                                    <td>{user.role === 'admin' ? '' : <button onClick={() => handleMakeAmin(user.email)} className='btn btn-sm btn-outline btn-primary'>Make Admin</button>}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;