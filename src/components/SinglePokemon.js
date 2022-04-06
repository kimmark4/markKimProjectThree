import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const SinglePokemon = (props) => {
    const [singlePokemon, setSinglePokemon] = useState();
    const { apiUrl, searchTerm } = props;

    useEffect(() => {
        axios({
            url: apiUrl + searchTerm,
            method: "GET",
            dataResponse: "json",
        }).then((response) => {
            console.log(response.data);
            setSinglePokemon(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [searchTerm])

    return (
        <>
            {singlePokemon ?
                <li key={singlePokemon.id} className='pokemonCard'>
                    <h2>{singlePokemon.name}</h2>
                    <img src={singlePokemon.sprites.front_default} alt={`${singlePokemon.name}`} />
                </li>
                :
                <h2>Loading...</h2>
            }

        </>
    )
}

export default SinglePokemon;