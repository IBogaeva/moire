import numberFormat from '@/helpers/numberFormat';

export default function deliveryFormat(value) {
  // eslint-disable-next-line radix
  return value > 0 ? `${numberFormat(Number.parseInt(value))} ₽` : 'бесплатно';
}
