/**
 * Check if an element is under an anchor element
 */
export function isDescendantOfAnchor(element) {
  do {
    if (element.tagName === 'A') {
      return true
    }
  } while(element = element.parentNode)

  return false
}