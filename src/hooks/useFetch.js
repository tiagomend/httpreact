/**
 * @file useFetch.js
 * @description Hook personalizado para realizar operações de fetch (GET, POST, DELETE) em uma API.
 * @module useFetch
 */

import { useState, useEffect } from "react";

/**
 * Hook personalizado para realizar requisições HTTP.
 * 
 * @param {string} url - A URL base para as requisições HTTP.
 * @returns {Object} Retorna um objeto contendo dados, função de configuração HTTP, estado de carregamento e erros.
 * @property {Array|Object|null} data - Dados retornados pela requisição.
 * @property {Function} httpConfig - Função para configurar e disparar requisições HTTP (POST ou DELETE).
 * @property {boolean} loading - Indica se a requisição está em andamento.
 * @property {string|null} error - Mensagem de erro, se houver.
 */
export const useFetch = (url) => {
  /**
   * Estado para armazenar os dados retornados da API.
   * @type {Array|Object|null}
   */
  const [data, setData] = useState(null);

  /**
   * Estado para armazenar as configurações da requisição HTTP.
   * @type {Object|null}
   */
  const [config, setConfig] = useState(null);

  /**
   * Estado para armazenar o método HTTP (POST ou DELETE).
   * @type {string|null}
   */
  const [method, setMethod] = useState(null);

  /**
   * Estado para armazenar os dados retornados após uma chamada de API.
   * @type {Array|Object|null}
   */
  const [callFetch, setCallFetch] = useState(null);

  /**
   * Estado para indicar se uma requisição está em andamento.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  /**
   * Estado para armazenar mensagens de erro.
   * @type {string|null}
   */
  const [error, setError] = useState(null);

  /**
   * Estado para armazenar o ID do item em operações DELETE.
   * @type {string|number|null}
   */
  const [itemId, setItemId] = useState(null);

  /**
   * Função para configurar a requisição HTTP.
   * 
   * @param {Object|string|number} data - Dados a serem enviados (para POST) ou o ID do item (para DELETE).
   * @param {string} method - Método HTTP a ser utilizado (POST ou DELETE).
   */
  const httpConfig = (data, method) => {
    if (method === 'POST') {
      setConfig({
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    } else if (method === 'DELETE') {
      setConfig({
        method
      });
      setItemId(data);
    }
    setMethod(method);
  };

  /**
   * Efeito para buscar dados iniciais da API (GET).
   * @function
   * @name useEffect
   * @memberof useFetch
   */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error(error.message);
        setError("Houve algum erro ao carregar os dados!");
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };
    fetchData();
  }, [url, callFetch]);

  /**
   * Efeito para executar requisições HTTP (POST ou DELETE) com base nas configurações.
   * @function
   * @name useEffect
   * @memberof useFetch
   */
  useEffect(() => {
    const httpRequest = async () => {
      if (method === 'POST') {
        const fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        const json = await res.json();
        setCallFetch(json);
      } else if (method === 'DELETE') {
        const urlDelete = `${url}/${itemId}`;
        const fetchOptions = [urlDelete, config];
        const res = await fetch(...fetchOptions);
        const json = await res.json();
        setCallFetch(json);
      }
    };
    if (method) {
      httpRequest();
    }
  }, [config, method, url, itemId]);

  return { data, httpConfig, loading, error };
};
