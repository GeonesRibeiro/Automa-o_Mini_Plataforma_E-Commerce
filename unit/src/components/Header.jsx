import React from "react";

export default function Header({ cartCount, total }) {
  return (
    <header>
      <h1>BIX Mini E-commerce</h1>
      <p>Carrinho: {cartCount} itens</p>
      <p>Total: R$ {total.toFixed(2).replace(".", ",")}</p>
    </header>
  );
}
