import React, {Component} from 'react'
import Main from '../template/Main'

const headerProps = {

    icon: 'users',
    title: 'Personagens',
    subtitle: "Cadastro de personagem"

}

export default class PersonagemCRUD extends Component {
    render(){
        return(
            <Main {...headerProps}>
                Cadastro de Personagem
            </Main>
        )
    }
}
