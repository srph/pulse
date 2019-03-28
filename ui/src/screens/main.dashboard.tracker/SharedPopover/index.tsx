/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'

export default function SharedPopover(props: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        padding: 12px 16px;
        width: 320px;
      `}>
      {props.children}
    </div>
  )
}
