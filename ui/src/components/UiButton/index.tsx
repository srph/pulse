/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import { Link, LinkProps } from 'react-router-dom'

const C = {} as any
C.button = css`
  display: inline-flex;
  align-items: center;
  height: 40px;
  line-height: 39px;
  padding: 0 12px;
  font-weight: 600;
  color: ${s['color-text']};
  font-family: ${s['font-family']};
  font-size: ${s['font-size']}px;
  color: ${s['color-white']};
  background: ${s['color-bw-100']};
  border: 1px solid ${s['color-bw-300']};
  border-radius: ${s['border-radius']}px;
  box-shadow: ${s['drop-shadow']};
  cursor: pointer;
  transform: translateY(0);
  transition: 200ms cubic-bezier(0.06, 0.67, 0.37, 0.99) all;
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
  height: 32px;
  line-height: 31px;
`
C.icon = css`
  opacity: 0.5;
`
C.leftIcon = css`
  margin-right: 16px;
`
C.rightIcon = css`
  margin-left: 16px;
`

const LeftIcon: React.SFC = props => {
  return <div css={[C.icon, C.leftIcon]}>{props.children}</div>
}

const RightIcon: React.SFC = props => {
  return <div css={[C.icon, C.rightIcon]}>{props.children}</div>
}

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement> | LinkProps

export type UiButtonProps = {
  link?: boolean
  preset?: 'default' | 'primary' | 'default-danger' | 'danger'
  isBlock?: boolean
  size?: 'sm' | 'md' | 'lg'
} & ButtonAttributes

const UiButton: React.SFC<UiButtonProps> & { LeftIcon: any; RightIcon: any } = props => {
  const { preset, isBlock, size, link, ...buttonProps } = props

  const className = [
    C.button,
    preset === 'primary' && C.buttonIsPrimary,
    preset === 'default-danger' && C.buttonIsDefaultDanger,
    preset === 'danger' && C.buttonIsDanger,
    isBlock && C.buttonIsBlock,
    size === 'sm' && C.buttonIsSm
  ]

  return link ? (
    <Link {...buttonProps as LinkProps} css={className} />
  ) : (
    <button {...buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>} css={className} />
  )
}

UiButton.defaultProps = {
  link: false,
  preset: 'default',
  isBlock: false,
  size: 'sm'
}

UiButton.LeftIcon = LeftIcon
UiButton.RightIcon = RightIcon

export default UiButton
