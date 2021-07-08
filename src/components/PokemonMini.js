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

    const primaryType = pokemon.types[0].type.name;

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

    //gets non contrasting text color based on type to match with type background color
    const textColor = (type) => {
        if (type === 'grass' || type === 'water' || type === 'poison' || type === 'fighting' || type === 'dragon' || type === 'dark' || type === 'ghost' || type === 'psychic') {
            return 'rgba(220, 220, 220, 1)';
        } else {
            return 'rgba(47, 79, 79, 1)';
        };
    };

    const contrastBackground = (type) => {
        if (type === 'grass' || type === 'water' || type === 'poison' || type === 'fighting' || type === 'dragon' || type === 'dark' || type === 'ghost' || type === 'psychic') {
            return '#2F4F4F';
        } else {
            return '#DCDCDC';
        };
    };

    //gets gradient based on primary type
    const typeBackground = (type) => {
        switch(true) {
            case type === 'normal':
                return "linear-gradient(to top left, rgba(169, 169, 169, 0.95), rgba(169, 169, 169, 0.92))";
            case type === 'fire':
                return "linear-gradient(to top left, rgba(238, 129, 48, 0.95), rgba(238, 129, 48, 0.92))";
            case type === 'water':
                return "linear-gradient(to top left, rgba(99, 144, 240, 0.95), rgba(99, 144, 240, 0.92))";
            case type === 'electric':
                return "linear-gradient(to top left, rgba(247, 208, 44, 0.95), rgba(247, 208, 44, 0.92))";
            case type === 'grass':
                return "linear-gradient(to top left, rgba(122, 199, 76, 0.95), rgba(122, 199, 76, 0.92))";
            case type === 'ice':
                return "linear-gradient(to top left, rgba(150, 217, 214, 0.95), rgba(150, 217, 214, 0.92))";
            case type === 'fighting':
                return "linear-gradient(to top left, rgba(194, 46, 40, 0.95), rgba(194, 46, 40, 0.92))";
            case type === 'poison':
                return "linear-gradient(to top left, rgba(163, 62, 161, 0.95), rgba(163, 62, 161, 0.92))";
            case type === 'ground':
                return "linear-gradient(to top left, rgba(226, 191, 101, 0.95), rgba(226, 191, 101, 0.92))";
            case type === 'flying':
                return "linear-gradient(to top left, rgba(169, 143, 243, 0.95), rgba(169, 143, 243, 0.92))";
            case type === 'psychic':
                return "linear-gradient(to top left, rgba(249, 85, 135, 0.95), rgba(249, 85, 135, 0.92))";
            case type === 'bug':
                return "linear-gradient(to top left, rgba(166, 185, 26, 0.95), rgba(166, 185, 26, 0.92))";
            case type === 'rock':
                return "linear-gradient(to top left, rgba(182, 161, 54, 0.95), rgba(182, 161, 54, 0.92))";
            case type === 'ghost':
                return "linear-gradient(to top left, rgba(115, 87, 151, 0.95), rgba(115, 87, 151, 0.92))";
            case type === 'dragon':
                return "linear-gradient(to top left, rgba(111, 53, 252, 0.95), rgba(111, 53, 252, 0.92))";
            case type === 'dark':
                return "linear-gradient(to top left, rgba(112, 87, 70, 0.95), rgba(112, 87, 70, 0.92))";
            case type === 'steel':
                return "linear-gradient(to top left, rgba(183, 183, 206, 0.95), rgba(183, 183, 206, 0.92))";
            case type === 'fairy':
                return "linear-gradient(to top left, rgba(214, 133, 173, 0.95), rgba(214, 133, 173, 0.92))";
            default:
                return 'magenta'; //something ovbious in case of an error
        }
    };

    //type based color styling for all cards
    const typeStyles = {
        text: textColor(primaryType),
        background: typeBackground(primaryType),
        contrastBg: contrastBackground(primaryType)
    };

    console.log(`Rendered pokemon ${pokemon.id}`);

    return (
        <>
            <section 
                id={`card-${pokemon.id}`}
                className={classes.card}   
                style={{background: typeStyles.background}}     
                onClick={() => toggleDisplay()}
            >

                <div className={classes.info}>
                    <div className={classes.infoTypes}>
                        {typeListIcons(pokemon.types)}
                    </div>
                    <div 
                        className={classes.infoNumber} 
                        style={{color: typeStyles.text}}
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
                    style={{color: typeStyles.text}}
                >
                    {pokemon.name}
                </div>

            </section>

            {
                openCard ? (
                    <PokemonFull 
                        pokemon={pokemon} 
                        moveData={props.moveData}
                        typeStyles={typeStyles}
                        toggleDisplay={toggleDisplay} 
                    /> 
                ) : (
                    <></>
                )
            }
        </>
    )
};

export default memo(PokemonMini);