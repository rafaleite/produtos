import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class ProdutoNovo extends Component {
    constructor(props) {
        super(props)
        this.state = {redirect: false}
        this.handleNewProduto = this.handleNewProduto.bind(this)
    }

    handleNewProduto() {
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }

        this.props.createProduto(produto).then((res) =>
            this.setState({redirect: '/produtos/categoria/'+produto.categoria})
            )
    }

    render() {
        const {categorias} = this.props

        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <h2>Novo Produto</h2>
                <div className="form-group col-xs-6">
                    <label>Nome</label>
                    <input ref="produto" className="form-control" placeholder="Nome do Produto"/>
                </div>

                <div className="form-group col-xs-6">
                    <label>Categoria</label>
                    <select ref='categoria' className="form-control">
                        {categorias.map((c)=> 
                            <option key={`c-${c.id}`} value={c.id}>{c.categoria}</option>)}
                    </select>
                </div>
                <div className="form-group col-xs-12">
                    <button className="btn btn-primary" onClick={this.handleNewProduto}>Salvar</button>
                </div>
            </div>
        )
    }
}