import s from '~/styles'
import { css } from '@emotion/core'

const C = {} as any

C.alert = css`
  text-align: center;
  padding: 16px 8px;
  background: ${s['color-bw-100']};
  border: 1px solid ${s['color-bw-300']};
  border-radius: ${s['border-radius']}px;
  margin-bottom: 32px;
`

C.icon = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0 auto;
  margin-bottom: 16px;
  height: 24px;
  width: 24px;
  color: ${s['color-bw-100']};
  border-radius: 50%;
`

C.iconIsInfo = css`
  color: ${s['color-blue-200']};
  background: ${s['color-blue-400']};
`

C.iconIsSuccess = css`
  color: ${s['color-green-200']};
  background: ${s['color-green-500']};
`

C.iconIsWarning = css`
  background: ${s['color-red-500']};
`

C.text = css`
  margin: 0;
  margin-top: 4px;
  width: 100%;
  line-height: 1.5;
  font-size: 12px;
`

export default C