import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
//import Logo from '../../img/Logo.jpg'

export default function Navbar() {
    return (
        <div className="navbar">
            <div className='logo'>
            <Link to="/" >
                {/* <img src={Logo} alt="logo"/> */}
            </Link>
            </div>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <Link to="/recipes" >Explore Recipes</Link>
                        <Link to="/create" >Create a Recipe</Link>
                        <Link to="/about" >About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}