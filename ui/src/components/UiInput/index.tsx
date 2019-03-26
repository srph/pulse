import * as React from 'react'
import styled, { css } from 'styled-components'
import s from '../../styles'

const ui = {} as any
ui.Input = styled.input`
  display: block;
  width: 100%;
  padding: 0 8px;
  height: 40px;
  line-height: 39px;
  background: ${s['color-white']};
  color: ${s['color-dirty-blue']};
  border: 1px solid ${s['color-silver']};
  border-radius: ${s['border-radius']}px;
  outline: 0;
  transition: 200ms box-shadow ease;

  &:focus {
    border-color: ${s['color-blue']};
    box-shadow: 0 0 0 3px ${s['color-blue-light']};
  }

  ::placeholder {
    color: ${s['color-dark-silver']};
  }

  &[readonly] {
    background: ${s['color-light-silver']};
  }

  ${props =>
    props.size === 'sm' &&
    css`
      padding: 8px;
      height: 32px;
      line-height: 31px;

      &:focus {
        box-shadow: 0 0 0 1px ${s['color-dark-silver']};
      }
    `}

  ${props =>
    props.isMultiline &&
    css`
      height: auto;
      padding: 13px;
      line-height: 1.5;
    `}
`

interface OwnProps {
  isMultiline?: boolean
  rows?: number
  size?: 'sm' | 'md' | 'lg'
  autoSelectOnFocus?: boolean
}

export type UiInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & OwnProps

export default class UiInput extends React.Component<UiInputProps> {
  static defaultProps = {
    isMultiline: false,
    size: 'md',
    autoSelectOnFocus: false
  }

  inputNode: HTMLInputElement

  render() {
    const { isMultiline, rows, size, autoSelectOnFocus, ...inputProps } = this.props

    if (isMultiline) {
      return (
        <ui.Input
          {...inputProps}
          ref={c => (this.inputNode = c)}
          as="textarea"
          rows={rows}
          size={size}
          onFocus={this.handleFocus}
          isMultiline
        />
      )
    }

    return <ui.Input {...inputProps} ref={c => (this.inputNode = c)} size={size} onFocus={this.handleFocus} />
  }

  handleFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.autoSelectOnFocus) {
      evt.target.select()
    }

    this.props.onFocus && this.props.onFocus(evt)
  }

  focus() {
    this.inputNode.focus()
  }
}
