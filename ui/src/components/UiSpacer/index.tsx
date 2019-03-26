import * as React from 'react'
import styled, { css } from 'styled-components'

const S = {} as any
S.Spacer = styled.div`
  margin-bottom: 24px;

  ${props => props.size === 'sm' && css`
    margin-bottom: 16px;
  `}

  ${props => props.size === 'lg' && css`
    margin-bottom: 32px;
  `}

  ${props => props.size === 'xl' && css`
    margin-bottom: 40px;
  `}

  ${props => props.size === 'xxl' && css`
    margin-bottom: 48px;
  `}

  ${props => props.size === 'xxxl' && css`
    margin-bottom: 56px;
  `}
`

interface IUiSpacerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
}

const UiSpacer: React.SFC<IUiSpacerProps> = ({ children, size }) => {
  return (
    <S.Spacer size={size}>
      {children}
    </S.Spacer>
  )
}

UiSpacer.defaultProps = {
  size: 'md'
}

export default UiSpacer