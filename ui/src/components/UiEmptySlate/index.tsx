/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'

const C = {} as any
C.container = css`
  padding-top: 64px;
  padding-bottom: 64px;
  margin: 0 auto;
  text-align: center;
`
C.img = css`
  width: 240px;
  margin-bottom: 32px;
`
C.title = css`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: ${s['font-size-title']};
`
C.text = css`
  margin: 0;
  font-size: 24px;
  color: ${s['color-bw-700']};

  &:not(:last-child) {
    margin-bottom: 24px;
  }
`

interface Props {
  img: string
  heading: string
  text: string
  action?: React.ReactElement<any>
}

function UiEmptySlate(props: Props) {
  return (
    <div css={C.container}>
      <img src={props.img} css={C.img} />
      <h4 css={C.title}>{props.heading}</h4>
      <p css={C.text}>{props.text}</p>
      {props.action}
    </div>
  )
}

export default UiEmptySlate