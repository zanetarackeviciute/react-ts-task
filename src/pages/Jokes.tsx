import { useState, useEffect } from "react"
const Jokes = () => {
    const [joke, setJoke] = useState<string>('')
    const [time, setTime] = useState<string>('')
    

    useEffect(() => {
        async function getAjoke() { 
            fetch('https://api.chucknorris.io/jokes/random?category=dev')
            const response = await fetch('https://api.chucknorris.io/jokes/random?category=dev')
            const data = await response.json()
            setJoke(data.value)
            setTime(new Date().toLocaleString())
        }

        getAjoke() 

        

        const interval = setInterval(getAjoke, 15000)

        return () => clearInterval(interval)

    }, [])

    return (
        <div>
            <h1>Dienos juokelis!</h1>
            <p>{joke}</p>
            <p>{time}</p>
        </div>
    )

}
export default Jokes