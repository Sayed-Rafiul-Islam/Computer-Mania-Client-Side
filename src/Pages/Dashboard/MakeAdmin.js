import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import auth from '../../firebase.init';

const MakeAdmin = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const getUsers = () => {
            fetch(`https://floating-stream-33356.herokuapp.com/users`, {
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
        getUsers();
    }, [reload])

    const handleMakeAdmin = email => {
        const role = 'admin';
        fetch(`https://floating-stream-33356.herokuapp.com/makeAdmin?email=${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
                    setReload(reload + 1)
                }

            })

    }
    return (
        <div className='ml-6 lg:ml-28'>
            <div className="overflow-x-auto mt-12 w-full">
                <table className="table">
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
                            users.map((user, index) =>
                                < tr key={user._id} className='text-center' >
                                    <th>{index + 1}</th>
                                    <td>{user.displayName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role === 'admin' ? <b className='text-primary'>ADMIN</b> : <b>USER</b>}</td>
                                    <td>{user.role === 'admin' ? '' :
                                        <button onClick={() => handleMakeAdmin(user.email)} className='btn btn-sm btn-outline btn-primary'>Make Admin</button>
                                    }</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div >
    );
};

export default MakeAdmin;