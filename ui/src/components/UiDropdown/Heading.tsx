/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '/styles'

const C = {} as any
C.heading = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${s['color-bw-200']};
`
C.headingText = css`
  margin: 0;
  text-transform: uppercase;
  color: ${s['color-bw-700']};
`
C.headingIcon = css`
  display: inline-block;
  padding: 0;
  color: ${s['color-bw-700']};
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
`

interface Props {
  text: string
}

const UiDropdownHeading: React.SFC<Props> = (props) => {
  return (
    <div css={C.heading}>
      <h5 css={C.headingText}>
        {props.text}
      </h5>

      <button type="button" css={C.headingIcon}>
        <i className='fa fa-close' />
      </button>
    </div>
  )
}

export default UiDropdownHeading