/** @jsx jsx */
import * as React from 'react'
import { css, jsx } from '@emotion/core'
import s from '~/styles'
import UiFieldGroup from '~/components/UiFieldGroup'
import UiPlainButton from '~/components/UiPlainButton'
import avatars from './avatars'

const C = {} as any
C.container = css`
  display: flex;
`
C.avatar = css`
  padding: 2px;
  border-radius: 50%;
  border: 1px solid transparent;
  transition: 200ms border-color ease;
  margin-right: 8px;

  &:hover {
    border-color: ${s['color-bw-400']};
  }
`
C.avatarIsSelected = css`
  &, &:hover {
    border-color: ${s['color-blue-500']};
  }
`
C.img = css`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  box-shadow: inset 0 0 4px rgba(0,0,0,0.5);
`

interface State {
  activeIndex: 0
}

class AvatarSection extends React.Component<{}, State> {
  render() {
    return (
      <UiFieldGroup heading="Select an avatar" tagline="Pick one of the photos that represent you the most. Have fun!">
        <div css={C.container}>
          {avatars.map((avatar, i) =>
            <UiPlainButton key={i}>
              <div css={[C.avatar, C.avatarIsSelected]}>
                <img css={C.img} src={avatar} alt="Avatar" />
              </div>
            </UiPlainButton>
          )}
        </div>
      </UiFieldGroup>
    )
  }
}

export default AvatarSection