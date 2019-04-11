/** @jsx jsx */
import * as React from 'react'
import { jsx, css, keyframes } from '@emotion/core'

const kf = keyframes`
  0% {
    transform: translateY(-8px);
    opacity: 0;
  }

  50% {
    transform: translateY(0);
    opacity: 0.8;
  }

  100% {
    opacity: 1;
  }
`

const cls = css`
  animation-name: ${kf};
  animation-duration: 200ms;
  animation-iteration-count: 1;
`

interface Props {
  children: React.ReactNode
}

class UiTransitionFadeIn extends React.Component<Props, {}> {
  render() {
    return (
      <div css={cls}>
        {this.props.children}
      </div>
    )
  }
}

export default UiTransitionFadeIn