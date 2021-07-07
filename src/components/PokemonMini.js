import React, { useState, memo } from 'react';

import PokemonFull from './PokemonFull';

import Bug from '../images/bug.svg';
import Dark from '../images/dark.svg';
import Dragon from '../images/dragon.svg';
import Electric from '../images/electric.svg';
import Fairy from '../images/fairy.svg';
import Fighting from '../images/fighting.svg';
import Fire from '../images/fire.svg';
import Flying from '../images/flying.svg';
import Ghost from '../images/ghost.svg';
import Grass from '../images/grass.svg';
import Ground from '../images/ground.svg';
import Ice from '../images/ice.svg';
import Normal from '../images/normal.svg';
import Poison from '../images/poison.svg';
import Psychic from '../images/psychic.svg';
import Rock from '../images/rock.svg';
import Steel from '../images/steel.svg';
import Water from '../images/water.svg';

import '../styles/icons.scss';

import classes from './PokemonMini.module.scss';

const PokemonMini = (props) => {

    const { pokemon } = props;

    const [ openCard, setOpenCard ] = useState(false);

    function toggleDisplay() {
        setOpenCard(!openCard);
    };

    const typeListIcons = (input) => {
        let types = [];

        for (let i = 0; i < input.length; i++) {
            types.push(input[i].type.name);
        };

        //set imported SVGs to match pokemon types
        const typeIcons = types.map(el => {
            switch(true) {
                case el === 'fire':
                    return Fire;
                case el === 'flying':
                    return Flying;
                case el === 'bug':
                    return Bug;
                case el === 'dark':
                    return Dark;
                case el === 'dragon':
                    return Dragon;
                case el === 'electric':
                    return Electric;
                case el === 'fairy':
                    return Fairy;
                case el === 'fighting':
                    return Fighting;
                case el === 'ghost':
                    return Ghost;
                case el === 'grass':
                    return Grass;
                case el === 'ground':
                    return Ground;
                case el === 'ice':
                    return Ice;
                case el === 'normal':
                    return Normal;
                case el === 'poison':
                    return Poison;
                case el === 'psychic':
                    return Psychic;
                case el === 'rock':
                    return Rock;
                case el === 'steel':
                    return Steel;
                case el === 'water':
                    return Water;
                default:
                    return null;
            }
        });

        return typeIcons.map((el, index) =>
            <img 
                key={`pk-type-icon=${index}`}
                className={`icon img ${types[index]}`}
                src={el}
                alt={`type ${types[index]}`}
                loading="lazy"
            />
        )
    };

    console.log(`Rendered pokemon ${pokemon.id}`);

    return (
        <>
            <section 
                id={`card-${pokemon.id}`}
                className={classes.card} 
                // style={{background: eval(`styles.gradient_${typeName}`)}} 
                onClick={() => toggleDisplay()}
            >

                <div className={classes.info}>
                    <div className={classes.infoTypes}>
                        {typeListIcons(pokemon.types)}
                    </div>
                    <div 
                        className={classes.infoNumber} 
                        // style={{color: textColor(typeName)}}
                    >
                        {`#${pokemon.id}`}
                    </div>
                </div>

                <img
                    src={pokemon.sprites.front_default}
                    alt={`sprite for ${pokemon.name}`}
                    className={classes.sprite}
                    style={{filter: `drop-shadow(1.5px 3px 3px #2F4F4F`}}
                    loading="lazy"
                />

                <div 
                    className={classes.name} 
                    // style={{color: textColor(typeName)}}
                >
                    {pokemon.name}
                </div>

                <div
                    id={`pk-${pokemon.id}`}
                    className="pokecard--mask">
                </div>

            </section>

            {
                openCard ? <PokemonFull pokemon={pokemon} toggleDisplay={toggleDisplay} /> : <></>
            }
        </>
    )
};

export default memo(PokemonMini);