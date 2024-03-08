const PHPeso = new Intl.NumberFormat("en-US");

export const UsePhpPeso = (number: string | number) => {
  return PHPeso.format(Number(number));
};

const formatted = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export const UsePhpPesoWSign = (number: string | number) => {
  return formatted.format(Number(number));
};
