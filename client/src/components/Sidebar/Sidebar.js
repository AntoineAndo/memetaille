import React from 'react'

import { sidebar, userDetail, userList, userListEntry, fixedUser } from './Sidebar.module.scss';
import UserListEntry from '../UserListEntry/UserListEntry';
import { useEffect, useState } from 'react'
import { useAuth } from '../../providers/ProvideAuth';
import UseUserService from '../../_services/user.service'

import ProfilePopup from '../ProfilePopup/ProfilePopup';

function Sidebar({openConversation}) {
    const auth = useAuth();
    const [users, setUsers] = useState([]);
    const userService = UseUserService();
    

    useEffect(() => {
        if(users.length == 0){
            userService.getUsers((users)=>{
                setUsers(users)
            })
        }
    });

    return (
        <div className={ sidebar }>
            <div className={ fixedUser }>
                <UserListEntry user={auth.loggedUser} openConversation={openConversation} edit="true"/>
            </div>
            <ul className={ userList }>
                {users.map((user, nb)=>{
                    return <>
                    <li key={user._id}>
                        <UserListEntry user={user} openConversation={openConversation} edit="false"/>
                    </li>
                    </>
                })}
            </ul>
        </div>
    )
}

export default Sidebar
