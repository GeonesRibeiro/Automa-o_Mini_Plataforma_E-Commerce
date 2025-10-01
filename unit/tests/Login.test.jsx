import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../src/components/Login";

test("preenche e submete formulário de login chamando onLogin com usuário válido", async () => {
  const users = [
    {
      id: 1,
      email: "admin@test.com",
      password: "admin123",
      name: "Admin User",
    },
    {
      id: 2,
      email: "user@test.com",
      password: "user123",
      name: "Regular User",
    },
  ];

  const onLogin = jest.fn(async ({ email, password }) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    return user || null;
  });

  render(<Login onLogin={onLogin} />);

  await userEvent.type(screen.getByLabelText(/Email/i), "user@test.com");
  await userEvent.type(screen.getByLabelText(/Senha/i), "user123");
  await userEvent.click(screen.getByRole("button", { name: /Entrar/i }));

  expect(onLogin).toHaveBeenCalledWith({
    email: "user@test.com",
    password: "user123",
  });
});
