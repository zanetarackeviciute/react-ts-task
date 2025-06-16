import { useState, useEffect } from "react"
import styles from './Jokes.module.css'
import smile from './joke.png'
const Jokes = () => {

    interface Jokes {
        joke: string;
        date: string;
    }

    const storedJokes = localStorage.getItem('JokesList')
    
    const [newJoke, setNewJoke] = useState<string>('')
    const [newTime, setNewTime] = useState<string>('')

    const [jokesList, setJokesList] = useState<Jokes[]>([])

    const [showHistory, setShowHistory] = useState(false)

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

    const handlerAllJokes = () => {
        setShowHistory(previous => ! previous)
    }

    return (
        <div className={styles.container}>
            <h1>Naujausias juokelis!</h1>
            <div className={styles.jokeBlock}>
                <div className={styles.newJoke}>
                    <p>{newJoke}</p>
                    <p className={styles.lastDate}>{newTime}</p>
                </div>
                <div className={styles.pic}>
                    <img src={smile} alt="smile" />
                </div>
            </div>
            <button onClick={handlerAllJokes}>
                {showHistory ? 'Slėpti visus juokelius' : 'Rodyti visus juokelius'}
            </button>
            {
                showHistory && (
                <div  className={styles.jokesCards}>
                    {
                        jokesList.map((joky, index) => {
                            return (
                                    <div key={index} className={styles.jokeCard}>
                                        <p>{joky.joke}</p>
                                        <p className={styles.lastDate}>{joky.date}</p>
                                    </div>
                            )
                        })
                    }
                </div>
                )
            }
        </div>
    )
}
export default Jokes