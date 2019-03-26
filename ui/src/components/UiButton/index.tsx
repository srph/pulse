import * as React from 'react'
import styled, { css } from 'styled-components'
import s from '../../styles'
import { Link } from 'react-router-dom'

const ui = {} as any
ui.Button = styled(({ isLink, ...props }: any) => (isLink ? <Link {...props} /> : <button {...props} />))`
  display: inline-flex;
  align-items: center;
  height: 26px;
  line-height: 25px;
  padding: 0 12px;
  font-weight: 600;
  font-family: ${s['font-family-heading']};
  font-size: 10px;
  text-transform: uppercase;
  color: ${s['color-white']};
  background: ${s['color-dirty-blue']};
  border: 0;
  border-radius: ${s['border-radius']}px;
  box-shadow: ${s['drop-shadow']};
  cursor: pointer;
  transform: translateY(0);
  transition: 200ms cubic-bezier(.06,.67,.37,.99) all;
  outline: 0;
  text-decoration: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props: IUiButtonProps) =>
    props.preset !== 'clear' &&
    css`
      &:not(:disabled):hover,
      :focus {
        transform: translateY(-4px);
        box-shadow: ${s['drop-shadow-lower']};
      }
    `}

  ${(props: IUiButtonProps) =>
    props.preset === 'clear' &&
    css`
      border: 0;
      color: ${s['color-dirty-blue']};
      box-shadow: initial;
      background: transparent;
    `}

    ${(props: IUiButtonProps) =>
      props.preset === 'clear-white' &&
      css`
        border: 0;
        color: ${s['color-white']};
        box-shadow: initial;
        background: transparent;
      `}

  ${(props: IUiButtonProps) =>
    props.preset === 'default' &&
    css`
      color: ${s['color-dirty-blue']};
      background: transparent;
      border: 1px solid ${s['color-silver']};
    `}

    ${(props: IUiButtonProps) =>
      props.preset === 'default-danger' &&
      css`
        color: ${s['color-red']};
        background: transparent;
        border: 1px solid ${s['color-silver']};
      `}

  ${(props: IUiButtonProps) =>
    props.preset === 'primary' &&
    css`
      color: ${s['color-white']};
      background: ${s['color-lavender']};
    `}

  ${(props: IUiButtonProps) =>
    props.isBlock &&
    css`
      display: block;
      width: 100%;
    `}

  ${(props: IUiButtonProps) =>
    props.size === 'md' &&
    css`
      height: 40px;
      line-height: 39px;
    `}
`
ui.LeftIcon = styled.div`
  margin-right: 16px;
`
ui.RightIcon = styled.div`
  margin-left: 16px;
`

export interface IUiButtonProps {
  preset?: 'clear' | 'primary' | 'default' | 'default-danger' | 'clear-white'
  isBlock?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  isLink?: boolean
  to?: string
  onClick?: (evt: Event) => void
  type?: 'submit' | 'button',
  children: React.ReactNode
}

const UiButton: React.SFC<IUiButtonProps> & { LeftIcon?: any, RightIcon?: any } = (props) => {
  return <ui.Button {...props} />
}

UiButton.defaultProps = {
  preset: 'clear',
  size: 'sm',
  isLink: false
}

UiButton.LeftIcon = ui.LeftIcon
UiButton.RightIcon = ui.RightIcon

export default UiButton
