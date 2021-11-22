import { useState } from 'react'
import { useAuth } from '../../providers/ProvideAuth';
import { userDetail } from './UserListEntry.module.scss'

import ProfilePopup from '../ProfilePopup/ProfilePopup'


function UserListEntry({user, edit, openConversation}) {
    
    const auth = useAuth();
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const localOpenConversation = (e) => {
        openConversation(user, edit)
    }

    return (
        <>
            <div className={ userDetail } onClick={localOpenConversation}>
                <p className="username">{user.username}<span>{user.height}cm</span></p>
                <p className="status">{user.status}</p>
            </div>
        </>

    )
}

export default UserListEntry
