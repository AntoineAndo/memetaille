import React from 'react'
import { userListEntry } from './UserListEntry.module.scss'


function UserListEntry({user}) {
    return (
        <li className={ userListEntry }>
            <div className="userDetail">
                <p className="username">{user.username}</p>
                <p>{user.height}</p>
            </div>
        </li>
    )
}

export default UserListEntry
