import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await onLogin({ email, password: senha });

      if (!user) {
        setError("Credenciais inválidas");
      } else {
        setError("");
        // Aqui você pode redirecionar ou exibir mensagem de sucesso
      }
    } catch (err) {
      console.error("Erro ao tentar login:", err);
      setError("Erro no servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="senha">Senha</label>
      <input
        id="senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button type="submit">Entrar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
