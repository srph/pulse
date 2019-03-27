/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '/styles'
import { Link } from 'react-router-dom'

const UiDropdownLink: React.SFC<any> = (props) => {
  return (
    <Link {...props} css={css`
      display: block;
      padding: 8px;
      color: ${s['color-text']};
      text-decoration: none;
    
      &:hover {
        background: ${s['color-bw-300']};
      }
    `} />
  )
}

export default UiDropdownLink