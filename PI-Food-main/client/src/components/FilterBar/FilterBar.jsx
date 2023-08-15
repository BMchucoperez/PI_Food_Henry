import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByDiet, filterByOrigin } from '../../redux/actions'
import s from '../OrderBar/OrderBar.module.css'

export default function FilterBar() {

  const diets = useSelector(state => state.diets)
  const dispatch = useDispatch();

  function handleChange(e) {
    dispatch(filterByDiet("all"))
    dispatch(filterByDiet(e.target.value));
  }

  function handleChangeOrgin(order) {
    dispatch(filterByOrigin(order.target.value))
  }

  return (
    <div className={s.container}>
      <span className={s.title}>
        Filter by 
      </span>
      <select 
      onChange={handleChange} 
      className={s.select}
      >
        <option value={"all"}>
          Select diet
        </option>
        {diets.map(diet =>
          <option value={diet.name} key={diet.name}>{diet.name[0].toUpperCase() + diet.name.slice(1)}
          </option>
        )}
      </select>
      <select 
      className={s.select} 
      onChange={handleChangeOrgin}
      >
        <option value={"all"}>ALL</option>
        <option value={"api"}>Only API</option>
        <option value={"db"}>Only created</option>
      </select>
    </div>
  )
}