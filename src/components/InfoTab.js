import React, { useState } from 'react';

import AbilityFull from './AbilityFull';

import classes from './InfoTab.module.scss';

const InfoTab = (props) => {

    const { pokemon, typeStyles, typeBackground } = props;

    const [ showAbility, setShowAbility ] = useState(false);
    const [ abilityDetails, setAbilityDetails ] = useState(null);

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

        return input.map((el, index) => 
            <div className={classes.ability_flex} key={`pk-ability-${index}`} >
                <div 
                    className={classes.ability} 
                    id={`${el.ability.name}`}
                    onClick={async() => {
                        setAbilityDetails(null);
                        setShowAbility(true);

                        fetch(el.ability.url)
                            .then(res => res.json())
                            .then(details => setAbilityDetails(details))
                            .catch(err => {
                                console.log(err);
                                setAbilityDetails(null);
                            });
                    }}
                    style={{
                        background: typeStyles.contrastBg,
                        border: `2px solid ${typeStyles.text}`
                    }}>
                    {el.ability.name}
                </div>
            </div>
        );
    };

    return (
        <div className={classes.info_container} style={{color: typeStyles.text}}>

            {
                showAbility ? (
                    <AbilityFull 
                        ability={abilityDetails}
                        typeStyles={typeStyles}
                        setShowAbility={setShowAbility}
                    />
                ) : null
            }

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