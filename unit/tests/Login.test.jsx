// unit/components/Login.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../src/components/Login";

test("preenche e submete formulário de login chamando onLogin", async () => {
  const onLogin = jest.fn();
  render(<Login onLogin={onLogin} />);

  await userEvent.type(screen.getByLabelText(/Email/i), "user@test.com");
  await userEvent.type(screen.getByLabelText(/Senha/i), "user123");
  await userEvent.click(screen.getByRole("button", { name: /Entrar/i }));

  expect(onLogin).toHaveBeenCalled();
});
