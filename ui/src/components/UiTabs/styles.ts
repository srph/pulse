import { css } from '@emotion/core'
import s from '~/styles'

const C = {} as any
C.tabs = css`
  display: flex;
  border-bottom: 1px solid ${s['color-bw-400']};
`
C.link = css`
  padding: 16px 0;
  color: ${s['color-text']};
  border-bottom: 2px solid transparent;
  text-decoration: none;
  transition: 200ms all ease;
  margin-bottom: -2px;
  font-weight: 600;

  &:hover {
    border-bottom-color: ${s['color-bw-600']};
  }

  &:not(:last-child) {
    margin-right: 24px;
  }

  &.-active {
    border-bottom-color: ${s['color-blue-400']};
  }
`
C.icon = css`
  margin-right: 8px;
  color: ${s['color-bw-600']};
`

export default C