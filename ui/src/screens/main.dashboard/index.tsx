/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import UiContainer from '~/components/UiContainer'
import s from '~/styles'
import UiDropdown from '~/components/UiDropdown'
import UiPlainButton from '~/components/UiPlainButton'
import UiButton from '~/components/UiButton'
import CreateTrackerModal from './CreateTrackerModal'
import { Link, NavLink } from 'react-router-dom'

const C = {} as any
C.line = css`
  border-top: 5px solid #404b5a;
`
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
C.navSection = css`
  display: flex;
`
C.navbarAvatar = css`
  width: 40px;
  height: 40px;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid ${s['color-blue-500']};
`
C.navbarLogo = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  height: 100%;
  margin-right: 16px;
  color: ${s['color-text']};
  text-decoration: none;
  font-weight: 600;
  font-size: ${s['font-size-title']}px;
`
C.navbarLogoIcon = css`
  margin-right: 8px;
`
C.navMenu = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`
C.navMenuAction = css`
  margin-right: 16px;
`
C.navLink = css`
  display: inline-flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  text-decoration: none;
  height: 100%;
  color: ${s['color-bw-700']};
  border-bottom: 2px solid ${s['color-bw-600']};
  transition: 200ms all ease;

  &:hover {
    color: ${s['color-bw-800']};
    border-bottom: 2px solid ${s['color-bw-800']};
  }

  &.-active {
    color: ${s['color-blue-500']};
    border-bottom-color: ${s['color-blue-500']};
  }
`

interface State {
  isDropdownOpen: boolean
  isCreateTrackerModalOpen: boolean
}

class MainDashboard extends React.Component {
  state = {
    isDropdownOpen: false,
    isCreateTrackerModalOpen: false
  }

  render() {
    return (
      <React.Fragment>
        <div css={C.line} />

        <UiContainer size="lg">
          <div css={C.navbar}>
            <div css={C.navbarContainer}>
              <div css={C.navSection}>
                <Link to="/" css={C.navbarLogo}>
                  <img src="https://caretv.sgp1.digitaloceanspaces.com/app-pulse/logos/logo-icon.svg" alt="Pulse Logo" css={C.navbarLogoIcon} />
                  Pulse
                </Link>

                <NavLink to="/" exact css={C.navLink} activeClassName="-active">
                  <i className="fa fa-home" />
                </NavLink>
              </div>

              <div css={C.navMenu}>
                <div css={C.navMenuAction}>
                  <UiButton preset="primary" onClick={() => this.setState({ isCreateTrackerModalOpen: true })}>
                    <UiButton.LeftIcon>
                      <i className="fa fa-plus" />
                    </UiButton.LeftIcon>
                    Create New Tracker
                  </UiButton>
                </div>
                <UiDropdown
                  isOpen={this.state.isDropdownOpen}
                  onOpen={() => this.setState({ isDropdownOpen: true })}
                  onClose={() => this.setState({ isDropdownOpen: false })}>
                  <UiDropdown.Main>
                    <UiPlainButton>
                      <img
                        css={C.navbarAvatar}
                        src="https://caretv.sgp1.digitaloceanspaces.com/app-pulse/user-avatars/avatar.png"
                        alt="Your Photo"
                      />
                    </UiPlainButton>
                  </UiDropdown.Main>

                  <UiDropdown.Menu>
                    <UiDropdown.Link to="/me">Account Settings</UiDropdown.Link>

                    <UiDropdown.Link to="/logout">Logout</UiDropdown.Link>
                  </UiDropdown.Menu>
                </UiDropdown>
              </div>
            </div>
          </div>
        </UiContainer>

        {this.state.isCreateTrackerModalOpen && (
          <CreateTrackerModal onClose={() => this.setState({ isCreateTrackerModalOpen: false })} />
        )}

        {this.props.children}
      </React.Fragment>
    )
  }
}

export default MainDashboard
