// unit/components/Header.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../src/components/Header";



test("renderiza título e carrinho zerado", () => {
  render(<Header cartCount={0} total={0} />);
  expect(screen.getByText(/BIX Mini E-commerce/i)).toBeInTheDocument();
  expect(screen.getByText(/Carrinho: 0 itens/i)).toBeInTheDocument();
  expect(screen.getByText(/Total: R\$ 0,00/i)).toBeInTheDocument();
});
