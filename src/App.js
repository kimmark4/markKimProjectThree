// Modules
import { useEffect, useState } from 'react';
import axios from 'axios';
// Styling
import './App.css';
// Components
import Header from './components/Header.js';

function App() {
  //  create variables that:
  // 	  1 holds api url for searching for a list of pokemon
  // 	  2 holds search parameters for offset and limit
  // 	  3 hold the variable for offset
  // 		    starts at 0
  // 	    limit will be set to 6, no need for a seperate variable 

  const [apiOffSet, setApiOffSet] = useState(0);
  const [apiLimit, setApiLimit] = useState(6);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonArray, setPokemonArray] = useState([]);


  const apiUrl = `https://pokeapi.co/api/v2/pokemon/`

  // create a function (getListOfPokemon) to retreive data from the api and THEN call the getIndividualPokemon function
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
      console.log(response.data.results);
    }).catch((error) => {
      console.log(error);
    })
  }, [apiOffSet])


  // create a function (getIndividualPokemon) to retreieve the data from each item in the array
  // 	  another fetch function may be needed and THEN displayPokemon

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



  // create a function (changePokemon) to change the variable that holds the offset variable for the api search parameter when the backward and forward buttons are clicked
  // 	when the forward button is clicked, add 6 to the variable,
  // 	when the backward button is clicked, subtract 6 of the variable
  // 	put apiOffSet in the dependancy array for the first useEffect so that when the apiOffset variable is changed, the useEffect is triggered again.
  const handleForward = (number) => {
    number = apiOffSet + 6;
    setApiOffSet(number);
  }

  const handleBackward = (number) => {
    number = apiOffSet - 6;
    setApiOffSet(number);
  }


  return (
    <div className="App">
      <Header />


      {/* // create a function (displayPokemon) that will display the name and image of each pokemon onto the page */}
      <main>
        <section className='wrapper'>
          <div className='buttonFlex'>
            <button onClick={handleBackward}>backward</button>
            <button onClick={handleForward}>forward</button>
          </div>
          <ul className='pokemonResults'>
            {pokemonArray.map((pokemon) => {
              return (
                <li key={pokemon.data.id} className='pokemonCard'>
                  <h2>{pokemon.data.name}</h2>
                  <img src={pokemon.data.sprites.front_default} alt={`${pokemon.data.name}`} /> 
                </li>
              )
            })}
          </ul>
          <div className='buttonFlex'>
            <button onClick={handleBackward}>backward</button>
            <button onClick={handleForward}>forward</button>
          </div>
        </section>
      </main>

      <footer>
        <p>Copyright © Mark Kim at Juno College</p>
      </footer>

    </div>
  );
}

export default App;
