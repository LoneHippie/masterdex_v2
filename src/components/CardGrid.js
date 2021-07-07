import React, { useEffect, useRef } from 'react';

import PokemonMini from './PokemonMini';

import classes from './CardGrid.module.scss';

const CardGrid = (props) => {

    const { pokemon } = props;

    const gridRef = useRef(null);

    //clean up of previous DOM
    useEffect(() => {
        if (gridRef.current) {
            while (gridRef.current.firstChild) {
                gridRef.current.removeChild(gridRef.current.firstChild);
            }
        }

        let gridNode = gridRef.current;

        return () => gridNode.innerHTML = '';
    }, [])

    const generateGridItems = () => {
        if (pokemon && pokemon?.length > 0) {
            return pokemon.map((el, index) => 
                <PokemonMini 
                    key={`pokecard-mini-${index}`}
                    pokemon={el}
                />
            )
        }
        return null;
    };

    return (
        <section className={classes.grid} ref={gridRef}>
            {generateGridItems()}
        </section>
    )
};

export default CardGrid;