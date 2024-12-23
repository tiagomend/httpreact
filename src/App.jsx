/**
 * @file App.js
 * @description Componente principal do aplicativo que exibe uma lista de produtos,
 * permite adicionar novos produtos e remover produtos existentes.
 * @module App
 */

import "./App.css";
import { useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

/**
 * Componente principal da aplicação.
 *
 * @returns {JSX.Element} Retorna o componente principal da aplicação.
 */
function App() {
  /**
   * Estado para armazenar a lista de produtos.
   * @type {Array<{id: number, name: string, price: number}>}
   */
  const [products, setProducts] = useState([]);

  /**
   * Estado para armazenar o nome do produto a ser adicionado.
   * @type {string}
   */
  const [name, setName] = useState("");

  /**
   * Estado para armazenar o preço do produto a ser adicionado.
   * @type {string}
   */
  const [price, setPrice] = useState("");

  /**
   * Hook personalizado para buscar dados da API.
   * @typedef {Object} UseFetchResult
   * @property {Array} data - Dados retornados da API.
   * @property {Function} httpConfig - Função para fazer requisições HTTP.
   * @property {boolean} loading - Indica se a requisição está em andamento.
   * @property {string|null} error - Mensagem de erro, se houver.
   */
  const { data: items, httpConfig, loading, error } = useFetch(url);

  /**
   * Atualiza a lista de produtos quando os itens buscados mudam.
   * @function
   * @name useEffect
   */
  useEffect(() => {
    setProducts(items);
  }, [items]);

  /**
   * Manipula o envio do formulário para adicionar um novo produto.
   * @function
   * @param {React.FormEvent} e - Evento de envio do formulário.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
    };

    httpConfig(product, "POST");
    setName("");
    setPrice("");
  };

  /**
   * Manipula a remoção de um produto.
   * @function
   * @param {number} id - ID do produto a ser removido.
   */
  const handleRemoveProduct = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {loading && !error && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!loading && (
        <ul>
          {products &&
            products.map((product) => (
              <li key={product.id}>
                {product.name} - R$: {product.price}
                <button onClick={() => handleRemoveProduct(product.id)}>
                  remove
                </button>
              </li>
            ))}
        </ul>
      )}

      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Enviar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
