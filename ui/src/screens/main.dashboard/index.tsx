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
import { Subscribe } from 'unstated'
import { AuthContainer } from '~/containers'
import Footer from './Footer'

const C = {} as any
C.line = css`
  flex-shrink: 0;
  height: 5px;
  background: linear-gradient(90deg, ${s['color-blue-500']}, ${s['color-blue-700']});
`
C.navbar = css`
  background: ${s['color-bw-100']};
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
  height: 100%;
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
C.profile = css`
  display: flex;
  align-items: center;
  padding: 8px;
  padding-bottom: 12px;
  width: 240px;
  border-bottom: 1px solid ${s['color-bw-300']};
`
C.profileInfo = css`
  /*
    Allow dynamic widths in text overflow ellipsis
    @source https://stackoverflow.com/questions/12649904/css-text-ellipsis-when-using-variable-width-divs
  */
  min-width: 0;
  width: 100%;
`
C.profileAvatar = css`
  margin-right: 16px;
  flex: 1;
  flex-shrink: 0;
`
C.profileName = css`
  margin-top: 0;
  margin-bottom: 4px;
  font-weight: 400;
  font-size: ${s['font-size-title']}px;
  /* Truncate */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
C.profileEmail = css`
  margin: 0;
  color: ${s['color-bw-600']};
  font-size: ${s['font-size-subtitle']}px;
  /* Truncate */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

interface State {
  isDropdownOpen: boolean
  isCreateTrackerModalOpen: boolean
}

class MainDashboard extends React.Component<{}, State> {
  state = {
    isDropdownOpen: false,
    isCreateTrackerModalOpen: false
  }

  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {(auth: typeof AuthContainer) => (
          <React.Fragment>
            <div css={C.line} />

            <div css={C.navbar}>
              <UiContainer size="lg">
                <div css={C.navbarContainer}>
                  <div css={C.navSection}>
                    <Link to="/" css={C.navbarLogo}>
                      <img
                        src="https://caretv.sgp1.digitaloceanspaces.com/app-pulse/logos/logo-icon.svg"
                        alt="Pulse Logo"
                        css={C.navbarLogoIcon}
                      />
                      Pulse
                    </Link>

                    <NavLink to="/" exact css={C.navLink} activeClassName="-active">
                      <i className="fa fa-home" />
                    </NavLink>
                  </div>

                  <div css={C.navMenu}>
                    <div css={C.navMenuAction}>
                      <UiButton preset="primary" onClick={this.handleOpenCreateTrackerModal}>
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
                          <img css={C.navbarAvatar} src={auth.state.data.avatar} alt="Your Photo" />
                        </UiPlainButton>
                      </UiDropdown.Main>

                      <UiDropdown.Menu>
                        <div css={C.dropdown}>
                          <div css={C.profile}>
                            <div css={C.profileAvatar}>
                              <img css={C.navbarAvatar} src={auth.state.data.avatar} alt="Your Photo" />
                            </div>

                            <div css={C.profileInfo}>
                              <h4 css={C.profileName}>{auth.state.data.name}</h4>
                              <p css={C.profileEmail}>{auth.state.data.email}</p>
                            </div>
                          </div>
                          <UiDropdown.Link to="/me" icon="fa fa-sliders">
                            Account Settings
                          </UiDropdown.Link>
                          <UiDropdown.Link to="/?archived=true" icon="fa fa-trash">
                            Archived Trackers
                          </UiDropdown.Link>
                          <UiDropdown.Link to="/logout" icon="fa fa-long-arrow-right">
                            Logout
                          </UiDropdown.Link>
                        </div>
                      </UiDropdown.Menu>
                    </UiDropdown>
                  </div>
                </div>
              </UiContainer>
            </div>

            {this.state.isCreateTrackerModalOpen && <CreateTrackerModal onClose={this.handleCloseCreateTrackerModal} />}

            {React.cloneElement(this.props.children as React.ReactElement<any>, {
              onOpenCreateTrackerModal: this.handleOpenCreateTrackerModal
            })}

            <Footer />
          </React.Fragment>
        )}
      </Subscribe>
    )
  }

  handleOpenCreateTrackerModal = () => {
    this.setState({ isCreateTrackerModalOpen: true })
  }

  handleCloseCreateTrackerModal = () => {
    this.setState({ isCreateTrackerModalOpen: false })
  }
}

export default MainDashboard
