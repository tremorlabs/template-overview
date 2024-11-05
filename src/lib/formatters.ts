export const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`
