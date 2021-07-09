import React, { useEffect, useState } from 'react';
import pokeapi from '../api/pokeapi';

import InfoTab from './InfoTab';
import SpriteTab from './SpriteTab';
import StatsTab from './StatsTab';
import MovesTab from './MovesTab';

import classes from './PokemonFull.module.scss';

const PokemonFull = (props) => {

    const { pokemon, moveData, typeStyles, toggleDisplay } = props;

    const [ speciesInfo, setSpeciesInfo ] = useState(undefined);
    const [ showMovesTab, setShowMovesTab ] = useState(false);

    useEffect(() => {
        pokeapi.get(`/pokemon-species/${pokemon.id}`)
            .then(result => {
                setSpeciesInfo(result.data);
            });
    }, [pokemon.id]);

    return (
        <section 
            className={classes.container}
            style={{background: window.innerWidth === 414 || window.innerWidth === 375 || window.innerWidth === 320 ? typeStyles.background : typeStyles.doubleGradient}}
        >

            <button 
                className={classes.exit}
                onClick={() => toggleDisplay()}
            >X</button>

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

                {
                    showMovesTab ? (
                        <MovesTab 
                            pokemon={pokemon}
                            typeStyles={typeStyles}
                            moveData={moveData}
                        />
                    ) : (
                        <StatsTab 
                            pokemon={pokemon}
                            typeStyles={typeStyles}
                        />
                    )
                }

            </section>

        </section>
    )
};

export default PokemonFull;