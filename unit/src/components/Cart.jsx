import React, { useState } from "react";

export default function Cart({ applyCoupon }) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleApply = () => {
    const result = applyCoupon(coupon);
    setDiscount(result.discount);
  };

  return (
    <div>
      <p>Desconto: R$ {discount},00</p>
      <input
        type="text"
        placeholder="Cupom"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />
      <button onClick={handleApply}>Aplicar Cupom</button>
    </div>
  );
}
