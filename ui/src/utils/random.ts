/**
 * @source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export default function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}