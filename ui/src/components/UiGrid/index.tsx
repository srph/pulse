/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'

interface Props {
  children: React.ReactNode
}

function UiGrid(props: Props) {
  return (
    <div
      css={css`
        display: flex;
      `}>
      {props.children}
    </div>
  )
}

interface ColumnProps {
  size: number
  children: React.ReactNode
}

UiGrid.Column = function UiGridColumn(props: ColumnProps) {
  return (
    <div
      css={css`
        width: ${(props.size / 12) * 100}%;
      `}>
      {props.children}
    </div>
  )
}

export default UiGrid
