import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

const apis = {
    loadCategorias: () => api.get('categorias'),
    deleteCategoria: (id) => api.delete('categorias/'+id),
    createCategoria: (categoria) => api.post('categorias', categoria),
    editCategoria: (categoria) => api.put('categorias/'+categoria.id, categoria),

    deleteProduto: (id) => api.delete('produtos/'+id),
    createProduto: (produto) => api.post('produtos', produto),
    editProduto: (produto) => api.put('produtos/'+produto.id, produto)
}

export default apis