import React from "react";

export default function ProductList({ products = [], onAdd }) {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <button onClick={() => onAdd(product)}>Adicionar</button>
        </div>
      ))}
    </div>
  );
}
