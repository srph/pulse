/** @jsx jsx */
import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { jsx, css } from '@emotion/core'
import s from '~/styles'

type Props = LinkProps & {
  icon?: string
}

const UiDropdownLink: React.SFC<Props> = (props) => {
  return (
    <Link {...props} css={css`
      display: block;
      padding: 12px;
      color: ${s['color-text']};
      text-decoration: none;

      &:not(:last-child) {
        border-bottom: 1px solid ${s['color-bw-300']};
      }
    
      &:hover {
        background: ${s['color-bw-200']};
      }
    `}>
      {props.icon && (
        <span css={css`
          width: 16px;
          margin-right: 16px;
          color: ${s['color-blue-500']};
        `}>
          <i className={props.icon} />
        </span>
      )}
      {props.children}
    </Link>
  )
}

export default UiDropdownLink