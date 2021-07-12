import React from 'react';

import classes from './SpriteTab.module.scss';

const SpriteTab = (props) => {

    const { pokemon, speciesInfo, typeStyles, setShowEvolutionChain, evolutions } = props;

    //japanese string name for pokemon
    const nameJp = () => {
        if (speciesInfo) {
            let nameJp = speciesInfo?.names.filter((el => el.language.name === 'ja-Hrkt'));
            return nameJp[0].name;
        } else {
            return '...'
        }
    };

    //testing layout w/o english name below sprite
    return (
        <div className={classes.visual_container}>

            {
                evolutions && evolutions?.evolves_to.length ? (
                    <div className={classes.evolution_container} >
                        <button
                            style={{
                                background: typeStyles.contrastBg,
                                color: typeStyles.text,
                                border: `2px solid ${typeStyles.text}`
                            }}
                            onClick={() => setShowEvolutionChain(true)}
                        >Evolution Chain &rarr;</button>
                    </div>
                ) : null
            }

            <div className={classes.name_jp} style={{color: speciesInfo?.color.name}}>
                {nameJp()}
            </div>

            <img
                src={pokemon.sprites.front_default}
                alt={`sprite for ${pokemon.name}`}
                className={classes.sprite}
                style={{filter: `drop-shadow(1.5px 3px 3px #2F4F4F`}}
            />

        </div>
    )
};

export default SpriteTab;