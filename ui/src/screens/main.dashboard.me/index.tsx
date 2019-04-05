/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import { NavLink } from 'react-router-dom'
import UiContainer from '~/components/UiContainer'

const C = {} as any
C.tabs = css`
  display: flex;
  border-bottom: 1px solid ${s['color-bw-400']};
`
C.link = css`
  padding: 12px;
  color: ${s['color-text']};
  border-bottom: 1px solid transparent;
  text-decoration: none;
  transition: 200ms all ease;

  &:hover {
    border-bottom-color: ${s['color-bw-600']};
  }

  &.-active {
    border-bottom-color: ${s['color-blue-400']};
  }
`

class DashboardMe extends React.Component {
  render() {
    return (
      <UiContainer size="lg">
        <div css={C.tabs}>
          <NavLink css={C.link} activeClassName="-active" to="/me">Account Settings</NavLink>
          <NavLink css={C.link} activeClassName="-active" to="/me/password">Change Password</NavLink>
          <NavLink css={C.link} activeClassName="-active" to="/me/avatar">Avatar Selection</NavLink>
        </div>
      </UiContainer>
    )
  }
}

export default DashboardMe