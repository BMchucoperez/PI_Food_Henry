import React from 'react'
import { Link } from 'react-router-dom'
import style from './About.module.css'
import linkedin from '../../img/linkedinIcon.png'
import git from '../../img/githubIcon.png'

export default function Nav() {
    return (
        <nav className={style.contenedor}>
            <ul className={style.subcontenedor}>
                
                <div>
                    <li><Link to='/' className={style.link}>EXIT</Link></li>

                    <li><Link to='/home' className={style.link}>HOME</Link></li>
                    
                    <li><Link to='/create' className={style.link}>CREATE RECIPE</Link></li>
                    
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
                
            </ul>
        </nav>
    )
}