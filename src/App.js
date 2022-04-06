// Modules
import { useEffect, useState } from 'react';
import axios from 'axios';
// Styling
import './App.css';
// Components
import Header from './components/Header.js';
import PokemonList from './components/PokemonList';
import SinglePokemon from './components/SinglePokemon';

function App() {

  const [apiOffSet, setApiOffSet] = useState(0);
  const [apiLimit, setApiLimit] = useState(6);
  const [userInput, setUserInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/`


  const handleForward = (number) => {
    number = apiOffSet + 6;
    setApiOffSet(number);
  };

  const handleBackward = (number) => {
    number = apiOffSet - 6;
    setApiOffSet(number);
  };

  const handleInput = (e) => {
    setUserInput(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(userInput)
  }




  return (
    <div className="App">
      <Header />

      <main>
        <section className='wrapper'>
          <div className='buttonFlex'>
            <button onClick={handleBackward}>backward</button>

            <button onClick={handleForward}>forward</button>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search for a Pokemon</label>
            <input type="text" id="search" onChange={handleInput} value={userInput} placeholder="Enter a name or number" />
            <button>Search</button>
          </form>
          <ul className='pokemonResults'>
            {!searchTerm 
            ?
              <PokemonList
                apiOffSet={apiOffSet}
                apiLimit={apiLimit}
                apiUrl={apiUrl}
              />
              :
              <SinglePokemon
                searchTerm={searchTerm}
                apiUrl={apiUrl}
              />
            }
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
