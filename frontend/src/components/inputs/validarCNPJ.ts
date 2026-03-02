function onlyDigits(value: string): string {
  return (value || "").replace(/\D/g, "");
}

export function validarCNPJ(cnpj: string): boolean {
  const v = onlyDigits(cnpj);

  if (v.length !== 14) return false;

  if (/^(\d)\1+$/.test(v)) return false;

  const calcDigito = (base: string, pesos: number[]): number => {
    let soma = 0;

    for (let i = 0; i < pesos.length; i++) {
      soma += Number(base[i]) * pesos[i];
    }

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const base12 = v.slice(0, 12);

  const digito1 = calcDigito(base12, [
    5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
  ]);

  const base13 = base12 + String(digito1);

  const digito2 = calcDigito(base13, [
    6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
  ]);

  const cnpjCalculado = base12 + String(digito1) + String(digito2);

  return v === cnpjCalculado;
}