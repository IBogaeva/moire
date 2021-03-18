export default function numberFormat(value) {
  if (typeof value !== 'number') {
    return value;
  }
  return new Intl.NumberFormat().format(value);
}
