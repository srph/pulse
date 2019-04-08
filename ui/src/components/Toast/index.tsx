/** @jsx jsx */
import * as React from 'react'
import Transition from 'react-addons-css-transition-group'
import { Notification, notify } from '@srph/react-notification'
import { css, jsx } from '@emotion/core'
import s from '~/styles'

const C = {} as any
C.notifications = css`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 32px;
  right: 32px;
  pointer-events: none;
  z-index: 1000;
`
C.toast = css`
  position: relative;
  display: inline-block;
  padding: 16px;
  padding-right: 40px;
  font-size: 12px;
  color: ${s['color-bw-100']};
  background: ${s['color-bw-900']};
  border-radius: 4px;
  pointer-events: all;

  :not(:last-child) {
    margin-bottom: 16px;
  }

  &.-enter {
    opacity: 0;
    transform: translateY(16px);
  }

  &.-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: 0.3s all ease;
  }
  
  &.-leave {
    opacity: 1;
    transform: translateY(0);
  }
  
  &.-leave-active {
    opacity: 0;
    transform: translateY(-16px);
    transition: 0.3s all ease;
  }
`
C.close = css`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 0;
  cursor: pointer;
  background: transparent;
  color: ${s['color-bw-100']};
  border: 0;
  opacity: 0.4;
  outline: 0;
`

class Toast extends React.Component {
  render() {
    return (
      <Notification>
        {({ items, onClose }) => (
          <Transition css={C.notifications}
            component='div'
            transitionName={{
              enter: '-enter',
              leave: '-leave'
            }}
            transitionEnterTimeout={400}
            transitionLeaveTimeout={400}>
            {items.map(item =>
              <div css={C.toast} key={item.id}>
                {item.text}
                <button css={C.close} onClick={() => onClose(item.id)}>
                  ×
                </button>
              </div>
            )}
          </Transition>
        )}
      </Notification>
    );
  }
}

export const toast = notify

export default Toast