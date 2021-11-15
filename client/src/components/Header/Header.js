import { header } from './Header.module.scss';

const Header = ({title}) => {
    return (
        <header className={header}>
            <h1>{title}</h1>
        </header>
    )
}

Header.defaultProps = {
    title: 'Memetaille.com'
}

export default Header
