import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        axios
            .get('/api/jokes')
            .then((response) => {
                setJokes(response.data);
            })
            .catch((error) => {
                console.error('Error fetching jokes:', error);
            });
    }, []);

    return (
        <div className="App">
            <h1>Jokes</h1>
            <p>{jokes.length} jokes</p>
            <div>
                {jokes.map((joke, index) => (
                    <div key={joke.id}>
                        <p>{joke.title}</p>
                        <p>{joke.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
