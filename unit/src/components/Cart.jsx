import React, { useState } from "react";

export default function Cart({ applyCoupon }) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleApply = async () => {
    try {
      const result = await applyCoupon(coupon);
      setDiscount(result.discount || 0);
    } catch (error) {
      console.error("Erro ao aplicar cupom:", error);
      setDiscount(0);
    }
  };

  return (
    <div>
      <p>Desconto: R$ {discount},00</p>
      <input
        type="text"
        placeholder="Cupom"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        aria-label="Código do cupom"
      />
      <button onClick={handleApply}>Aplicar Cupom</button>
    </div>
  );
}
