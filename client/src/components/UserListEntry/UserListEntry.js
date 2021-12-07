import { userDetail } from './UserListEntry.module.scss'


function UserListEntry({user, edit, openTab}) {
    

    const _openConversation = (e) => {
        openTab(user.socketID, edit)
    }

    return (
        <>
            <div className={ userDetail } onClick={_openConversation}>
                <p className="username">{user.username}<span>{user.height}cm</span></p>
                <p className="status">{user.status}</p>
            </div>
        </>

    )
}

export default UserListEntry
