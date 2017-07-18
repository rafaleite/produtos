import React, { Component } from 'react'
import axios from 'axios'

export default class Categoria extends Component {
    constructor(props) {
        super(props)
        this.state = {
            produtos: [],
            categoria: {}
        }

        this.loadProdutos = this.loadProdutos.bind(this)
        this.loadCategoria = this.loadCategoria.bind(this)
    }

    componentWillReceiveProps(newProps) {
        this.loadCategoria(newProps.match.params.catId)
        this.loadProdutos(newProps.match.params.catId)
    }

    componentDidMount() {
        this.loadCategoria(this.props.match.params.catId)
        this.loadProdutos(this.props.match.params.catId)
    }

    loadProdutos(id) {
        axios.get('http://localhost:3001/produtos?categoria='+id)
            .then(res => {
                this.setState({
                    produtos: res.data
                })
            })
    }

    loadCategoria(id) {
        axios.get('http://localhost:3001/categorias/'+id)
            .then(res => {
                this.setState({
                    categoria: res.data
                })
            })
    }

    renderProdutos(produto) {
        return(
            <p className='well' key={`prod-${produto.id}`}>{produto.produto}</p>
        )
    }

    render() {
        return (
            <div>
                <h2>{this.state.categoria.categoria}</h2>
                {this.state.produtos.map(this.renderProdutos)}
            </div>
        )
    }
}