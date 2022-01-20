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
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonArray, setPokemonArray] = useState([]);
  const [apiOffSet, setApiOffSet] = useState(0);
  // can't use apiLimit as an useState yet because setApiLimit will be an unused variable which Netlify will not allow. will leave apiLimit as a variable for stretch goals later on
  const apiLimit = 6;



  // create a function to retreive a list of pokemon from the api and store this data in the pokemonList array
  useEffect(() => {
    axios({
      url: `https://pokeapi.co/api/v2/pokemon/`,
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



  // add onClick functions on the forward and backward buttons and add or subtract 6 from the apiOffset variable depending o
  const handleForward = () => {
    setApiOffSet(apiOffSet + 6);
  }

  const handleBackward = () => {
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
