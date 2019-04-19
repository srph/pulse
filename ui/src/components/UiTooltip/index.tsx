/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import Position from '~/components/Position'

const C = {} as any
C.wrapper = css`
  position: absolute;
  margin-right: 16px;
  padding: 8px;
  font-size: 12px;
  background: rgba(0,0,0,0.6);
  color: ${s['color-bw-100']};
  border-radius: 4px;
  font-family: ${s['font-family']};
  pointer-events: none;
  white-space: nowrap;
  text-transform: none;
  font-weight: 400;
  z-index: ${s['z-index-tooltip']};
`
C.arrow = css`
  position: absolute;
  top: 10px;
  height: 0;
  width: 0;
  border-width: 4px;
  border-color: transparent;
  border-style: solid;
`
C.arrowIsLeft = css`
  right: -8px;
  border-left-color: rgba(0,0,0,0.6);
`
C.arrowIsRight = css`
    left: -8px;
    border-right-color: rgba(0,0,0,0.6);
`
C.trigger = css`
  button:disabled {
    /* https://github.com/facebook/react/issues/4251#issuecomment-267004045 */
    pointer-events: none;
  }
`

interface Props {
  children: JSX.Element
  text: string
  attachment?: 'left' | 'right'
  disabled?: boolean
  delay?: 'instant' | 'delayed' | 'hold' | number
}

interface State {
  isActive: boolean
}

export default class UiTooltip extends React.Component<Props, State> {
  static defaultProps = {
    attachment: 'left'
  }

  state: State = {
    isActive: false
  }

  target: HTMLElement

  delayTimeout: number

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div css={C.trigger}
          ref={(c: HTMLElement) => (this.target = c)}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
          {this.props.children}
        </div>

        {!this.props.disabled &&
          this.state.isActive && (
            <Position offset={16} target={() => this.target} placement={this.props.attachment}>
              {({ top, left }) => (
                <div css={C.wrapper} style={{ top, left }} role="tooltip">
                  {this.props.text} <div css={[C.arrow, this.props.attachment === 'left' && C.arrowIsLeft, this.props.attachment === 'right' && C.arrowIsRight]} />
                </div>
              )}
            </Position>
          )}
      </div>
    )
  }

  handleMouseEnter = (evt: React.MouseEvent<HTMLDivElement>) => {
    let timeoutMs: number
    if (this.props.delay === 'instant') {
      timeoutMs = 0
    } else if ( this.props.delay === 'delayed') {
      timeoutMs = 500
    } else if (this.props.delay === 'hold') {
      timeoutMs = 1000
    } else {
      timeoutMs = this.props.delay
    }

    this.delayTimeout = window.setTimeout(() => {
      this.setState({
        isActive: true
      })
    }, timeoutMs)
  }

  handleMouseLeave = (evt: React.MouseEvent<HTMLDivElement>) => {
    window.clearTimeout(this.delayTimeout)

    this.setState({
      isActive: false
    })
  }
}
