/** @jsx jsx */
import * as  React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'

type UiButtonLinkProps = { icon?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>

const UiButtonLink: React.SFC<UiButtonLinkProps> = ({children, icon, ...props}) => {
  return (
    <button {...props} css={css`
      display: inline-block;
      padding: 0;
      color: ${s['color-blue-500']};
      font-size: ${s['font-size-subtitle']}px;
      font-weight: 600;
      text-transform: uppercase;
      background: transparent;
      border: 0;
      outline: 0;
      cursor: pointer;
    `}>
      {Boolean(icon) && (
        <span css={css`margin-right: 8px;`}>
          <i className={icon} />
        </span>
      )}
      {children}
    </button>
  )
}

export default UiButtonLink