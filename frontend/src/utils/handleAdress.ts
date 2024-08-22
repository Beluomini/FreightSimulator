export function handleAdress(
  address: string,
  number1: string,
  neighborhood1: string,
  city1: string,
  state1: string,
  cep1: string,
  country1: string,
) {
  let addressStr =
    address +
    "%2C%20" +
    number1 +
    "%2C%20" +
    neighborhood1 +
    "%2C%20" +
    city1 +
    "%2C%20" +
    state1 +
    "%2C%20" +
    cep1 +
    "%2C%20" +
    country1;

  // troca espaços por %20, virgulas por %2C, remove acentos e caracteres especiais
  const processAddressStr = addressStr
    .replaceAll(" ", "%20")
    .replaceAll(",", "%2C")
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "");
  return processAddressStr;
}
