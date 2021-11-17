import { content } from './Home.module.scss'


import UserList from '../UserList/UserList';

function Home() {

    return (
        <div className={content}>
            <UserList />
        </div>
    )
}

export default Home
