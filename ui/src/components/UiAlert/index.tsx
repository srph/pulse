import * as React from 'react'
import styled, { css } from 'styled-components'
import s from '~/styles'

const ui = {} as any
ui.Alert = styled.div`
  position: relative;
  padding: 26px 12px;
  padding-left: 48px;
  color: ${s['color-white']};
  border-radius: 2px;
  line-height: 1.5;

  ${props => props.preset === 'error' && css`
    background: #D84237;
  `}

  ${props => props.preset === 'success' && css`
    background: ${s['color-green']};
  `}

  ${props => props.preset === 'warning' && css`
    background: #ffc700;
  `}
`
ui.AlertIcon = styled.div`
  position: absolute;
  top: 20px;
  left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  user-select: none;

  ${props => props.preset === 'error' && css`
    background: #802C26;
  `}

  ${props => props.preset === 'success' && css`
    background: ${s['color-green-dark']};
  `}

  ${props => props.preset === 'warning' && css`
    background: ${s['color-yellow']};
  `}
`

interface IUiAlertProps {
  preset: 'error' | 'success' | 'warning',
  children: React.ReactNode
}

export default function UiAlert(props: IUiAlertProps) {
  let icon: React.ReactNode
  if (props.preset === 'error') {
    icon = <i className='fa fa-times' />
  } else if (props.preset === 'success') {
    icon = <i className='fa fa-check' />
  } else if (props.preset === 'warning') {
    icon = <i className='fa fa-exclamation' />
  }

  return <ui.Alert preset={props.preset}>
    <ui.AlertIcon preset={props.preset}>{icon}</ui.AlertIcon>
    {props.children}
  </ui.Alert>
}