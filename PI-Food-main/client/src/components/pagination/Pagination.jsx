import React, { useEffect, useState } from 'react';
import style from './Pagination.module.css';

export default function Pagination({ page, max, setPage }) {

    const [input, setInput] = useState(1); 

    useEffect(() => {
        setPage(1);
        setInput(1);
    }, [max, setPage])

    const prevPage = () => {
        setInput(parseInt(input - 1));
        setPage(parseInt(page) - 1); 
    };

    const nextPage = () => {
        setInput(parseInt(input + 1));
        setPage(parseInt(page) + 1); 
    };

    const numberPageArray = [];

    for (let i = 1; i <= max; i++) {
        numberPageArray.push(i)
    };

    function handleClick(num) {
        setPage(num);
        setInput(num);
    };

    return (
        <div className={style.container}>
            <p>{input} of {max}</p>

            <div className={style.numbers}>
                <button
                className={style.button}
                onClick={prevPage}
                disabled={page === 1 || page < 1}
                > 
                    ◀
                </button>
                
                {numberPageArray.map((number) => (
                    <li key={number} className={`${input === number ? style.liStyleActive : style.liStyle}`}>
                        <button 
                        onClick={() => handleClick(number)} 
                        className={style.btnStyle}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                
                <button
                className={style.button}
                onClick={nextPage}
                disabled={page === max || page > max}
                > 
                    ▶
                </button>
            </div>
        </div>
    )
}