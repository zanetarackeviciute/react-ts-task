import { useState, useEffect } from "react"
const Jokes = () => {

    interface Jokes {
        joke: string;
        date: string;
    }

    const storedJokes = localStorage.getItem('JokesList')
    
    const [newJoke, setNewJoke] = useState<string>('')
    const [newTime, setNewTime] = useState<string>('')

    const [jokesList, setJokesList] = useState<Jokes[]>([])

    useEffect(() => {
        if (storedJokes) {
            setJokesList(JSON.parse(storedJokes))
        }
    } ,[])

    useEffect(() => {
        async function getAjoke() { 
            const response = await fetch('https://api.chucknorris.io/jokes/random?category=dev')
            const data = await response.json()

            const gottenJoke = {
                joke: data.value,
                date: new Date().toLocaleString()
            }

            setNewJoke(gottenJoke.joke)
            setNewTime(gottenJoke.date)

            setJokesList(oldList => [...oldList, gottenJoke])
        }

        getAjoke() 

        const interval = setInterval(getAjoke, 15000)

        return () => clearInterval(interval)

    }, [])

    useEffect(() => {
        localStorage.setItem('JokesList', JSON.stringify(jokesList))
    }, [jokesList])

    return (
        <div>
            <h2>Naujausias juokelis!</h2>
            <p>{newJoke}</p>
            <p>{newTime}</p>
            {
                jokesList.map((joky) => {
                    return (
                        <>
                            <p>{joky.joke}</p>
                            <p>{joky.date}</p>
                        </>
                    )
                })
            }
        </div>
    )
}
export default Jokes