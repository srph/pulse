/** @jsx jsx */
import * as React from 'react'
import s from '~/styles'
import { jsx, css } from '@emotion/core'
import UiDropdown from '~/components/UiDropdown'
import UiPlainButton from '~/components/UiPlainButton'
import { Subscribe } from 'unstated'
import { AuthContainer } from '~/containers'

const C = {} as any
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
C.navbarAvatar = css`
  width: 40px;
  height: 40px;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid ${s['color-blue-500']};
`

interface State {
  isOpen: boolean
}

class MainDashboard extends React.Component<{}, State> {
  state = {
    isOpen: false
  }

  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {(auth: typeof AuthContainer) => (
          <UiDropdown
            isOpen={this.state.isOpen}
            onOpen={() => this.setState({ isOpen: true })}
            onClose={() => this.setState({ isOpen: false })}>
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
        )}
      </Subscribe>
    )
  }
}

export default MainDashboard
