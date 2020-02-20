import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props => 
    <aside className="menu-area">
            <nav className="menu">
                    <Link to="/">
                        <i className="fa fa-home"></i> Início 
                    </Link>
                    <Link to="/personagem">
                        <i className="fa fa-user"></i> Personagens 
                    </Link>
            </nav>
    </aside>