/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function UiPlainButton(props: Props) {
  return (
    <button {...props} css={css`
      display: inline-block;
      height: auto;
      padding: 0;
      background: transparent;
      border: 0;
      outline: 0;
      cursor: pointer;
    `} />
  )
}