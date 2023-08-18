import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByDiet, filterByOrigin } from '../../redux/actions'
import style from '../OrderBar/OrderBar.module.css'

export default function FilterBar() {

  const diets = useSelector(state => state.diets)
  const dispatch = useDispatch();
  
  function handleChange(event) {
    dispatch(filterByDiet("all"))
    dispatch(filterByDiet(event.target.value));
  }

  function handleChangeOrgin(order) {
    dispatch(filterByOrigin(order.target.value));
  }

  return (
    <div className={style.container}>
      <span className={style.title}>
        Filter by 
      </span>
      
      <select 
      onChange={handleChange} 
      className={style.select}
      >
        <option value={"all"}>
          Select diet
        </option>
        {diets.map(diet =>
            <option 
            value={diet.name} 
            key={diet.name}
            >
              {diet.name[0].toUpperCase() + diet.name.slice(1)}
            </option>
        )}
      </select>
      
      <select 
      className={style.select} 
      onChange={handleChangeOrgin}
      >
        <option value={"all"}>ALL</option>
        <option value={"api"}>Only API</option>
        <option value={"db"}>Only created</option>
      </select>
    </div>
  )
}