let PHPeso = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export const usePhpPeso = (number: any) => {
  return PHPeso.format(Number(number));
};
