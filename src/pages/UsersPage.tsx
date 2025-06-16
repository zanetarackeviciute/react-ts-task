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

    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState(0)

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

    const handlerDeleteUser = (id:number) => {
        setUsers(users.filter(users => users.id != id))
    }

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])

    const handlerResetUsers = () => {
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

    const handlerNewUser = () => {
        setShowForm(true)
    }

    const [showForm, setShowForm] = useState(false)

    const submitHandlerNewUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setUsers([...users, {
            id: users.length + 1,
            name: name,
            position: position,
            gender: gender,
            age: age
        }])

        setName('')
        setPosition('')
        setGender('')
        setAge(0)

        setShowForm(false)
    }

    const [sortOrder, setSortOrder] = useState('')

    useEffect(() => {
        const newOrder = [...users];
        if (sortOrder == 'a-z') {
            newOrder.sort((a, b) => a.name.localeCompare(b.name))
        } else if (sortOrder == 'z-a') {
            newOrder.sort((a, b) => b.name.localeCompare(a.name))
        } else if (sortOrder == 'age-up') {
            newOrder.sort((a, b) => a.age - b.age)
        } else if (sortOrder == 'age-down') {
            newOrder.sort((a, b) => b.age - a.age)
        }
        setUsers(newOrder)
    }, [sortOrder])
    return (
        <div>
            <select name="orderByName" id="orderByName" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                <option value="a-z">Rūšiuoti pagal vardą A-Z</option>
                <option value="z-a">Rūšiuoti pagal vardą Z-A</option>
                <option value="age-up">Rūšiuoti pagal amžių (didėjančiai)</option>
                <option value="age-down">Rūšiuoti pagal amžių (mažėjančiai)</option>
            </select>
            <h1>Vartotojų sąrašas</h1>
            <ol>
                    {
                        users.map((user) => {
                            return <li key={user.id}>
                                <p><strong>Vardas:</strong> {user.name}</p>
                                <p><strong>Pareigos:</strong> {user.position}</p>
                                <p><strong>Lytis:</strong> {user.gender}</p>
                                <p><strong>Amžius:</strong> {user.age}m.</p>
                                <button onClick={() => handlerDeleteUser(user.id)}>Ištrinti vartotoją</button>
                            </li>
                        })
                    }
            </ol>
            <button onClick={handlerResetUsers}>Atstatyti pradinius vartotojus</button>
            <button onClick={handlerNewUser}>Naujas vartotojas</button>

            {
                showForm && (
                <form onSubmit={submitHandlerNewUser}>
                    <div>
                        <label htmlFor="name">Įveskite vardą:</label>
                        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="position">Įveskite pareigas:</label>
                        <input type="string" id="position" value={position} onChange={(event) => setPosition(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="gender">Pasirinkite lytį:</label>
                        <select name="gender" id="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
                            <option value="man">Vyras</option>
                            <option value="woman">Moteris</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="age">Įveskite amžių</label>
                        <input type="number" id="age" min='16' max='100' value={age} onChange={(event) => setAge(event.target.valueAsNumber)}/>
                    </div>
                    <button type="submit">Išsaugoti</button>
                </form>
                )
            }
        </div>
    )
}

export default UsersPage