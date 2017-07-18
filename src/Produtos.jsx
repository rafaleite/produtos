import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'
import ProdutoNovo from './ProdutoNovo'

export default class Produtos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editingCategoria: ''
        }

        this.handleNewCategoria = this.handleNewCategoria.bind(this)
        this.handleEditCategoria = this.handleEditCategoria.bind(this)
        this.renderCategoria = this.renderCategoria.bind(this)
        this.editCategoria = this.editCategoria.bind(this)
        this.cancelEditing = this.cancelEditing.bind(this)
        
    }

    componentDidMount() {
        this.props.loadCategorias()
    }  

    handleNewCategoria(key) {
        if (key.keyCode === 13) {
            this.props.createCategoria({
                categoria: this.refs.categoria.value
            })
            this.refs.categoria.value = ''
        }
    }

    handleEditCategoria(key) {
        if (key.keyCode === 13) {
            this.props.editCategoria({
                id: this.state.editingCategoria,
                categoria: this.refs['inputCat-'+this.state.editingCategoria].value
            })
            this.refs.categoria.value = ''
            this.setState({editingCategoria: ''})
        }
    }

    editCategoria(categoria) {
        this.setState({editingCategoria: categoria.id})
    }

    cancelEditing() {
        this.setState({editingCategoria: ''})
    }

    renderCategoria(cat) {
        return (
            <li key={`cat-${cat.id}`} style={{marginBottom: 5}}>
                {this.state.editingCategoria === cat.id &&
                    <div className='input-group'>
                        <div className='input-group-btn'>
                            <input ref={'inputCat-'+cat.id}
                                className='form-control'
                                onKeyUp={this.handleEditCategoria}
                                defaultValue={cat.categoria}/>

                            <button className='btn  btn-default' onClick={() => this.cancelEditing()}>
                                <span className='glyphicon glyphicon-remove'></span>
                            </button>
                        </div>
                    </div>
                }

                {this.state.editingCategoria !== cat.id &&
                    <div>
                        <button className='btn  btn-default btn-xs' onClick={() => this.props.deleteCategoria(cat)}>
                            <span className='glyphicon glyphicon-trash'></span>
                        </button>

                        <button className='btn btn-xs  btn-default' onClick={() => this.editCategoria(cat)}>
                            <span className='glyphicon glyphicon-pencil'></span>
                        </button>

                        <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
                    </div>
                }
            </li>
        )
    }

    render() {
        const { match, categorias } = this.props
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {categorias.map(this.renderCategoria)}
                    </ul>
                    <div className='well well-sm'>
                        <input ref='categoria'
                            placeholder='Nova Categoria'
                            className='form-control'
                            onKeyUp={this.handleNewCategoria} />
                    </div>
                    <Link to='/produtos/novo'>Novo Produto</Link>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route path={match.url + '/categoria/:catId'} component={Categoria} />
                    <Route path={match.url + '/novo'} render={(props)=> {
                        return (
                            <ProdutoNovo {...props} 
                                categorias={this.props.categorias}
                                createProduto={this.props.createProduto} />
                        )
                    }} />
                </div>
            </div>
        )
    }
}