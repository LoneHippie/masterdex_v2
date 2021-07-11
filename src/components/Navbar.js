import React, { useState, useEffect } from 'react';
import pokeapi from '../api/pokeapi';

import classes from './Navbar.module.scss';

const Navbar = (props) => {

    const { typeSearch, genSearch, singleSearch } = props;

    const [ searchTerms, setSearchTerms ] = useState(undefined);
    const [ search, setSearch ] = useState('');
    const [ isFocused, setIsFocused ] = useState(false);

    //get array of valid pokemon names
    useEffect(() => {
        (async () => {
            const entries = await pokeapi.get('/pokemon?limit=893');
            setSearchTerms(entries.data.results);
        })();
    }, []);

    function handleChange(e) {
        let value = e.target.value;
        value = value.replace(/[^A-Za-z]/ig, '').toLowerCase();
        setSearch(value);
    };

    const suggestionsList = () => {
        const suggestions = searchTerms?.filter(el => el.name.includes(search));

        const suggestionsList = suggestions?.map((el, index) => {
            if (search !== '') {
                return (
                    <button
                        className={classes.suggestion_item}
                        key={`result-${index}`}
                        onClick={(e) => handleSubmit(e)}
                        value={el.name}
                    >
                        {el.name}
                    </button>
                )
            }
            return null;
        });

        if (search !== '' && isFocused && suggestions?.length > 0) {
            return (
                <div className={classes.suggestions}>
                    {suggestionsList}
                </div>
            )
        } else {
            return null;
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (e.target.value) {
            setSearch(e.target.value);
            singleSearch(e.target.value);
        }
    }

    return (
        <nav className={classes.nav}>

            <div className={classes.border}></div>

            <form 
                onSubmit={(e) => handleSubmit(e)}
                className={classes.search_container}
            >
                <input 
                    className={classes.searchbar}
                    type="text"
                    spellCheck="false"
                    placeholder="Pokemon"
                    value={search}
                    onChange={(e) => handleChange(e)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => {
                        setIsFocused(false)
                    }, 200)}
                >
                </input>
                {suggestionsList()}
                <h2>Masterdex v2</h2>
            </form>

            <div className={classes.button_container}>
                
                <div className={classes.button_group}>
                    <select
                        defaultValue={'default'} 
                        onChange={(e) => genSearch(e.target.value)} 
                        className={classes.custom_select} 
                        id="gen-select"
                    >
                        <option value="default" disabled>GEN</option>
                        <option value="1">Gen 1</option>
                        <option value="2">Gen 2</option>
                        <option value="3">Gen 3</option>
                        <option value="4">Gen 4</option>
                        <option value="5">Gen 5</option>
                        <option value="6">Gen 6</option>
                        <option value="7">Gen 7</option>
                        <option value="8">Gen 8</option>
                    </select>
                </div>

                <div className={classes.button_group}>
                    <select
                        defaultValue={'default'} 
                        onChange={(e) => typeSearch(e.target.value)} 
                        className={classes.custom_select} 
                        id="type-select"
                    >
                        <option value="default" disabled>TYPE</option>
                        <option value="fire">FIR</option>
                        <option value="water">WTR</option>
                        <option value="electric">ELE</option>
                        <option value="grass">GRS</option>
                        <option value="ice">ICE</option>
                        <option value="fighting">FGT</option>
                        <option value="poison">PSN</option>
                        <option value="ground">GRN</option>
                        <option value="flying">FLY</option>
                        <option value="psychic">PSY</option>
                        <option value="bug">BUG</option>
                        <option value="rock">RCK</option>
                        <option value="ghost">GHO</option>
                        <option value="dragon">DRA</option>
                        <option value="dark">DRK</option>
                        <option value="ground">GRN</option>
                        <option value="steel">STL</option>
                        <option value="fairy">FRY</option>
                    </select>
                </div>
                
            </div>
        </nav>
    )
};

export default Navbar;