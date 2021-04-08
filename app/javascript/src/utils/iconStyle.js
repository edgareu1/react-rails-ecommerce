export default function iconStyle(starSymbol) {
  const star = `
    &:after {
      font-family: FontAwesome;
      content: "\f${starSymbol}";
    }
  `

  return star;
}
