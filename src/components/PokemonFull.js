import React, { useEffect, useState } from 'react';
import pokeapi from '../api/pokeapi';

import EvolutionTab from './EvolutionTab';

import InfoTab from './InfoTab';
import SpriteTab from './SpriteTab';
import StatsTab from './StatsTab';
import MovesTab from './MovesTab';

import classes from './PokemonFull.module.scss';

const PokemonFull = (props) => {

    const { pokemon, moveData, typeStyles, toggleDisplay } = props;

    const [ speciesInfo, setSpeciesInfo ] = useState(undefined);
    //boolean for toggling display between MovesTab and InfoTab
    const [ showMovesTab, setShowMovesTab ] = useState(false);

    const [ evolutions, setEvolutions ] = useState(undefined);
    const [ showEvolutionChain, setShowEvolutionChain ] = useState(false);

    //fetch pokemon species info and evolution chain
    useEffect(() => {
        pokeapi.get(`/pokemon-species/${pokemon.id}`)
            .then(result => {
                setSpeciesInfo(result.data);
                return result.data;
            })
            .then(species => {
                pokeapi.get(`${species.evolution_chain.url.slice(25)}`)
                    .then(result => {
                        setEvolutions(result.data.chain);
                    })
            });
    }, [pokemon.id]);

    return (
        <section 
            className={classes.container}
            style={{background: window.innerWidth === 414 || window.innerWidth === 375 || window.innerWidth === 320 ? typeStyles.typeColor : typeStyles.doubleGradient}}
        >

            <button 
                className={classes.exit}
                onClick={() => toggleDisplay()}
            >X</button>

            {
                showEvolutionChain ? (
                    <EvolutionTab 
                        evolutions={evolutions}
                        typeStyles={typeStyles}
                        setShowEvolutionChain={setShowEvolutionChain}
                    />
                ) : null
            }

            <InfoTab 
                pokemon={pokemon}
                speciesInfo={speciesInfo}
                typeStyles={typeStyles}
                typeBackground={props.typeBackground}
            />

            <SpriteTab 
                pokemon={pokemon}
                speciesInfo={speciesInfo}
                typeStyles={typeStyles}
                setShowEvolutionChain={setShowEvolutionChain}
                evolutions={evolutions}
            />

            <section className={classes.detailed_info}>
                
                <div className={classes.tab_toggle} style={{color: typeStyles.text}}>
                    <span className={classes.tab_label}>Stats</span>
                    <input 
                        type="checkbox" 
                        id={`switch-${pokemon.id}`} 
                        className={classes.switch} 
                        onChange={() => setShowMovesTab(!showMovesTab)}
                    />
                    <label htmlFor={`switch-${pokemon.id}`} className={classes.switch_label}></label>
                    <span className={classes.tab_label}>Moves</span>
                </div>

                <StatsTab
                    showMovesTab={showMovesTab}
                    pokemon={pokemon}
                    typeStyles={typeStyles}
                />

                <MovesTab
                    showMovesTab={showMovesTab} 
                    pokemon={pokemon}
                    speciesInfo={speciesInfo}
                    moveData={moveData}
                    typeStyles={typeStyles}
                    moveTextColor={props.textColor}
                    moveBackground={props.typeBackground}
                />

            </section>

        </section>
    )
};

export default PokemonFull;