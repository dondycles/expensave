let PHPeso = new Intl.NumberFormat("en-US");

export const usePhpPeso = (number: any) => {
  return PHPeso.format(Number(number));
};

const formatted = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export const usePhpPesoWSign = (number: any) => {
  return formatted.format(number);
};
