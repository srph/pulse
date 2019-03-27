/**
 * @source https://stackoverflow.com/a/8027444
 */
export default function isValidHexColor(hex: string) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex)
}