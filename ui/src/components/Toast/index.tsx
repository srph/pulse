import * as React from 'react'
import * as Transition from 'react-addons-css-transition-group'
import {Notification, notify} from '@srph/react-notification'
import styled from 'styled-components'
import s from '@app/styles'

const ui = {} as any
ui.StyledTransition = styled(Transition)`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 32px;
  right: 32px;
  pointer-events: none;
  z-index: 1000;
`
ui.ToastItem = styled.div`
  position: relative;
  display: inline-block;
  padding: 16px;
  padding-right: 40px;
  font-size: 12px;
  color: ${s['color-white']};
  background: #333;
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
ui.ToastItemClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 0;
  cursor: pointer;
  background: transparent;
  color: ${s['color-white']};
  border: 0;
  opacity: 0.4;
  outline: 0;
`

class Toast extends React.Component {
  render() {
    return (
      <Notification>
        {({items, onClose}) => (
          <ui.StyledTransition
            component='div'
            transitionName={{
              enter: '-enter',
              leave: '-leave'
            }}
            transitionEnterTimeout={400}
            transitionLeaveTimeout={400}>
            {items.map(item =>
              <ui.ToastItem key={item.id}>
                {item.text}
                <ui.ToastItemClose className='close' onClick={() => onClose(item.id)}>
                  ×
                </ui.ToastItemClose>
              </ui.ToastItem>
            )}
          </ui.StyledTransition>
        )}
      </Notification>
    );
  }
}

export const toast = notify

export default Toast