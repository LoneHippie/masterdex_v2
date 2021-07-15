import React from 'react';

import classes from './AbilityFull.module.scss';

const AbilityFull = (props) => {

    const { ability, typeStyles, setShowAbility } = props;

    const effectEntry = () => {
        if (ability.effect_entries.length) {
            for (let i = 0; i <= ability?.effect_entries.length; i++) {
                if (ability?.effect_entries[i].language.name === 'en') {
                    return ability?.effect_entries[i].effect;
                }
            };
        } else if (ability.flavor_text_entries.length) {
            for (let i = 0; i <= ability?.flavor_text_entries.length; i++) {
                if (ability?.flavor_text_entries[i].language.name === 'en') {
                    return ability?.flavor_text_entries[i].flavor_text;
                }
            };
        } else {
            return 'N/A';
        };
    };

    return (
        <>

            <div
                className={classes.blur}
                onClick={() => setShowAbility(false)}
            ></div>

            <div
                className={classes.ability_full}
                style={{
                    background: typeStyles.text,
                    color: typeStyles.contrastBg
                }}
            >

                {
                    ability ? (
                        <>
                            <div
                                className={classes.ability_header}
                                style={{
                                    background: typeStyles.contrastBg,
                                    color: typeStyles.text
                                }}
                            >
                                <h4>{ability?.name}</h4>
                                <span>#{ability?.id}</span>
                            </div>

                            <div className={classes.ability_info}>
                                {effectEntry()}
                            </div>
                        </>
                    ) : (
                        <div className={classes.loading}>Loading ...</div>
                    )
                }

            </div>

        </>
    )
};

export default AbilityFull;