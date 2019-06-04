/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import UiContainer from '~/components/UiContainer'

const C = {} as any
C.heading = css`
  margin-bottom: 24px;
  padding-top: 24px;
  padding-bottom: 24px;
  background: ${s['color-bw-200']};
  border-bottom: 1px solid ${s['color-bw-300']};
`
C.title = css`
  margin: 0;
  color: ${s['color-bw-700']};
  font-size: ${s['font-size-title']}px;
`
C.container = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

interface Props {
  title: string
  action?: React.ReactNode
}

function UiPageHeading(props: Props) {
  return (
    <div css={C.heading}>
      <UiContainer size="lg">
        <div css={C.container}>
          <h4 css={C.title}>{props.title}</h4>
          {props.action}
        </div>
      </UiContainer>
    </div>
  )
}

export default UiPageHeading