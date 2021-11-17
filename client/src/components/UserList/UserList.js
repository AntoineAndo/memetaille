import React from 'react'

import { userList } from './UserList.module.scss';
import { useEffect, useState } from 'react'
import { useAuth } from '../../providers/ProvideAuth';
import { getUsers } from '../../_services/user.service'

function UserList() {
        
    const auth = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(users.length == 0){
            getUsers(auth, (users)=>{
                setUsers(users)
            })
        }
    });

    return (
        <div className={ userList }>
            {users.map((user)=>{
                return <span key={user._id}>{user.username}</span>
            })}
        </div>
    )
}

export default UserList
