import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../src/components/Cart";

test("aplica cupom via prop applyCoupon e exibe novos valores", async () => {
  const applyCoupon = jest.fn(async (code) => {
    const coupons = [
      { code: "WELCOME10", discount: 10, type: "percentage", active: true },
      { code: "SAVE20", discount: 20, type: "percentage", active: true },
      { code: "FIXED50", discount: 50, type: "fixed", active: true },
      { code: "EXPIRED", discount: 15, type: "percentage", active: false },
    ];
    const coupon = coupons.find(c => c.code === code && c.active);
    return coupon ? { discount: coupon.discount } : { discount: 0 };
  });

  render(<Cart items={[]} total={200} applyCoupon={applyCoupon} />);

  await userEvent.type(screen.getByLabelText(/Código do cupom/i), "FIXED50");
  await userEvent.click(screen.getByRole("button", { name: /Aplicar Cupom/i }));

  expect(applyCoupon).toHaveBeenCalledWith("FIXED50");

  expect(await screen.findByText("Desconto: R$50.00")).toBeInTheDocument();
  expect(screen.getByText("Total com desconto: R$150.00")).toBeInTheDocument();
});
