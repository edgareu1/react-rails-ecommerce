export default function displayPrice(price) {
  return `${(Number(price) / 100).toFixed(2)} €`;
}
