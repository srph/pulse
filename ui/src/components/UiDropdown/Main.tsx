import * as React from 'react'

function SlotMain(props: ComponentSlotProps) {
  // This won't be rendered into the DOM.
  // Anyway, for some reason, the slots get messed up
  // whenever we return `null` instead of something else
  return <div />
}

export default SlotMain