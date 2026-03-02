"use client";

interface InputCPFProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function InputCPF({
  value,
  onChange,
  className
}: InputCPFProps) {

  function formatCPF(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    onChange(formatted);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={value}
      onChange={handleChange}
      placeholder="000.000.000-00"
      className={className}
    />
  );
}