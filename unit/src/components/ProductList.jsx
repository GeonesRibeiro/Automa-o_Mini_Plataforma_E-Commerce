import React, { useEffect, useState } from "react";

export default function ProductList({ onAdd }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products"); // ou caminho local
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - R${product.price.toFixed(2).replace(".", ",")} <br />
            Estoque: {product.stock} unidades <br />
            <button onClick={() => onAdd(product)}>Adicionar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
