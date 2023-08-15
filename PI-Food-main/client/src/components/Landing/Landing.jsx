import React from 'react'
import { NavLink } from 'react-router-dom'
import s from "./Landing.module.css"

export default function LandingPage() {
  return (
    <div className={s.container}>
      
        <div 
        className={s.typewriter}
        >
          <h1>Healthy Cooking Guide</h1>
        </div>
        <div 
        className={s.subtitle}
        >
          Project by: Bryann Chuco Perez
        </div>
            <ul>
              <li>
            <NavLink 
            to='/home' 
            className={s.textDe}
            >
              <button
              className={s.btn}
              >
                OPEN
              </button>
            </NavLink>
            </li>  
            </ul>
      
      
    </div>
  )
}