import React, { useEffect, useState } from 'react';
import pokeapi from '../api/pokeapi';

import classes from './PokemonFull.module.scss';

const PokemonFull = (props) => {

    const { pokemon, toggleDisplay } = props;

    const [ speciesInfo, setSpeciesInfo ] = useState(undefined);

    useEffect(() => {
        pokeapi.get(`/pokemon-species/${pokemon.id}`)
            .then(result => {
                setSpeciesInfo(result.data);
            })
    }, [pokemon.id]);

    setTimeout(() => {
        console.log(speciesInfo);
    }, 3000);

    return (
        <section className={classes.container}>

            <button 
                className={classes.exit}
                onClick={() => toggleDisplay()}
            >X</button>

            <h3 className={classes.title}>{pokemon.name}</h3>


        </section>
    )
};

export default PokemonFull;