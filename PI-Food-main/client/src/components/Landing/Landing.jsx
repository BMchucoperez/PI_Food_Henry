import React from 'react'
import { Link } from 'react-router-dom'
import style from "./Landing.module.css"

export default function LandingPage() {
  return (
    <div className={style.container}>
      <div className={style.typewriter}>
          <h1>Healthy Cooking Guide</h1>
      </div>
      
      <div className={style.subtitle}>
          Project by: Bryann Chuco Perez
      </div>
      
      <ul>
        <li>
          <Link 
          to='/home' 
          >
            <button
            className={style.btn}
            >
              OPEN
            </button>
          </Link>
        </li>  
      </ul>
    </div>
  )
}