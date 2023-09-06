import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { clean, getSearchRecipes } from '../../redux/actions'
import style from './Search.module.css'

export default function SearchBar() {

    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    

    function handleChange(event) {
        const inputValue = event.target.value;
        setInput(inputValue);
        
        if (inputValue.trim() !== '') {
            dispatch(getSearchRecipes(inputValue)); // 
        } else {
            dispatch(clean()); 
        }
    };

    return (
        <div >
            <input
                type='input'
                onChange={handleChange}
                value={input}
                name = "input"
                placeholder="Search recipe..."
                className={style.inputText}
                
            />
        </div>
    )
}