import React from 'react';

import classes from './EvolutionTab.module.scss';

const EvolutionTab = (props) => {

    const { evolutions, typeStyles, setShowEvolutionChain } = props;

    // console.log(evolutions);

    const evolutionSteps = () => {

        const steps = [];

        const step = (details, species) => {
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${species.url.slice(42).slice(0, -1)}.png`;
            
            const stepMethod = () => {
                //makes sure this will only run if there are details for the next pokemon
                if (!details) { return null };

                let trigger = details[0].trigger.name;
                let methodString;

                if (trigger === 'level-up') {
                    switch(true) {
                        case details[0].min_level !== null:
                            if (details[0].time_of_day) {
                                methodString = `level ${details[0].min_level}+ at ${details[0].time_of_day}`;
                            } else {
                                methodString = `level ${details[0].min_level}`;
                            };
                            break;
                        case details[0].min_happiness !== null:
                            methodString = `${details[0].min_happiness}+ happiness`;
                            break;
                        case details[0].min_beauty !== null:
                            methodString = `${details[0].min_beauty}+ beauty`;
                            break;
                        case details[0].known_move !== null:
                            methodString = `knows ${details[0].known_move.name}`;
                            break;
                        case details[0].held_item !== null:
                            if (details[0].time_of_day) {
                                methodString = `level up holding ${details[0].held_item.name} at ${details[0].time_of_day}`;
                            } else {
                                methodString = `level up holding ${details[0].held_item.name}`;
                            };
                            break;
                        case details[0].location !== null:
                            methodString = 'locations';
                            break;
                        default:
                            return null;
                    }
                } else if (trigger === 'use-item') {
                    methodString = details[0].item ? details[0].item.name : 'unlisted item';
                } else if (trigger === 'trade') {
                    if (details[0].held_item) {
                        methodString = `trade while holding ${details[0].held_item.name}`;
                    } else {
                        methodString = 'trade';
                    };
                }

                if (methodString === 'locations') {
                    return (
                        <div className={classes.step_method}>
                            <span>Level up at:</span>
                            {
                                details?.map((el, index) => {
                                    return el.location?.name ? <span key={`location-${index}`}>{el.location.name}</span> : null
                                })
                            }
                            <strong>&darr;</strong>
                        </div>
                    )
                } else {
                    return (
                        <div className={classes.step_method}>
                            <span>{methodString}</span>
                            <strong>&darr;</strong>
                        </div>
                    )
                }
            };

            return (
                <div 
                    className={classes.step} 
                    key={`pokemon-${species.name}`}
                >
                    <div className={classes.step_pokemon}>
                        <img 
                            alt=''
                            src={imageUrl}
                        />
                        <h4>{species.name}</h4>
                    </div>
                    {stepMethod()}
                </div>
            )
        };

        function getNextLink({ evolves_to, species }) {
            if (!evolves_to.length) {
                steps.push(
                    step(null, species)
                );
                return
            };

            steps.push(
                step(evolves_to[0].evolution_details, species)
            );
    
            return evolves_to ? getNextLink(evolves_to[0]) : {};
        };

        getNextLink(evolutions);
        return steps;
    };

    return (
        <>
            <section 
                className={classes.evolution_tab}
                style={{
                    background: typeStyles.contrastBg,
                    color: typeStyles.text
                }}
            >
            
                <div className={classes.evo_grid}>
                    {evolutionSteps()}
                </div>

            </section>

            <div 
                className={classes.blur}
                onClick={() => setShowEvolutionChain(false)}
            ></div>
        </>
    )
};

export default EvolutionTab;