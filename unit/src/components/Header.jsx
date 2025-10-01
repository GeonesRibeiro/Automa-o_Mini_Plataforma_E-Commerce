import React from "react";

export default function Header({ cartCount = 0, total = 0 }) {
  const formatCurrency = (value) =>
    `R$ ${value.toFixed(2).replace(".", ",")}`;

  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h1>BIX Mini E-commerce</h1>
      <div>
        <p>Carrinho: {cartCount} itens</p>
        <p>Total: {formatCurrency(total)}</p>
      </div>
    </header>
  );
}
