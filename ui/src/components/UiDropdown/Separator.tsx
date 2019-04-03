/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'

const C = {} as any
C.separator = css`
  padding-top: 8px;
  padding-bottom: 8px;
`
C.separatorLine = css`
  height: 1px;
  background: ${s['color-bw-300']};
`

const UiDropdownSeparator: React.SFC<any> = (props) => {
  return (
    <div css={C.separator}>
      <div css={C.separatorLine} />
    </div>
  )
}

export default UiDropdownSeparator