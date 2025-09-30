// unit/components/Cart.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../src/components/Cart";


test("aplica cupom via prop applyCoupon e exibe novos valores", async () => {
  const applyCoupon = jest.fn(() => ({ discount: 50 }));
  render(<Cart items={[]} total={200} applyCoupon={applyCoupon} />);

  await userEvent.type(screen.getByLabelText(/Código do cupom/i), "PROMO50");
  await userEvent.click(screen.getByRole("button", { name: /Aplicar Cupom/i }));
  expect(applyCoupon).toHaveBeenCalledWith("PROMO50");
});
