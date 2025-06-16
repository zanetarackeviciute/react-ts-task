import { Outlet, Link } from "react-router-dom"
import styles from './MainLayout.module.css'

const MainLayout = () => {
  	return (
    	<div>
        	<nav>
            	<Link to='/users' className={styles.link}>Vartotojai</Link> <strong>|</strong> <Link to='/jokes' className={styles.link}>Juokeliai</Link>
        	</nav>
        	<Outlet/>
    	</div>
  	)
}

export default MainLayout