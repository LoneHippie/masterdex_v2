import React, { useState, useRef } from 'react';
import pokeapi from '../api/pokeapi';

import Navbar from './Navbar';
import CardGrid from './CardGrid';
import GridLoading from './GridLoading';

import '../styles/base.scss';

const App = () => {

    const [ pokemon, setPokemon ] = useState([]);
    const [ gridActive, setGridActive ] = useState(true);

    const resetRef = useRef(false);

    const searchHandlers = {
        genSearch: async (gen) => {
            //disable grid if active and activate reset ref
            //cleanup of grid DOM is handled in CardGrid
            searchHandlers.resetPokemon();

            const genPokemon = await pokeapi.get(`/generation/${gen}`);

            //end reset and reactivate card grid
            resetRef.current = false;
            setGridActive(true);

            for (let i = 0; i < genPokemon.data.pokemon_species.length; i++) {
                if (resetRef.current) { return; } //kill loop when resetRef is true 

                //get next pokemon by id and push to state
                const newPokemon = await pokeapi.get(`/pokemon/${genPokemon.data.pokemon_species[i].url.slice(42).slice(0, -1)}`);
                setPokemon(pokemon => [...pokemon, newPokemon.data]);
            }
        },
        typeSearch: async (type) => {
            //disable grid if active and activate reset ref
            //cleanup of grid DOM is handled in CardGrid
            searchHandlers.resetPokemon();

            const typePokemon = await pokeapi.get(`/type/${type}`);

            //end reset and reactivate card grid
            resetRef.current = false;
            setGridActive(true);

            for (const el of typePokemon.data.pokemon) {
                if (resetRef.current) { return; } //kill loop when resetRef is true

                const newPokemon = await pokeapi.get(`/pokemon/${el.pokemon.name}`);

                if (newPokemon.data.id < 999) {
                    setPokemon(pokemon => [...pokemon, newPokemon.data]);
                }    
            }
        },
        singleSearch: async (term) => {
            //disable grid if active and activate reset ref
            //cleanup of grid DOM is handled in CardGrid
            searchHandlers.resetPokemon();

            const singlePokemon = await pokeapi.get(`/pokemon/${term}`);

            resetRef.current = false;
            setGridActive(true);

            setPokemon([singlePokemon]);
        },
        resetPokemon: async () => {
            //reset pokemon state and unmount CardGrid to enable cleanup
            if (gridActive) {
                setGridActive(false);
            };

            resetRef.current = true;
            setPokemon([]);
        }
    }

    return (
        <>
            <Navbar 
                typeSearch={searchHandlers.typeSearch}
                genSearch={searchHandlers.genSearch}
            />
            {
                gridActive ? (
                    <CardGrid 
                        pokemon={pokemon}
                    />
                ) : (
                    <GridLoading />
                )
            }
        </>
    )
};

export default App;