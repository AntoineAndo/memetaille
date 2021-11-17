import { header, userContainer, infoContainer, userName, userHeight } from './Header.module.scss';
import { useAuth } from '../../providers/ProvideAuth';

const Header = ({title}) => {

    const auth = useAuth();
    console.log(auth)

    return (
        <header className={header}>
            <div className={userContainer}>
                <img src="" alt="" />
                <div className={infoContainer}>
                    <span className={userName}>{auth.loggedUser.username}</span>
                    <span className={userHeight}>{auth.loggedUser.username}</span>
                </div>
            </div>
            <h1>{title}</h1>
        </header>
    )
}

Header.defaultProps = {
    title: 'Memetaille.com'
}

export default Header
