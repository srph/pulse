/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import UiContainer from '/components/UiContainer'
import s from '/styles'
import avatar from './avatar.png'
import UiDropdown from '/components/UiDropdown'
import UiPlainButton from '/components/UiPlainButton'
import UiButton from '/components/UiButton'
import CreateTrackerModal from './CreateTrackerModal'
import { NavLink } from 'react-router-dom'

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
C.navMenu = css`
  display: flex;
  align-items: center;
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
        <UiContainer size="lg">
          <div css={C.navbar}>
            <div css={C.navbarContainer}> 
              <NavLink to="/" exact css={C.navLink} activeClassName="-active">
                <i className='fa fa-home' />
              </NavLink>

              <h2 css={C.navbarLogo}>Pulse</h2>

              <div css={C.navMenu}>
                <div css={C.navMenuAction}>
                  <UiButton preset="primary" onClick={() => this.setState({ isCreateTrackerModalOpen: true })}>
                    <UiButton.LeftIcon>
                      <i className='fa fa-plus' />
                    </UiButton.LeftIcon>
                    Create New Tracker
                  </UiButton>
                </div>
                <UiDropdown isOpen={this.state.isDropdownOpen}
                  onOpen={() => this.setState({ isDropdownOpen: true })} 
                  onClose={() => this.setState({ isDropdownOpen: false })}>
                  <UiDropdown.Body>
                    <UiPlainButton>
                      <img css={C.navbarAvatar} src={avatar} alt="Your Photo" />
                    </UiPlainButton>
                  </UiDropdown.Body>

                  <UiDropdown.Menu>
                    <UiDropdown.Link to="/me">
                      Account Settings
                    </UiDropdown.Link>

                    <UiDropdown.Link to="/logout">
                      Logout
                    </UiDropdown.Link>
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
