import React from 'react'
import { useDispatch } from 'react-redux';
import { orderByAlphabetical, orderByHealthScore } from '../../redux/actions';
import style from './OrderBar.module.css'

export default function OrderBar() {

  const dispatch = useDispatch();

  function handleChange(order) {
    switch (order.target.value) {
      case "a-z":
        return dispatch(orderByAlphabetical(order.target.value));
      case "z-a":
        return dispatch(orderByAlphabetical(order.target.value));
      case "asc":
        return dispatch(orderByHealthScore(order.target.value));
      case "des":
        return dispatch(orderByHealthScore(order.target.value));
      default:
        break;
    }
  }

  return (
    <div className={style.container}>
      <span className={style.title}>
        Order by 
      </span>
      
      <select 
      className={style.select} 
      onChange={handleChange} 
      >
        <option>Alphabetical</option>
        <option value={"a-z"}>A-Z</option>
        <option value={"z-a"}>Z-A</option>
      </select>
      
      <select 
      className={style.select} 
      onChange={handleChange}
      >
        <option>HealthScore</option>
        <option value={"des"}>⬆️👆⬆️</option>
        <option value={"asc"}>⬇️👇⬇️</option>
      </select>
    </div>
  )
}