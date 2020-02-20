import React from 'react'
import { Switch, Route , Redirect} from 'react-router'

import Home from '../components/home/Home'
import PersonagemCRUD from '../components/personagens/PersonagemCRUD'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/personagem' component={PersonagemCRUD} />
        <Redirect from='*' to='/' />
    </Switch>