import randomColor from 'random-color'

export default function randomColorHex(): string {
  return randomColor(0.3, 99).hexString()
}