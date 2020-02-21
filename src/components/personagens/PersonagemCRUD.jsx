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

    renderForm(){
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                                <label>Nome</label>
                                <input type="text" className="form-control" name="nome" value={this.state.personagem.nome}
                                onChange={e => this.updateField(e)} placeholder= "Digite o nome ..."></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                                <label>Descrição</label>
                                <input type="text" className="form-control" name="descricao" value={this.state.personagem.descricao}
                                onChange={e => this.updateField(e)} placeholder= "Digite a descrição do personagem ..."></input>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-contend-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>  
                                Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>  
                                Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    updateField(event){
        const personagem = {...this.state.user}
        personagem[event.target.nome] = event.target.value 
        this.setState({ personagem })
    }

    getUpdateList(personagem){
        const list = this.state.list.filter(x => x.id !== personagem.id)
        list.unshift(personagem)
        return list;
    }

    render(){
        return(
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}
