import { useEffect, useState } from "react"

const UsersPage = () => {
    interface User {
        id: number;
        name: string;
        position: string;
        gender: string;
        age: number;
    }

    const [users, setUsers] = useState<User[]>([])

    const storedUsers = localStorage.getItem('users')

   
    
    useEffect(() => {
        if (storedUsers != null) {
        setUsers(JSON.parse(storedUsers))
        } else {
            setUsers([
                {
                    id: 1, 
                    name: 'Jonas', 
                    position: 'Duomenų analitikas', 
                    gender: 'Vyras', 
                    age: 41
                },
                {
                    id: 2,
                    name: 'Lina',
                    position: 'Front-End programuotoja',
                    gender: 'Moteris',
                    age: 32
                },
                {
                    id: 3,
                    name: 'Tomas',
                    position: 'Java programuotojas',
                    gender: 'Vyras',
                    age: 20
                }
            ])
        } 
    }, [])

    return (
        <div>
            <h1>Vartotojų sąrašas</h1>
            <ul>
                {}
            </ul>
        </div>
    )
}

export default UsersPage