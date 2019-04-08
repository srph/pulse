/** @jsx jsx */
import * as React from 'react'
import { jsx, css, keyframes } from '@emotion/core'
import s from '~/styles'

const C = {} as any
C.animation = keyframes`
  0% {
    opacity: .6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .6;
  }
`
C.block = css`
  background: ${s['color-bw-300']};
  animation-name: ${C.animation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`
C.blockIsDarker = css`
  background: ${s['color-bw-700']};
`
C.blockIsRounded = css`
  border-radius: ${s['border-radius']}px;
`
C.blockIsCircle = css`
  border-radius: 50%;
`

interface Props {
  shape?: 'solid' | 'rounded' | 'circle'
  darker?: boolean
  height?: string | number
  width?: string | number
  children?: React.ReactNode
}

function UiPlaceholderBlock(props: Props) {
  return (
    <div css={[
      C.block,
      props.shape === 'rounded' && C.blockIsRounded,
      props.shape === 'circle' && C.blockIsCircle,
      props.darker && C.blockIsDarker,
    ]} style={{
      height: props.height,
      width: props.width
    }}>
      {props.children}
    </div>
  )
}

UiPlaceholderBlock.defaultProps = {
  shape: 'solid',
  darker: false,
  height: '100%',
  width: '100%'
}

export default UiPlaceholderBlock