import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchBar from '../../components/Search/Search'
import style from './About.module.css'
import linkedin from '../../img/linkedinIcon.png'
import git from '../../img/githubIcon.png'

export default function Nav() {
    return (
        <nav className={style.contenedor}>
            <ul className={style.subcontenedor}>
                
                <div>
                    <li><NavLink to='/' className={style.link}>HOME</NavLink></li>

                    <li><NavLink to='/home' className={style.link}>ALL RECIPES</NavLink></li>
                    
                    <li><NavLink to='/create' className={style.link}>CREATE RECIPE</NavLink></li>
                    
                    <li>
                        <a target='_blank' href='https://www.linkedin.com/in/bryann-mart%C3%ADn-chuco-p%C3%A9rez-8565b81a6' rel="noreferrer">
                            <img src={linkedin} alt="Linkedin" className={style.iconLinkedin}/>
                        </a>
                    </li>
                    
                    <li>
                        <a target='_blank' href='https://github.com/BMchucoperez' rel="noreferrer">
                            <img src={git} alt="GitHub" className={style.iconGitHub}/>
                        </a>
                    </li>

                     
                </div>
                <li><SearchBar /></li>
            </ul>
        </nav>
    )
}