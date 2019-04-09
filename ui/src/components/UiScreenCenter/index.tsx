/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'

type Props = {
  children: React.ReactNode
}

export default function UiPlainButton(props: Props) {
  return (
    <div css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      padding-top: 80px;
      padding-bottom: 80px;
    `}>{props.children}</div>
  )
}