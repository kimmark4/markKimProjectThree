// Modules
import { useEffect, useState } from 'react';
import axios from 'axios';
// Styling
import './App.css';
import HeaderImage from './assets/Daco_4694045.png'
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
  // create a function (getIndividualPokemon) to retreieve the data from each item in the array
  // 	  another fetch function may be needed and THEN displayPokemon

  // useEffect(() => {
  //   axios({
  //     // url: pokemonFromList.url,
  //     method: "GET",
  //     dataResponse: "json",
  //   }).then((response) => {
  //     pokemons.push(response.data)
  //     console.log(response.data);
  //   })
  // }, [pokemonList])


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
      <Header />


      {/* // create a function (displayPokemon) that will display the name and image of each pokemon onto the page */}
      <main>
        <section className='wrapper'>
          <div className='buttonFlex'>
            <button>backward</button>
            <button>forward</button>
          </div>
          <div className='pokemonResults'>
            {pokemonArray.map((poke) => {
            return (
              <div key={poke.data.id} className='pokemonCard'>
                <h2>{poke.data.name}</h2>
                <img src={poke.data.sprites.front_default} alt="" />
              </div>
            )
          })}
          </div>
          <div className='buttonFlex'>
            <button>backward</button>
            <button>forward</button>
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
