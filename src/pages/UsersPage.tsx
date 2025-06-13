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
                    name: 'Ignas', 
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


    const handleDeleteUser = (id) => {
        setUsers(users.filter(users => users.id != id))
    }

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])

    return (
        <div>
            <h1>Vartotojų sąrašas</h1>
            <ol>
                    {
                        users.map((user) => {
                            return <li key={user.id}>
                                <p><strong>Vardas:</strong> {user.name}</p>
                                <p><strong>Pareigos:</strong> {user.position}</p>
                                <p><strong>Lytis:</strong> {user.gender}</p>
                                <p><strong>Amžius:</strong> {user.age}m.</p>
                                <button onClick={() => handleDeleteUser(user.id)}>Ištrinti vartotoją</button>
                            </li>
                        })
                    }
            </ol>
        </div>
    )
}

export default UsersPage