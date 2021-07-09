import React from 'react';

import classes from './InfoTab.module.scss';

const InfoTab = (props) => {

    const { pokemon, typeStyles, typeBackground } = props;

    const typeListText = (input) => {
        // const typeName = pokemon.types[0].type.name;

        let types = [];

        for (let i = 0; i < input.length; i++) {
            types.push(input[i].type.name);
        };

        return types.map((input, index) => 
            <div 
                // className={classes.type_container}
                key={`pk-type-text-${index}`} 
                className={classes.type} 
                style={{background: typeBackground(input), border: `2px solid ${typeStyles.text}`}}
            >
                {input}
            </div>
        );
    };

    const abilityListText = (input) => {
        let abilities = [];

        for (let i = 0; i < input.length; i++) {
            abilities.push(input[i].ability.name);
        };

        return abilities.map((el, index) => 
            <div className={classes.ability_flex} key={`pk-ability-${index}`} >
                <div 
                    className={classes.ability} 
                    id={`ability-${el}-${index}`}
                    // onClick={openAbilityDescription}
                    style={{
                        background: typeStyles.contrastBg,
                        border: `2px solid ${typeStyles.text}`
                    }}>
                    {el}
                </div>
            </div>
        );
    };

    return (
        <div className={classes.info_container} style={{color: typeStyles.text}}>

            <div className="pokecard-full__general-info--id">
                {`Game ID: #${pokemon.id}`}
            </div>
            <div className="pokecard-full__general-info--height">
                {`Height: ${pokemon.height / 10}m`}
            </div>
            <div className="pokecard-full__general-info--weight">
                {`Weight: ${pokemon.weight / 10}kg`}
            </div>

            <div>
                <span>Type:</span>
                <div style={{color: typeStyles.text}}>
                    {typeListText(pokemon.types)}
                </div>
            </div>

            <div className={classes.ability_container}>
                <span>Abilities:</span>
                {abilityListText(pokemon.abilities)}
            </div>

        </div>
    )
};

export default InfoTab;