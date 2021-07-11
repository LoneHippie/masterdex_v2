import React from 'react';

import classes from './MoveFull.module.scss';

const MoveFull = (props) => {

    const { move, setShowMove, typeStyles } = props;

    return (
        <>

            <div 
                className={classes.blur}
                onClick={() => setShowMove(false)}
            ></div>

            <div 
                className={classes.move_full}
                style={{
                    background: typeStyles.text,
                    color: typeStyles.contrastBg
                }}
            >

                {
                    move ? (
                        <>
                            <div 
                                className={classes.move_header}
                                style={{
                                    background: typeStyles.contrastBg,
                                    color: typeStyles.text
                                }}
                            >
                                <h4>{move?.name}</h4>
                                <span>#{move?.id}</span>
                            </div>

                            <div className={classes.move_info}>

                                <div className={classes.stats}>
                                    <span>Category: {move?.damage_class.name}</span>
                                    <span>Power: {move?.power !== null ? move.power : 'N/A'}</span>
                                    <span>Accuracy: {move?.accuracy !== null ? move.accuracy : 'N/A'}</span>
                                    <span>PP: {move?.pp}</span>
                                </div>

                                <div className={classes.description}>
                                    {
                                        move?.effect_entries[0].effect.length < 300 ? (
                                            move?.effect_entries[0].effect.replace(/\$effect_chance%/g, `${move?.effect_chance}%`) 
                                        ) : (
                                            move?.effect_entries[0].short_effect.replace(/\$effect_chance%/g, `${move?.effect_chance}%`)
                                        )
                                    }
                                </div>

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

export default MoveFull;