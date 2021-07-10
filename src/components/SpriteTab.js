import React from 'react';

import classes from './SpriteTab.module.scss';

const SpriteTab = (props) => {

    const { pokemon, speciesInfo } = props;

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

            {/* <div className={classes.name} style={{color: typeStyles.text}}>
                {pokemon.name}
            </div> */}

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