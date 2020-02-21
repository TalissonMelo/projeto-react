import './Main.css'
import React from 'react'
import Header from './Header'
import logo from '../../assets/img/personagens.jpg'


export default props =>
    <React.Fragment>
        <Header {...props} />
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children}
                <aside className="photo " >
                    <a href="/" className="photos">
                        <img src={logo} alt="photo" />
                    </a>
                </aside>

            </div>
        </main>
    </React.Fragment>