import React, {Component} from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {

    icon: 'users',
    title: 'Personagens',
    subtitle: "Cadastro de personagem"

}

const baseUrl = "http://localhost:3001/personagem";
const initialState = {
    personagem : { nome : ' ' , descricao : ' '},
    list: []
}

export default class PersonagemCRUD extends Component {

    state = {...initialState}

    clear() {
        this.setState({ personagem: initialState.personagem })
    }

    save() {
        const personagem = this.state.personagem
        const method = personagem.id ? 'put' : 'post'
        const url = personagem.id ? `${baseUrl}/${personagem.id}` : baseUrl 
        axios[method](url, personagem)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({personagem : initialState.personagem, list})
            })
    }

    render(){
        return(
            <Main {...headerProps}>
                Cadastro de Personagem
            </Main>
        )
    }

    getUpdateList(personagem){
        const list = this.state.list.filter(x => x.id !== personagem.id)
        list.unshift(personagem)
        return list;
    }
}
