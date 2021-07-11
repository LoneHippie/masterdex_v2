import React, { useState, useEffect } from 'react';
import pokeapi from '../api/pokeapi';

import MoveFull from './MoveFull';

import classes from './MovesTab.module.scss'

const MovesTab = (props) => {

    const { showMovesTab, pokemon, speciesInfo, moveData, typeStyles, moveTextColor, moveBackground } = props;

    const [ pokemonGen, setPokemonGen ] = useState(undefined);

    const [ showMove, setShowMove ] = useState(false);
    const [ moveDetails, setMoveDetails ] = useState(null);

    //setting values needed to generate move info
    useEffect(() => {
        initGen(speciesInfo);
        convertToTypeStrings(moveData);
        convertPokemonMoveGenValue(pokemon);
        filterDuplicateMoves(pokemon);
    }, [speciesInfo, moveData, pokemon]);

    //set state details and open modal for move details
    async function initMoveDetails (el) {
        setMoveDetails(null);
        setShowMove(true);
        
        const details = await pokeapi.get(`/move/${el.move.name}`)
        setMoveDetails(details.data);
    };

    //initializes gen state for each pokemon
    function initGen(species) {
        switch(true) {
            case species?.generation.name === 'generation-i':
                setPokemonGen(1);
                return species.generation.name = 1;
            case species?.generation.name === 'generation-ii':
                setPokemonGen(2);
                return species.generation.name = 2;
            case species?.generation.name === 'generation-iii':
                setPokemonGen(3);
                return species.generation.name = 3;
            case species?.generation.name === 'generation-iv':
                setPokemonGen(4);
                return species.generation.name = 4;
            case species?.generation.name === 'generation-v':
                setPokemonGen(5);
                return species.generation.name = 5;
            case species?.generation.name === 'generation-vi':
                setPokemonGen(6);
                return species.generation.name = 6;
            case species?.generation.name === 'generation-vii':
                setPokemonGen(7);
                return species.generation.name = 7;
            case species?.generation.name === 'generation-viii':
                setPokemonGen(8);
                return species.generation.name = 8;
            default:
                return;
        };
    };

    //change moves.type_id from number to type string value for styling purposes
    function convertToTypeStrings(moves) {
        moves.forEach(el => {
            switch (true) {
                case el.type_id === 1:
                    return el.type_id = 'normal';
                case el.type_id === 2:
                    return el.type_id = 'fighting';
                case el.type_id === 3:
                    return el.type_id = 'flying';
                case el.type_id === 4:
                    return el.type_id = 'poison';
                case el.type_id === 5:
                    return el.type_id = 'ground';
                case el.type_id === 6:
                    return el.type_id = 'rock';
                case el.type_id === 7:
                    return el.type_id = 'bug';
                case el.type_id === 8:
                    return el.type_id = 'ghost';
                case el.type_id === 9:
                    return el.type_id = 'steel';
                case el.type_id === 10:
                    return el.type_id = 'fire';
                case el.type_id === 11:
                    return el.type_id = 'water';
                case el.type_id === 12:
                    return el.type_id = 'grass';
                case el.type_id === 13:
                    return el.type_id = 'electric';
                case el.type_id === 14:
                    return el.type_id = 'psychic';
                case el.type_id === 15:
                    return el.type_id = 'ice';
                case el.type_id === 16:
                    return el.type_id = 'dragon';
                case el.type_id === 17:
                    return el.type_id = 'dark';
                case el.type_id === 18:
                    return el.type_id = 'fairy';
                default:
                    return;
            };
        });
    };

    //changes pokemon.moves.move.version_group_details.version_group.name to number equal to gen
    function convertPokemonMoveGenValue(pokemon) {
        pokemon.moves.forEach((move, val) => {
            move.version_group_details.forEach((el, index) => {
                switch(true) { //also deletes items that aren't gen 1-7 since colosseum and xd are not relevant and 8 has no move data
                    case el.version_group.name === 'red-blue':
                        return el.version_group.name = 1;
                    case el.version_group.name === 'yellow':
                        return el.version_group.name = 1;
                    case el.version_group.name === 'gold-silver':
                        return el.version_group.name = 2;
                    case el.version_group.name === 'crystal':
                        return el.version_group.name = 2;
                    case el.version_group.name === 'ruby-sapphire':
                        return el.version_group.name = 3;
                    case el.version_group.name === 'emerald':
                        return el.version_group.name = 3;
                    case el.version_group.name === 'firered-leafgreen':
                        return el.version_group.name = 3;
                    case el.version_group.name === 'diamond-pearl':
                        return el.version_group.name = 4;
                    case el.version_group.name === 'platinum':
                        return el.version_group.name = 4;
                    case el.version_group.name === 'heartgold-soulsilver':
                        return el.version_group.name = 4;
                    case el.version_group.name === 'black-white':
                        return el.version_group.name = 5;
                    case el.version_group.name === 'black-2-white-2':
                        return el.version_group.name = 5;
                    case el.version_group.name === 'x-y':
                        return el.version_group.name = 6;
                    case el.version_group.name === 'omega-ruby-alpha-sapphire':
                        return el.version_group.name = 6;
                    case el.version_group.name === 'sun-moon':
                        return el.version_group.name = 7;
                    case el.version_group.name === 'ultra-sun-ultra-moon':
                        return el.version_group.name = 7;
    
                    case el.version_group.name === 'colosseum':
                        return move.version_group_details.splice(index, 1);
                    case el.version_group.name === 'xd':
                        return move.version_group_details.splice(index, 1);
                    default:
                        return;
                };
            });
    
            //removes any moves that were only xd or col
            if (move.version_group_details.length === 0) {
                pokemon.moves.splice(val, 1);
            }
        });
    };

    //attempt to filter out different versions of moves from the same generations
    //this works, but PAY ATTENTION for any irregulatities
    function filterDuplicateMoves(pokemon) {
        pokemon.moves.forEach((move) => {
            if (move.version_group_details.length > 1 && move.version_group_details !== undefined) {
                for (let i = 1; i < move.version_group_details.length; i++) {
                    //if current index and previous index contain the same gen name:
                    if (move.version_group_details[i].version_group.name === move.version_group_details[i - 1].version_group.name) {
                        move.version_group_details.splice(i, 1);
                    }
                }
                for (let i = 1; i < move.version_group_details.length; i++) {
                    //if current index and previous index contain the same gen name:
                    if (move.version_group_details[i].version_group.name === move.version_group_details[i - 1].version_group.name) {
                        move.version_group_details.splice(i, 1);
                    }
                }
            }
        });
    };

    const getGenSelect = () => {
        //empty array to push JSX elements
        let selectOptions = [];
        //first geneation current pokemon appears in
        const firstGen = speciesInfo.generation.name;
        //initial select option for firstGen, selected by default on load
        selectOptions.push(
            <option key={`gen-select-${firstGen}`} value={firstGen}>{`Gen ${firstGen}`}</option>
        );

        //pushing new select options in for each gen between firstGen and gen 8
        if (firstGen !== 8) {
            for (let i = (firstGen + 1); i <= 8; i++) {
                selectOptions.push(
                    <option key={`gen-select-${i}`} value={i}>{`Gen ${i}`}</option>
                );
            };
        };

        return selectOptions;
    };

     //function for generation move pool
     const movePool = (input, learnMethod) => {
        //filters moves not in current selected gen
        input = input.filter((el) => {
            let id = parseInt(el.move.url.slice(31).slice(0, -1), 10);
    
            if (moveData[id].generation_id <= pokemonGen) {
                return el;
            };
            return false;
        });

        //filter for each learn method argument
        input = input.filter(el => el.version_group_details[0].move_learn_method.name === learnMethod);

        //gets genIndex for each lvl move to select the right index for levels in different gens
        if (learnMethod === 'level-up') {
            input.forEach(move => {
                move.version_group_details.forEach((el, val) => {
                    switch(true) {
                        case el.move_learn_method.name === 'level-up' && el.version_group.name === parseInt(pokemonGen, 10):
                            return move.genIndex = val;
                        default:
                            return;
                    };
                });
            });
        };

        //this can be used for styling specific to move type
        const moveTypeColor = (el) => {
            let id = parseInt(el.move.url.slice(31).slice(0, -1), 10);

            const curMove = moveData.find((el) => {
                return el.id === id;
            });

            return curMove.type_id;
        };

        //gets PP value for each move
        const movePP = (el) => {
            let id = parseInt(el.move.url.slice(31).slice(0, -1), 10);

            const curMove = moveData.find((el) => {
                return el.id === id;
            });

            return curMove.pp;
        };

        //gets category of each move (status, physical, special)
        const moveCategory = (el) => {
            let id = parseInt(el.move.url.slice(31).slice(0, -1), 10);

            const curMove = moveData.find((el) => {
                return el.id === id;
            });

            if (curMove.damage_class_id === 1) {
                return 'Status';
            } else if (curMove.damage_class_id === 2) {
                return 'Phsycial';
            } else {
                return 'Special';
            };
        };

        //sorting all level-up moves by level
        input.sort((a, b) => {
            if (a.version_group_details[0].move_learn_method.name === 'level-up') {
                let genIndexA = a.genIndex !== undefined ? a.genIndex : 0;
                let genIndexB = b.genIndex !== undefined ? b.genIndex: 0;
                return a.version_group_details[genIndexA].level_learned_at - b.version_group_details[genIndexB].level_learned_at;
            } else {
                return 0;
            }
        });

        //setting genIndex incase intial render is undefined
        let genIndex = (el) => el.genIndex === undefined ? 0 : el.genIndex;

        return input.map((el, index) => 
            <div 
                className={classes.move}
                key={`pk-move-${index}`}
                style={{
                    background: moveBackground(moveTypeColor(el)),
                    color: moveTextColor(moveTypeColor(el)),
                    border: `2px solid ${typeStyles.text}`
                }}
                tabIndex={index}
                onClick={() => initMoveDetails(el)}
            >
                <div className={classes.move_info}>
                    <span>
                        lvl {el.version_group_details[genIndex(el)].level_learned_at === 0 ? '-' : el.version_group_details[genIndex(el)].level_learned_at}
                    </span>
                    <span>
                        {el.version_group_details[0].move_learn_method.name}
                    </span>
                </div>
                <div className={classes.move_name}>
                    {el.move.name}
                </div>
                <div className={classes.move_info}>
                    <span>
                        {movePP(el)} PP
                    </span>
                    <span>
                        {moveCategory(el)}
                    </span>
                </div>
                {/* <MoveDetails 
                    move={el}
                    moveDetails={moveDetails}
                    renderDetails={renderDetails}
                    pokemonIndex={pokemonIndex}
                    textColor={textColor}
                    getContrastBg={getContrastBg}
                    typeName={typeName}
                /> */}
            </div>
        );
    };

    return (
        <section 
            className={classes.moves_tab} 
            style={{display: showMovesTab ? 'flex' : 'none'}}
        >

            { 
                showMove ? (
                    <MoveFull 
                        move={moveDetails} 
                        setShowMove={setShowMove} 
                        typeStyles={typeStyles}
                    />
                ) : null
            }

            <div className={classes.gen_select}>
                <label htmlFor="move-gen-select" style={{display: 'none'}}>Generation select for this pokemon's moves</label>
                <select
                    className={classes.gens}
                    id="move-gen-select"
                    style={{
                        color: typeStyles.text,
                        background: typeStyles.contrastBg,
                        border: `2px solid ${typeStyles.text}`
                    }}
                    onChange={(e) => setPokemonGen(e.target.value)}
                >
                    {speciesInfo ? getGenSelect() : null}
                </select>
            </div>

            <span className={classes.grid_title} style={{color: typeStyles.text}}>
                {movePool(pokemon.moves, 'level-up').length === 0 ? '' : 'Learned Naturally:'}
            </span>
            <div className={classes.move_grid}>
                {movePool(pokemon.moves, 'level-up')}
            </div>

            <span className={classes.grid_title} style={{color: typeStyles.text}}>
                {movePool(pokemon.moves, 'machine').length === 0 ? '' : 'TM/HM:'}
            </span>
            <div className={classes.move_grid}>
                {movePool(pokemon.moves, 'machine')}
            </div>

            <span className={classes.grid_title} style={{color: typeStyles.text}}>
                {movePool(pokemon.moves, 'tutor').length === 0 ? '' : 'Tutor Moves:'}
            </span>
            <div className={classes.move_grid}>
                {movePool(pokemon.moves, 'tutor')}
            </div>

            <span className={classes.grid_title} style={{color: typeStyles.text}}>
                {movePool(pokemon.moves, 'egg').length === 0 ? '' : 'Egg Moves:'}
            </span>
            <div className={classes.move_grid}>
                {movePool(pokemon.moves, 'egg')}
            </div>

        </section>
    )
};

export default MovesTab;