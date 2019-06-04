/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'

const C = {} as any
C.container = css`
  display: flex;
  padding-top: 36px;
  padding-bottom: 36px;
  border-bottom: 1px solid ${s['color-bw-300']};
`
C.section = css`
  flex-shrink: 0;
  width: 360px;
  margin-right: 80px;
`
C.form = css`
  width: 400px;
`
C.formIsFullWidth = css`
  width: 100%;
`
C.heading = css`
  margin: 0;
  margin-bottom: 8px;
  font-size: 16px;
  color: ${s['color-bw-700']};
`
C.headingIsDangerous = css`
  color: ${s['color-red-500']};
`
C.tagline = css`
  line-height: 1.5;
  margin: 0;

  a {
    color: ${s['color-text']};
    text-decoration: none;
    border-bottom: 1px dashed ${s['color-bw-500']};
  }
`

interface Props {
  isDangerous?: boolean
  isFullWidth?: boolean
  heading: string
  tagline: React.ReactNode
  children?: React.ReactNode
}

function UiFieldGroup(props: Props) {
  return (
    <div css={C.container}>
      <div css={C.section}>
        <h4 css={[C.heading, props.isDangerous && C.headingIsDangerous]}>{props.heading}</h4>
        <p css={C.tagline}>{props.tagline}</p>
      </div>

      <div css={[C.form, props.isFullWidth && C.formIsFullWidth]}>
        {props.children}
      </div>
    </div>
  )
}

export default UiFieldGroup