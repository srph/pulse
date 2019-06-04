/** @jsx jsx */
import * as React from 'react'
import s from '~/styles'
import { jsx, css } from '@emotion/core'
import { Link, NavLink } from 'react-router-dom'
import UiContainer from '~/components/UiContainer'
import UiButton from '~/components/UiButton'
import CreateTrackerModal from './CreateTrackerModal'
import Footer from './Footer'
import NavDropdown from './NavDropdown'

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
  isCreateTrackerModalOpen: boolean
}

class MainDashboard extends React.Component<{}, State> {
  state = {
    isCreateTrackerModalOpen: false
  }

  render() {
    return (
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

                <NavDropdown />
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
