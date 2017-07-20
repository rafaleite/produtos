import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class ProdutoEditar extends Component {
    constructor(props) {
        super(props)
        this.state = {redirect: false}
        this.handleEditProduto = this.handleEditProduto.bind(this)
    }

    componentDidMount() {
        this.props.loadProdutoById(this.props.match.params.id)
            .then(res => {
                this.refs.produto.value = res.data.produto
                this.refs.categoria.value = res.data.categoria
            })
    }

    handleEditProduto() {
        const produto = {
            id: this.props.match.params.id,
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }

        this.props.editProduto(produto).then((res) =>
            this.setState({redirect: '/produtos/categoria/'+produto.categoria})
            )
    }

    render() {
         if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }


        const {categorias} = this.props
        return (
            <div>
                <h2>Editar Produto</h2>
                <div className="form-group col-xs-6">
                    <label>Nome</label>
                    <input ref="produto" 
                        className="form-control" 
                        placeholder="Nome do Produto"/>
                </div>

                <div className="form-group col-xs-6">
                    <label>Categoria</label>
                    <select ref='categoria' className="form-control">
                        {categorias.map((c)=> 
                            <option key={`c-${c.id}`} value={c.id}>{c.categoria}</option>)}
                    </select>
                </div>
                <div className="form-group col-xs-12">
                    <button className="btn btn-primary" onClick={this.handleEditProduto}>Salvar</button>
                </div>
            </div>
        )
    }

}