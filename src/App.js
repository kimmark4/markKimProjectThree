

import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

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
  const [pokemons, setPokemons] = useState([]);


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
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  // create a function (getIndividualPokemon) to retreieve the data from each item in the array
  // 	  another fetch function may be needed and THEN displayPokemon

  useEffect(() => {
    pokemonList.map((pokemonFromList) => {
      axios({
        url: pokemonFromList.url,
        method: "GET",
        dataResponse: "json",
      }).then((response) => {
        pokemons.push(response.data)
      })
    })
  }, [pokemonList])

  // console.log(pokemonList);
  console.log(pokemons);


  // create a function (changePokemon) to change the variable that holds the offset variable for the api search parameter when the backward and forward buttons are clicked
  // 	when the forward button is clicked, add 6 to the variable,
  // 	when the backward button is clicked, subtract 6 of the variable
  // 	call the getListOfPokemon function to get the new pokemon to display
  // const handleForward = (number) => {
  //   number = apiOffSet + 6;
  //   setApiOffSet(number);
  // }

  // const handleBackward = (number) => {
  //   number = apiOffSet - 6;
  //   setApiOffSet(number);
  // }

  // stretch goals
  // create variables that
  // 	1 holds the api url and takes in the {userInput} variable
  // 	2 holds the user's input


  // create a function (getUserInput) that 
  // 	gets the value of what the user has inputted into the search bar, when the search button is clicked
  // 	save this value into a variable of {userInput}
  // 	use {userInput} to fill in the search parameter for the api url that will search for a specific pokemon
  // 	retreive the data and THEN call the displayPokemon function again to display this pokemon


  // create a function (pokemonClicked) that will execute when any of the displayed pokemon are clicked
  // 	create a variable to hold the selected pokemon's id
  // 	input the variable into the url to fetch the api's data
  // 	get data from the api and THEN call the pokemonPopup function


  // create a function (pokemonPopup) that will show more information about the selected pokemon
  // 	create a pop-up modal
  // 	use the data from the api to display the pokemon's type(s) and base stats


  return (
    <div className="App">

      <button
        // onClick={ handleBackward }
      >backward</button>
      <button
      // onClick={ handleForward } 
      >forward</button>

      {/* // create a function (displayPokemon) that will display the name and image of each pokemon onto the page */}
      {pokemons.map((poke) => {
        return (
          <div key={poke.id}>
            <h2>{poke.name}</h2>
            <img src={poke.sprites.front_default} alt="" />
          </div>
        )
      })}


    </div>
  );
}

export default App;
