import * as React from 'react'
import styled, { css } from 'styled-components'
// import s from '../styles'

const ui = {} as any
ui.Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 16px;

  ${(props: any) => props.size === 'xs' && css`
    width: 320px;
  `}

  ${(props: any) => props.size === 'sm' && css`
    width: 480px;
  `}


  ${(props: any) => props.size === 'md' && css`
    width: 768px;
  `}

  ${(props: any) => props.size === 'lg' && css`
    width: 1200px;
  `}
`
interface UiContainerProps {
  children: any
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

function UiContainer({ children, size }: UiContainerProps) {
  return (
    <ui.Wrapper size={size}>{children}</ui.Wrapper>
  )
}

export default UiContainer