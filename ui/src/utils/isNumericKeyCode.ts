const NUMERIC_0 = 48
const NUMERIC_9 = 57

/**
 * Check if the pressed key (evt.keyCode) is a numeric key
 */
export default function isNumericKeyCode(key: number): boolean {
  return key >= NUMERIC_0 && key <= NUMERIC_9
}