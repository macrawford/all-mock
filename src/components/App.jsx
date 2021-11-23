import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function App() {
    const [resultsObject, setResultsObject] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const handleChange = (e) => {
        setSearchInput(e.target.value);
        console.log('searchInput: ', searchInput)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('/search/' + searchInput)
            .then(({data}) => {
                console.log('data: ', data)
                // add it to state
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    };
    return (
        <div>
            <h1>
                Your Own Personal Bartender!
            </h1>
            <button style={{marginBottom: 15}}>
                Show your saved cocktails
            </button>
            <form>
                <input onChange={handleChange}></input>
                <button onClick={handleSubmit}>Search Cocktails</button>
            </form>
        </div>
    )
};

export default App;