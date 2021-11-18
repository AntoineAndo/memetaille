import React from 'react'

import { sidebar, userDetail, userList, userListEntry, userContainer } from './Sidebar.module.scss';
import UserListEntry from '../UserListEntry/UserListEntry';
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
        <div className={ sidebar }>
            <div className={ userContainer }>
                <div className={ userDetail }>
                    <p className="username">Meramon<span>211cm</span></p>
                    <p className="status">Cherche des femmes chaudes à ma taille</p>
                </div>
            </div>
            <ul className={ userList }>
                {users.map((user)=>{
                    return <><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/><UserListEntry key={user._id} user={user}/></>
                })}
            </ul>
        </div>
    )
}

export default UserList
