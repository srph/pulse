/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'

const C = {} as any
C.alert = css`
  position: relative;
  padding: 26px 12px;
  padding-left: 48px;
  color: ${s['color-bw-100']};
  border-radius: ${s['border-radius']}px;
  line-height: 1.5;
`
C.alertIsError = css`
  background: ${s['color-red-400']};
`
C.alertIsSuccess = css`
  background: ${s['color-green-500']};
`
C.alertIsWarning = css`
  background: ${s['color-yellow-100']};

  a {
    color: ${s['color-yellow-200']};
    text-decoration: none;
  }
`
C.alertIsCompact = css`
  padding: 12px;
  text-align: center;
`
C.alertIcon = css`
  position: absolute;
  top: 20px;
  left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  user-select: none;
`
C.alertIconIsError = css`
  background: #802c26;
`
C.alertIconIsSuccess = css`
  background: ${s['color-green-900']};
`
C.alertIconIsWarning = css`
  background: ${s['color-yellow-200']};
`

interface Props {
  preset: 'error' | 'success' | 'warning'
  isCompact?: boolean
  children: React.ReactNode
}

function UiAlert(props: Props) {
  let icon: React.ReactNode
  if (props.preset === 'error') {
    icon = <i className="fa fa-times" />
  } else if (props.preset === 'success') {
    icon = <i className="fa fa-check" />
  } else if (props.preset === 'warning') {
    icon = <i className="fa fa-exclamation" />
  }

  return (
    <div
      css={[
        C.alert,
        props.preset === 'error' && C.alertIsError,
        props.preset === 'success' && C.alertIsSuccess,
        props.preset === 'warning' && C.alertIsWarning,
        props.isCompact && C.alertIsCompact
      ]}>
      {!props.isCompact && <div
        css={[
          C.alertIcon,
          props.preset === 'error' && C.alertIconIsError,
          props.preset === 'success' && C.alertIconIsSuccess,
          props.preset === 'warning' && C.alertIconIsWarning
        ]}>
        {icon}
      </div>}
      {props.children}
    </div>
  )
}

UiAlert.defaultProps = {
  isCompact: false
}

export default UiAlert