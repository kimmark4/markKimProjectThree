
const Main = ({ pokemonArray, handleBackward, handleForward }) => {
    return (
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
    )
}

export default Main;