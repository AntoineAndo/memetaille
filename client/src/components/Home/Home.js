import { dashboard, messages } from './Home.module.scss'
import Header from '../Header/Header'


import Sidebar from '../Sidebar/Sidebar';

function Home() {

    return (
        <section className={ dashboard }>
            <Header/>
            <Sidebar />
            <div className={messages} ></div>
        </section>
    )
}

export default Home
