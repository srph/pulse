/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '/styles'
import color from 'color'
import randomColorHex from '/utils/randomColorHex'

const C = {} as any
C.wrapper = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background: ${s['color-bw-100']};
  border: 1px solid ${s['color-bw-300']};
  border-radius: ${s['border-radius']}px;
  outline: 0;
  transition: 200ms box-shadow ease;

  ::placeholder {
    color: ${s['color-bw-600']};
  }

  &[readonly] {
    background: ${s['color-bw-200']};
  }
`
C.wrapperIsFocused = css`
  border-color: ${s['color-blue-400']};
  box-shadow: 0 0 0 3px ${s['color-blue-300']};
`
C.picker = css`
  display: block;
  flex-shrink: 0;
  height: 32px;
  width: 32px;
  margin-left: 4px;
  color: ${s['color-bw-900']};
  background: ${s['color-blue-500']};
  border: 0;
  border-radius: ${s['border-radius']}px;
  outline: 0;
  cursor: pointer;
`
C.pickerIsDark = css`
  color: ${s['color-bw-100']};
`
C.input = css`
  height: 100%;
  width: 100%;
  padding: 0 8px;
  line-height: 39px;
  border: 0;
  outline: 0;
`
C.wrapperIsSmall = css`
  padding: 8px;
  height: 32px;
  line-height: 31px;
`
C.wrapperIsSmallIsFocused = css`
  box-shadow: 0 0 0 1px ${s['color-dark-silver']};
`

interface Props {
  size?: 'sm' | 'md' | 'lg'
  value: string
  onChange: (color: string) => void
}

interface State {
  isFocused: boolean
}

export default class UiInput extends React.Component<Props, State> {
  state = {
    isFocused: false
  }

  static defaultProps = {
    size: 'md'
  }

  render() {
    const { size, value } = this.props
    const hasValue = Boolean(value)
    // const isHexColor = isValidHexColor(value)
    
    return (
      <div css={[C.wrapper, this.state.isFocused && C.wrapperIsFocused]}>
        <button
          type="button"
          onClick={this.handleRandomize}
          css={[
            C.picker,
            hasValue && color(value).isDark() && C.pickerIsDark,
            hasValue &&
              css`
                background: ${value};
              `
          ]}>
          <i className="fa fa-refresh" />
        </button>
        <input
          type="text"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleInputChange}
          value={this.props.value}
          css={C.input}
        />
      </div>
    )
  }

  handleRandomize = () => {
    this.props.onChange && this.props.onChange(randomColorHex())
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    // this.props.onChange && this.props.onChange(evt.target.value)
  }

  handleFocus = () => {
    this.setState({
      isFocused: true
    })
  }

  handleBlur = () => {
    this.setState({
      isFocused: false
    })
  }
}
