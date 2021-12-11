import { action } from './Header.module.scss';
import { useAuth } from '../../providers/ProvideAuth';

const Header = ({title}) => {

    const auth = useAuth();
    
    console.log("____Header render")

    return (
        <header>
            <h1>Memetaille.com</h1>
            <div className={action}>
                <div className="logout">
                    <p>Supprimer mon compte</p>
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    title: 'Memetaille.com'
}

export default Header
