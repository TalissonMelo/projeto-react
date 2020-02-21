import React, { Component, useReducer } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {

    icon: 'users',
    title: 'Personagens',
    subtitle: "Cadastro de personagem"

}

const baseUrl = "http://localhost:3001/personagem";
const initialState = {
    personagem: { nome: '', descricao: '' },
    list: []
}

export default class PersonagemCRUD extends Component {

    state = { ...initialState }

    componentList() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data})
        })
    }

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
                this.setState({ personagem: initialState.personagem, list })
            })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="nome" value={this.state.personagem.nome}
                                onChange={e => this.updateField(e)}></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" className="form-control" name="descricao" value={this.state.personagem.descricao}
                                onChange={e => this.updateField(e)}></input>
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

    updateField(event) {
        const personagem = { ...this.state.personagem }
        personagem[event.target.name] = event.target.value
        this.setState({ personagem })
    }

    getUpdateList(personagem, add = true) {
        const list = this.state.list.filter(x => x.id !== personagem.id)
        if(add) list.unshift(personagem)
        return list;
    }

    load(personagem) {
        this.setState({ personagem })
    }

    remove(personagem) {
        axios.delete(`${baseUrl}/${personagem.id}`).then(resp => {
            const list = this.getUpdateList(personagem, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRow()}
                </tbody>
            </table>
        )
    }

    renderRow() {
        return this.state.list.map(personagem => {
            return (
                <tr key={personagem.id}>
                    <td>{personagem.nome}</td>
                    <td>{personagem.descricao}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(personagem)}>
                            <i className="fa fa-pencil"></i>
                        </button>

                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(personagem)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        console.log(this.state.list);
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
