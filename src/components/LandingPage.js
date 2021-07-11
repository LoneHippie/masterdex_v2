import React from 'react';

import classes from './LandingPage.module.scss';

const LandingPage = () => {

    return (
        <section className={classes.landing_container}>
            
            <div className={classes.header}>
                <h3>Welcome to Masterdex!</h3>
            </div>

            <div className={classes.body}>
                <p>
                    <span>Masterdex</span> is a fully interactive stylized pokedex with detailed info available on all Pokemon up to generation 8 (generation 8 is currently missing move data).
                </p>
                <p>
                    <span>Start</span> by using the navigation bar above. Pokemon can be searched for by name, type or by generation. All results can be interacted with to see more info.
                </p>
                <p>
                    <span>Created</span> with React and pokeapi by Lone Hippie &copy; 2021
                </p>
            </div>

        </section>
    )
};

export default LandingPage;