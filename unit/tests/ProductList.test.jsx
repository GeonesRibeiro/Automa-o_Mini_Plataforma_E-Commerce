import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductList from "../src/components/ProductList";

test("renderiza produtos e chama onAdd ao clicar em Adicionar", async () => {
  const mockProducts = [
    { id: 1, name: "Keyboard", price: 199.9, stock: 13 },
    { id: 2, name: "Mouse", price: 99.5, stock: 23 },
    { id: 3, name: "Headset", price: 299.0, stock: 6 },
  ];

  // Simula o fetch do backend
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockProducts),
    })
  );

  const onAdd = jest.fn();
  render(<ProductList onAdd={onAdd} />);

  // Aguarda os produtos aparecerem
  await waitFor(() => {
    expect(screen.getByText(/Keyboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Mouse/i)).toBeInTheDocument();
    expect(screen.getByText(/Headset/i)).toBeInTheDocument();
  });

  await userEvent.click(screen.getAllByRole("button", { name: /Adicionar/i })[0]);
  expect(onAdd).toHaveBeenCalledWith(mockProducts[0]);
});
