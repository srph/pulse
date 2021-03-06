/** @jsx jsx */
import * as React from 'react'
import { css, jsx, keyframes } from '@emotion/core'
import s from '~/styles'
import UiFieldGroup from '~/components/UiFieldGroup'
import UiPlainButton from '~/components/UiPlainButton'

import sections from './avatars'
import axios from '~/lib/axios'
import { Subscribe } from 'unstated'
import { AuthContainer } from '~/containers'
import BufferDisplay from '~components/BufferDisplay';

const C = {} as any
C.container = css`
  max-height: 400px;
  overflow-y: auto;
`
C.section = css`
  display: flex;
  flex-wrap: wrap;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`
C.avatar = css`
  position: relative;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid transparent;
  transition: 200ms border-color ease;
  margin-right: 8px;

  &:hover {
    border-color: ${s['color-bw-600']};
  }
`
C.avatarIsSelected = css`
  &,
  &:hover {
    border-color: ${s['color-blue-500']};
  }
`
C.img = css`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.5);
`
C.fade = keyframes`
  0% {
    opacity: 100%;
  }

  100% {
    opacity: 0;
  }
`
C.success = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* color: ${s['color-green-500']}; */
  color: ${s['color-bw-100']};
  background: ${s['color-blue-500']};
  border-radius: 50%;
  animation: ${C.fade} 4s ease 1;
`

interface InjectedProps {
  auth: AppDataUser
  onUserUpdate: (data: Partial<AppDataUser>) => void
}

interface State {
  activeIndex: 0
}

class AvatarSection extends React.Component<InjectedProps, State> {
  render() {
    return (
      <UiFieldGroup heading="Select an avatar" tagline="Pick one of the photos that represent you the most. Have fun!" isFullWidth>
        <div css={C.container}>
          {sections.map((avatars, i) => (
            <div css={C.section} key={i}>
              {avatars.map((avatar, j) => (
                <UiPlainButton key={j} onClick={() => this.handleSelect(avatar)}>
                  <div css={[C.avatar, this.props.auth.avatar === avatar && C.avatarIsSelected]}>
                    <img css={C.img} src={avatar} alt="Avatar" />

                    <BufferDisplay flag={this.props.auth.avatar === avatar} timeout={4000}>
                      <span css={C.success}>
                        <i className='fa fa-check' />
                      </span>
                    </BufferDisplay>
                  </div>
                </UiPlainButton>
              ))}
            </div>
          ))}
        </div>
      </UiFieldGroup>
    )
  }

  handleSelect = async (avatar: string) => {
    // Buffer the last avatar to revert to it when the request fails
    const last = this.props.auth.avatar

    this.props.onUserUpdate({ avatar })

    try {
      await axios.put('/api/me/avatar', { avatar })
    } catch (e) {
      this.props.onUserUpdate({ avatar: last })
    }
  }
}

function WrappedAvatarSection() {
  return (
    <Subscribe to={[AuthContainer]}>
      {(auth: typeof AuthContainer) => <AvatarSection auth={auth.state.data} onUserUpdate={auth.updateUserData} />}
    </Subscribe>
  )
}

export default WrappedAvatarSection
