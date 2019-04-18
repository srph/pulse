import * as React from 'react'

function UiButtonAction({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ textAlign: 'right' }}>{children}</div>
  )
}

export default UiButtonAction