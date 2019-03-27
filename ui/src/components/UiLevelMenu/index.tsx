/** @jsx jsx */
import * as React from 'react'
import { jsx , css } from '@emotion/core'

type Props = { children: React.ReactNode }

const UiLevelMenu: React.SFC<any> & {
  Section?: any
  SectionItem?: any
} = (props) => {
  return (
    <div css={css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `}>{props.children}</div>
  )
}

UiLevelMenu.Section = (props: Props) => {
  return (
    <div css={css`
      display: flex;
      align-items: center;
    `}>
      {props.children}
    </div>
  )
}

UiLevelMenu.SectionItem = (props: Props) => {
  return (
    <div css={css`
      &:not(:last-child) {
        margin-right: 16px;
      }
    `}>
      {props.children}
    </div>
  )
}

export default UiLevelMenu