import React from 'react'
import {} from './Conversation.module.scss'

function Conversation({user}) {
    return (
        <div>
            {user.username}
        </div>
    )
}

export default Conversation
