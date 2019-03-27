/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '/styles'

const C = {} as any
C.input = css`
  display: block;
  width: 100%;
  padding: 0 8px;
  height: 40px;
  line-height: 39px;
  background: ${s['color-bw-100']};
  color: ${s['color-text']};
  border: 1px solid ${s['color-bw-300']};
  border-radius: ${s['border-radius']}px;
  outline: 0;
  transition: 200ms box-shadow ease;

  &:focus {
    border-color: ${s['color-blue-400']};
    box-shadow: 0 0 0 3px ${s['color-blue-300']};
  }

  ::placeholder {
    color: ${s['color-bw-600']};
  }

  &[readonly] {
    background: ${s['color-bw-200']};
  }
`
C.inputSmall = css`
  padding: 8px;
  height: 32px;
  line-height: 31px;

  &:focus {
    box-shadow: 0 0 0 1px ${s['color-dark-silver']};
  }
`

interface OwnProps {
  size?: 'sm' | 'md' | 'lg'
}

export type UiInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & OwnProps

export default class UiInput extends React.Component<UiInputProps> {
  static defaultProps = {
    size: 'md'
  }

  render() {
    const { size, ...inputProps } = this.props

    return <input {...inputProps} css={[C.input, size === 'sm' && C.inputSmall]} />
  }
}
