import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function App() {
    const [resultsObject, setResultsObject] = useState([]);
    /*
        {
            strDrink: result[strDrink]
        }
    */
    const [searchInput, setSearchInput] = useState('');
    const toggleExpanded = (index) => {
        var copyObj = resultsObject.slice();
        copyObj[index]['isExpanded'] = !copyObj[index]['isExpanded']
        setResultsObject(copyObj)
    }
    const handleChange = (e) => {
        setSearchInput(e.target.value);
        console.log('searchInput: ', searchInput)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('/search/' + searchInput)
            .then(({data}) => {
                console.log('data: ', data)
                const drinksArray = [];
                data.map(result => {
                    result.notes = '';
                    result.isExpanded = false;
                    result.isSaved = false;
                    var drink = {};
                    drinksArray.push(result)
                })
                console.log('drinksArray: ', drinksArray)
                setResultsObject(drinksArray)
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
            <div>
                {resultsObject.map((drink, index) => {
                    return ( drink.isExpanded ?
                        <div key={index} onClick={() => toggleExpanded(index)}>
                            <div>
                                {drink.strDrink}
                                {drink.strIngredient1}
                            </div>
                            <img src={drink.strDrinkThumb} style={{width: 50, height: 50}}></img>
                        </div>
                        :
                        <div key={index} onClick={() => toggleExpanded(index)}>
                            <div>
                                {drink.strDrink}
                            </div>
                            <img src={drink.strDrinkThumb} style={{width: 50, height: 50}}></img>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default App;