import { Outlet, Link } from "react-router-dom"
const MainLayout = () => {
  return (
    <div>
        <nav>
            <Link to='/users'>Vartotojai</Link> | <Link to='/jokes'>Juokeliai</Link>
        </nav>
        <Outlet />
    </div>
  )
}

export default MainLayout