// Modules
import { useState } from 'react';
// Styling
import './App.css';
// Components
import Header from './components/Header.js';
import PokemonList from './components/PokemonList';
import SinglePokemon from './components/SinglePokemon';
import Footer from './components/Footer';

function App() {

  const [apiOffSet, setApiOffSet] = useState(0);
  const [apiLimit, setApiLimit] = useState(6);
  const [userInput, setUserInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [apiUrl] = useState("https://pokeapi.co/api/v2/pokemon/");


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
            <label htmlFor="">Search for a Pokemon:</label>
            <input type="text" id="search" onChange={handleInput} value={userInput} placeholder="Enter a name or number" />
            <button>Search</button>
          </form>
          <form action="">
              <label htmlFor="select">Number of Displayed Pokémon:</label>
              <select className="dropDown"
                id="time"
                name="time"
                onChange={(e) => setApiLimit(e.target.value)}
                value={apiLimit}
              >
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
              </select>
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

      <Footer />

    </div>
  );
}

export default App;
