import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';


const PokemonList = (props) => {

    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonArray, setPokemonArray] = useState([]);

    const { apiOffSet, apiLimit, apiUrl } = props;

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

    return (
        <>
            {pokemonArray
                ?
                pokemonArray.map((pokemon) => {
                    return (
                        <li key={pokemon.data.id} className='pokemonCard'>
                            <h2>{pokemon.data.name}</h2>
                            <img src={pokemon.data.sprites.front_default} alt={`${pokemon.data.name}`} />
                        </li>
                    )
                })
                :
                <h2>Loading...</h2>
            }
        </>
    )
}

export default PokemonList;