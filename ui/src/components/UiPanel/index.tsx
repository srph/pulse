/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'

interface Props {
  children: React.ReactNode
}

function UiPanel(props: Props) {
  return (
    <div
      css={css`
        padding: 16px;
        background: ${s['color-bw-100']};
        border-radius: ${s['border-radius']}px;
        border: 1px solid ${s['color-bw-300']};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      `}>
      {props.children}
    </div>
  )
}

export default UiPanel
