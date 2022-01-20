// Modules
import { useEffect, useState } from 'react';
import axios from 'axios';
// Styling
import './App.css';
// Components
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js'

function App() {
 //  create variables that:
  // 	  1 holds api url for searching for a list of pokemon
  // 	  2 holds the data from the first api call
  //    3 holds the data from the second api call
  // 	  4 hold the variable for offset
  // 		    starts at 0
  // 	    limit will be set to 6
  //        stretch goal: allow users select an option to see a list of more than 6 at once

  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonArray, setPokemonArray] = useState([]);
  const [apiOffSet, setApiOffSet] = useState(0);
  // can't use apiLimit as an useState yet because setApiLimit will be an unused variable which Netlify will not allow
  const apiLimit = 6;


  const apiUrl = `https://pokeapi.co/api/v2/pokemon/`;

  // create a function to retreive a list of pokemon from the api and store this data in the pokemonList array
  useEffect(() => {
    axios({
      url: apiUrl,
      method: "GET",
      dataResponse: "json",
      params: {
        offset: apiOffSet,
        limit: apiLimit,
      },
    }).then((response) => {
      setPokemonList(response.data.results);
    }).catch((error) => {
      prompt(`Website is currently not working due to: ${error}`)
    })
  }, [apiOffSet])

  // create a function that will call all of the pokemon in the pokemonList array
  //    use the Promise.all() function to let React know to wait for all of the api calls to finish first, then store that data into the pokemonArray array
  //    add the pokemonList in the dependency array to let this useEffect know to trigger when the pokemonList array is changed.

  useEffect(() => {
    const pokePromises = pokemonList.map((pokemonFromList) => {
      return axios({
        url: pokemonFromList.url,
        method: "GET",
        dataResponse: "json",
      })
    })
    Promise.all(pokePromises).then((response) => {
      setPokemonArray(response)
    })
  }, [pokemonList])

  console.log(pokemonArray);



  // add onClick functions on the forward and backward buttons and 
  const handleForward = () => {
    setApiOffSet(apiOffSet + 6);
  }

  const handleBackward = (number) => {
    setApiOffSet(apiOffSet - 6);
  }



  return (
    <div className="App">
      <Header />

      <Main pokemonArray={pokemonArray} handleForward={handleForward} handleBackward={handleBackward} />

      <Footer />
    </div>
  );
}

export default App;
