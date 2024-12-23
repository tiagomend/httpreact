# Projeto de Estudo: JSON Server com React

## 📚 **Sobre o Projeto**

Este projeto tem como objetivo estudar a integração entre um **JSON Server** e uma aplicação **React** para gerenciar dados de forma dinâmica. O projeto inclui conceitos como hooks personalizados, gerenciamento de estado, tratamento de erros e carregamento dinâmico de dados.

---

## 🚀 **1. Criando o Projeto com JSON Server**

### **a) Criar o projeto**

```bash
npm create vite@latest httpreact
cd httpreact
npm install
```

### **b) Abrir o VSCode**

```bash
code .
```

### **c) Instalar JSON Server**

```bash
npm i json-server
```

### **d) Estrutura de Dados**

Crie uma pasta chamada `data` dentro de `src` e adicione um arquivo `db.json`:

```json
{
  "products": []
}
```

### **e) Script no package.json**

Adicione o seguinte script:

```json
"server": "json-server --watch src/data/db.json"
```

Inicie o servidor com:

```bash
npm run server
```

---

## ⚛️ **2. A Importância do useEffect**

- Executado apenas uma vez quando o array de dependências está vazio (`[]`).
- Executa novamente quando há alteração nas dependências especificadas.

```jsx
useEffect(
  () => {
    console.log("Componente montado ou dependências alteradas");
  },
  [
    /* dependências */
  ]
);
```

---

## 📥 **3. Resgatando Dados com React**

- **Local para salvar dados:** useState
- **Requisição assíncrona:** Fetch API

```jsx
const [products, setProducts] = useState([]);
useEffect(() => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => setProducts(data));
}, []);
```

---

## ➕ **4. Adicionando Dados da API**

Envie dados para o servidor usando `POST`.

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const product = { name, price };
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};
```

---

## 🔄 **5. Carregamento de Dados Dinâmico**

Os dados são atualizados dinamicamente sempre que há alterações.

---

## 🛠️ **6. Custom Hook para Resgate de Dados**

No arquivo `hooks/useFetch.js`, criamos um hook personalizado:

```jsx
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError("Erro ao carregar dados");
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
```

---

## ⏳ **7. Estado de Loading**

Indica se os dados ainda estão sendo carregados.

```jsx
{
  loading && <p>Carregando...</p>;
}
```

---

## ❗ **8. Tratando Erros**

Mostra uma mensagem de erro caso a requisição falhe.

```jsx
{
  error && <p>{error}</p>;
}
```

---

## 📝 **Estrutura Final do Projeto**

```
/src
├── data
│   └── db.json
├── hooks
│   └── useFetch.js
├── App.jsx
├── main.jsx
├── index.css
└── App.css
```

---

## ▶️ **Rodando o Projeto**

1. Inicie o servidor JSON:

```bash
npm run server
```

2. Inicie o projeto React:

```bash
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) no navegador.

---

## 🧑‍💻 **Autor**

Desenvolvido para fins de estudo e prática com React e JSON Server.

**Happy Coding! 🚀**
