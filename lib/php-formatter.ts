let PHPeso = new Intl.NumberFormat("en-US");

export const usePhpPeso = (number: any) => {
  return PHPeso.format(Number(number));
};
