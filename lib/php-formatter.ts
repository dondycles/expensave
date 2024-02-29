let PHPeso = new Intl.NumberFormat("en-US");

export const usePhpPeso = (number: number) => {
  return PHPeso.format(number);
};
