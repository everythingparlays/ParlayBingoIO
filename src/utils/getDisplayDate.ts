export default function getDisplayDate(d: string): string {
  const split = d.split('/')
  if(split.length != 2) return 'INVALID DATE'

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const monthNumber = parseInt(split[0]) - 1
  return `${MONTHS[monthNumber]} ${split[1]}`
}