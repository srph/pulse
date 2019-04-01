/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '/styles'
// import { Link } from 'react-router-dom'

const C = {} as any
C.button = css`
  display: inline-flex;
  align-items: center;
  height: 40px;
  line-height: 39px;
  padding: 0 12px;
  font-weight: 600;
  font-family: ${s['font-family']};
  font-size: ${s['font-size']}px;
  color: ${s['color-white']};
  background: ${s['color-bw-100']};
  border: 1px solid ${s['color-bw-300']};
  border-radius: ${s['border-radius']}px;
  box-shadow: ${s['drop-shadow']};
  cursor: pointer;
  transform: translateY(0);
  transition: 200ms cubic-bezier(.06,.67,.37,.99) all;
  outline: 0;
  text-decoration: none;

  &:focus {
    border-color: ${s['color-blue-400']};
    box-shadow: 0 0 0 3px ${s['color-blue-300']};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
C.buttonIsPrimary = css`
  color: ${s['color-bw-100']};
  background: ${s['color-blue-500']};
  border: 0;

  &:hover {
    background: ${s['color-blue-600']};
  }
`
C.buttonIsDefaultDanger = css`
  color: red;
`
C.buttonIsDanger = css`
  color: ${s['color-bw-100']};
  background: red;
  border: 0;
`
C.buttonIsBlock = css`
  display: block;
  width: 100%;
`
C.buttonIsSm = css`
  font-size: ${s['font-size-subtitle']}px;
  height: 32px;
  line-height: 31px;
`
C.leftIcon = css`
  margin-right: 16px;
`
C.rightIcon = css`
  margin-left: 16px;
`

const UiButtonLeftIcon: React.SFC = (props) => {
  return <div css={css`margin-right: 16px;`}>{props.children}</div>
}

const UiButtonRightIcon: React.SFC = (props) => {
  return <div css={css`margin-left: 16px;`}>{props.children}</div>
}

export type UiButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  preset?: 'default' | 'primary' | 'default-danger' | 'danger'
  isBlock?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const UiButton: React.SFC<UiButtonProps> & { LeftIcon?: any, RightIcon?: any } = (props) => {
  const {preset, isBlock, size, ...buttonProps} = props

  return <button {...buttonProps} css={[
    C.button,
    preset === 'primary' && C.buttonIsPrimary,
    preset === 'default-danger' && C.buttonIsDefaultDanger,
    preset === 'danger' && C.buttonIsDanger,
    isBlock && C.buttonIsBlock,
    size === 'sm' && C.buttonIsSm
  ]}  />
}

UiButton.defaultProps = {
  preset: 'default',
  isBlock: false,
  size: 'sm'
}

UiButton.LeftIcon = UiButtonLeftIcon
UiButton.RightIcon = UiButtonRightIcon

export default UiButton
