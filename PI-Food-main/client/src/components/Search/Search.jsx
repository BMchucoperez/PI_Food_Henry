import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllRecipes, getSearchRecipes } from '../../redux/actions'
import style from './Search.module.css'

export default function SearchBar() {

    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    

    function handleChange(event) {
        setInput(event.target.value);
        if (input.trim().length <= 1) {
            dispatch(getAllRecipes("loading"))
            dispatch(getAllRecipes())
        } else {
            dispatch(getSearchRecipes(input))
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getSearchRecipes(input));
        setInput('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='search'
                onChange={handleChange}
                value={input}
                placeholder="Search recipe..."
                className={style.inputText}
                required
            />
        </form>
    )
}