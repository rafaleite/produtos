import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
        categorias: [],
        produtos: [],
        categoria: null
    }

    this.loadCategorias = this.loadCategorias.bind(this)
    this.deleteCategoria = this.deleteCategoria.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
    this.loadCategoriaById = this.loadCategoriaById.bind(this)

    this.createProduto = this.createProduto.bind(this)
    this.loadProdutosByCategoria = this.loadProdutosByCategoria.bind(this)
    this.deleteProduto = this.deleteProduto.bind(this)
    this.loadProdutoById = this.loadProdutoById.bind(this)
    this.editProduto = this.editProduto.bind(this)
  }

  loadCategorias() {
    this.props.api.loadCategorias()
        .then(res => {
            this.setState({
                categorias: res.data
            })
        })
  }

  loadCategoriaById(id) {
    this.props.api.loadCategoriaById(id)
      .then( res => {
        this.setState({
          categoria: res.data
        })
      })
  }

  loadProdutosByCategoria(catId) {
    this.props.api.loadProdutosByCategoria(catId)
      .then( res => {
        this.setState({
          produtos: res.data
        })
      })
  }

  deleteCategoria(cat) {
      this.props.api.deleteCategoria(cat.id)
          .then(res => {
              this.loadCategorias()
          })
  }

  createCategoria(categoria) {
     this.props.api.createCategoria(categoria)
        .then(res => {
            this.loadCategorias()
        })
  }

   editCategoria(categoria) {
     this.props.api.editCategoria(categoria)
        .then(res => {
            this.loadCategorias()
        })
  }

  createProduto(produto) {
     return this.props.api.createProduto(produto)
  }

  deleteProduto(id) {
    return this.props.api.deleteProduto(id)
  }

  loadProdutoById(id) {
    return this.props.api.loadProdutoById(id)
  }

  editProduto(produto) {
    return this.props.api.editProduto(produto)
  }

  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <Link to='/' className="navbar-brand">
                Gerenciador de Produtos
              </Link>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/produtos">Produtos</Link></li>
              <li><Link to="/sobre">Sobre</Link></li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <Route exact path='/' component={Home} />
          <Route exact path='/sobre' component={Sobre} />
          <Route path='/produtos' render={(props) => {
                return (<Produtos {...props} 
                    loadCategorias={this.loadCategorias}
                    categorias={this.state.categorias}
                    deleteCategoria={this.deleteCategoria}
                    createCategoria={this.createCategoria}
                    editCategoria={this.editCategoria}
                    createProduto={this.createProduto}
                    loadCategoriaById={this.loadCategoriaById}
                    categoria={this.state.categoria}
                    loadProdutosByCategoria={this.loadProdutosByCategoria}
                    produtos={this.state.produtos}
                    deleteProduto={this.deleteProduto}
                    editProduto={this.editProduto}
                    loadProdutoById={this.loadProdutoById}
                     /> )
              }
          }/>

        </div>
      </div>
      </Router>
    )
  }
}

export default App
