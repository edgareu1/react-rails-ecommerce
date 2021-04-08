export default function iconStyle(iconSymbol) {
  const icon = `
    &:after {
      font-family: FontAwesome;
      content: "\f${iconSymbol}";
    }
  `

  return icon;
}
