import React from 'react';

import classes from './StatsTab.module.scss';

const StatsTab = (props) => {

    const { pokemon, typeStyles } = props;

    const statBars = (input) => {
        let stats = {
            name: ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed', 'Total'], //name of each stat including "total"
            value: [], //value for each individual stat
            percentage: [], //percentage for width styling
            max: [255, 165, 230, 154, 230, 160, 720], //max value of each stat
            jsx: [], //jsx elements to  be returned later

            getTotalStats: function() {
                let max = this.value.reduce((el, acc) => el + acc);
                this.value.push(max);
            }
        };

        //getting data per pokemon for stat values
        for (let i = 0; i < input.length; i++) {
            stats.value.push(input[i].base_stat);
        };

        stats.getTotalStats();

        for (let i = 0; i < stats.value.length; i++) {
            let perc;

            perc = (stats.value[i] / stats.max[i]) * 100;
            perc = perc + '%';

            stats.percentage.push(String(perc));
        };

        for (let i = 0; i < stats.value.length; i++) {
            stats.jsx.push(
                <div className={classes.stat} key={`stat-${stats.name[i]}`}>
                    <div className={classes.stat_container} key={`stat-container-${stats.name[i]}`} style={{border: `2px solid ${typeStyles.text}`}}>
                        <div className={classes.stat_bar} key={`stat-bar-${stats.name[i]}`} id={`stat-bar-${stats.name[i]}-${pokemon.id}`} style={{width: stats.percentage[i], background: typeStyles.contrastBg}}>
                            <strong className={classes.stat_value} key={`stat-bar-value-${stats.name[i]}`}>{stats.value[i]}</strong>
                        </div>
                    </div>
                    <label className={classes.stat_label} key={`stat-label-${stats.name[i]}`} htmlFor={`stat-bar-${stats.name[i]}-${pokemon.id}`}>
                        {stats.name[i]}
                    </label>
                </div>
            );
        };

        return stats.jsx;
    };

    return (
        <section className={classes.stats_tab} id={`stat-display-${pokemon.id}`} style={{color: typeStyles.text}}>
            {statBars(pokemon.stats)}
        </section>
    )
};

export default StatsTab;