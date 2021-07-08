import React, { useState, useRef } from 'react';
import pokeapi from '../api/pokeapi';

import Navbar from './Navbar';
import CardGrid from './CardGrid';
import GridLoading from './GridLoading';

import '../styles/base.scss';

const App = () => {

    const [ pokemon, setPokemon ] = useState([]);

    const moveData = require('../json-data/moves.json');

    const [ gridActive, setGridActive ] = useState(true);

    const resetRef = useRef(false);
    const filterRef = useRef(undefined);

    const searchHandlers = {
        genSearch: async (gen) => {
            //disable grid if active and activate reset ref
            //cleanup of grid DOM is handled in CardGrid
            searchHandlers.resetPokemon('gen');

            const genPokemon = await pokeapi.get(`/generation/${gen}`);

            //end reset and reactivate card grid
            resetRef.current = false;
            setGridActive(true);

            for (let i = 0; i < genPokemon.data.pokemon_species.length; i++) {
                if (resetRef.current) { 
                    console.log('gen loop stopped');
                    return; 
                } //kill loop when resetRef is true 

                //get next pokemon by id and push to state
                const newPokemon = await pokeapi.get(`/pokemon/${genPokemon.data.pokemon_species[i].url.slice(42).slice(0, -1)}`);
                
                //final check before push to state incase of filter change
                if (filterRef.current === 'gen') {
                    setPokemon(pokemon => [...pokemon, newPokemon.data]);
                }
            }
        },
        typeSearch: async (type) => {
            //disable grid if active and activate reset ref
            //cleanup of grid DOM is handled in CardGrid
            searchHandlers.resetPokemon('type');

            const typePokemon = await pokeapi.get(`/type/${type}`);

            //end reset and reactivate card grid
            resetRef.current = false;
            setGridActive(true);

            for (let i = 0; i < typePokemon.data.pokemon.length; i++) {
                if (resetRef.current) { 
                    console.log('type loop stopped');
                    return; 
                } //kill loop when resetRef is true

                //get next pokemon by id and push to state
                const newPokemon = await pokeapi.get(`/pokemon/${typePokemon.data.pokemon[i].pokemon.url.slice(34).slice(0, -1)}`);
                
                //final check before push to state incase of filter change
                if (filterRef.current === 'type') {
                    setPokemon(pokemon => [...pokemon, newPokemon.data]);
                } 
            };
        },
        singleSearch: async (term) => {
            //disable grid if active and activate reset ref
            //cleanup of grid DOM is handled in CardGrid
            searchHandlers.resetPokemon('single');

            const singlePokemon = await pokeapi.get(`/pokemon/${term}`);

            resetRef.current = false;
            setGridActive(true);

            setPokemon(pokemon => [...pokemon, singlePokemon.data]);
        },
        resetPokemon: async (filter) => {
            //reset pokemon state and unmount CardGrid to enable cleanup
            if (gridActive) {
                setGridActive(false);
            };

            resetRef.current = true;
            filterRef.current = filter;
            setPokemon([]);
        }
    }

    return (
        <>
            <Navbar 
                typeSearch={searchHandlers.typeSearch}
                genSearch={searchHandlers.genSearch}
                singleSearch={searchHandlers.singleSearch}
            />
            {
                gridActive ? (
                    <CardGrid 
                        pokemon={pokemon}
                        moveData={moveData}
                    />
                ) : (
                    <GridLoading />
                )
            }
        </>
    )
};

export default App;