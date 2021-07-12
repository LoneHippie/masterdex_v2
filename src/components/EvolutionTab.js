import React from 'react';

import classes from './EvolutionTab.module.scss';

const EvolutionTab = (props) => {

    const { evolutions, typeStyles, setShowEvolutionChain } = props;

    // console.log(evolutions);

    const evolutionSteps = () => {

        const jsx = [];

        const step = (evo) => {
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.species.url.slice(42).slice(0, -1)}.png`;

            let trigger = evo.evolves_to.length ? evo.evolves_to[0].evolution_details[0].trigger.name : null;

            // console.log(trigger);

            const stepMethod = () => {
                let methodString;

                if (trigger === 'level-up') {
                    if (evo.evolves_to[0].evolution_details[0].min_level === null) {
                        methodString = `Happiness ${evo.evolves_to[0].evolution_details[0].min_happiness}`;
                    } else {
                        methodString = `level ${evo.evolves_to[0].evolution_details[0].min_level}`;
                    }
                } else if (trigger === 'use-item') {
                    methodString = evo.evolves_to[0].evolution_details[0].item.name;
                } else {
                    methodString = false;
                }

                if (methodString !== false) {
                    return (
                        <div className={classes.step_method}>
                            <span>{methodString}</span>
                            <span>&darr;</span>
                        </div>
                    )
                } else {
                    return null;
                }
            };

            return (
                <div 
                    className={classes.step} 
                    key={`pokemon-${evo.species.name}`}
                >
                    <div className={classes.step_pokemon}>
                        <img 
                            alt={evo.species.name}
                            src={imageUrl}
                        />
                        <h4>{evo.species.name}</h4>
                    </div>
                    {stepMethod()}
                </div>
            )
        }

        jsx.push(step(evolutions));

        if (evolutions.evolves_to.length) {
            jsx.push(step(evolutions.evolves_to[0]));

            if (evolutions.evolves_to[0].evolves_to.length) {
                jsx.push(step(evolutions.evolves_to[0].evolves_to[0]));
            }
        };

        return jsx;
    }

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