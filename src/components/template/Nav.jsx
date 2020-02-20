import './Nav.css'
import React from 'react'

export default props => 
    <aside className="menu-area">
            <nav className="menu">
                    <a href="#">
                        <i className="fa fa-home"></i> Início 
                    </a>
                    <a href="#/personagens">
                        <i className="fa fa-user"></i> Personagens 
                    </a>
            </nav>
    </aside>