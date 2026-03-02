"use client";

import React from "react";

interface DecimalInputProps {
  value: string | number;
  onChange: (value: string) => void;
  decimals: number;
  placeholder?: string;
  className?: string;
}

export default function DecimalInput({
  value,
  onChange,
  decimals,
  placeholder,
  className
}: DecimalInputProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(",", ".");

    const regex = new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`);

    if (regex.test(val)) {
      onChange(val);
    }
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      value={value}
      min="0"
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
}