import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Jokes from './pages/Jokes'
import UsersPage from './pages/UsersPage'
function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainLayout />}>
                        <Route index element={<UsersPage />}/>
                        <Route path='/users' element={<UsersPage />} />
                        <Route path='/jokes' element={<Jokes />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
