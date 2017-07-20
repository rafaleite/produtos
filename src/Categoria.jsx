import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Categoria extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null
        }

        this.loadData = this.loadData.bind(this)
        this.renderProdutos = this.renderProdutos.bind(this)
    }

    componentWillReceiveProps(newProps) {
      if(newProps.match.params.catId !== this.state.id){
        this.loadData(newProps.match.params.catId)
      }
    }

    componentDidMount() {
        this.loadData(this.props.match.params.catId)
        
    }

    loadData(id){
        this.setState({ id })
        this.props.loadCategoriaById(id)
        this.props.loadProdutosByCategoria(id)
    }

    renderProdutos(produto) {
        return(
            <div className='well' key={`prod-${produto.id}`}>
                {produto.produto}
                <div>
                    <button onClick={ () => {this.props.deleteProduto(produto.id)
                        .then(res => this.loadData(this.props.match.params.catId))
                    }} >Excluir</button>

                    <Link to={`/produtos/editar/${produto.id}`}>Editar</Link>

                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.categoria && 
                    <h2>{this.props.categoria.categoria}</h2>
                }

                { this.props.produtos.length === 0 &&
                    <p className='alert alert-danger'>Nenhum Produto Cadastrado</p>
                }
                {this.props.produtos.map(this.renderProdutos)}
            </div>
        )
    }
}