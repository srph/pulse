/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import UiContainer from '/components/UiContainer'
import s from '/styles'
import avatar from './avatar.png'

const C = {} as any
C.navbar = css`
  margin-bottom: 40px;
  border-bottom: 1px solid ${s['color-bw-400']};
`
C.navbarContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`
C.navbarAvatar = css`
  width: 40px;
  height: 40px;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid ${s['color-blue-500']};
`
C.navbarLogo = css`
  margin: 0;
  font-weight: 600;
`

class MainDashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <UiContainer size="md">
          <div css={C.navbar}>
            <div css={C.navbarContainer}>
              <h2 css={C.navbarLogo}>Pulse</h2>

              <img css={C.navbarAvatar} src={avatar} alt="Your Photo" />
            </div>
          </div>
        </UiContainer>

        {this.props.children}
      </React.Fragment>
    )
  }
}

export default MainDashboard
