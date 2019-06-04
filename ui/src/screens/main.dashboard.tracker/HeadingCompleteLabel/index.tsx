/** @jsx jsx */
import * as React from 'react'
import s from '~/styles'
import { jsx, css } from '@emotion/core'
import UiTooltip from '~/components/UiTooltip'

const C = {} as any
C.alert = css`
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 12px;
  color: ${s['color-bw-100']};
  background: ${s['color-green-500']};
  border-radius: ${s['border-radius']}px;
`
C.icon = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  margin-right: 8px;
  background: ${s['color-green-700']};
  border-radius: 50%;
`

function HeadingCompleteLabel() {
  return (
    <div css={C.alert}>
      <span css={C.icon}>
        ✨
      </span>

      2019 was a good year. Keep it up!
    </div>
  )
}

export default HeadingCompleteLabel