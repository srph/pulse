/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import UiContainer from '~/components/UiContainer'
import UiSpacer from '~/components/UiSpacer'
import AvatarSection from './AvatarSection'
import ChangePasswordSection from './ChangePasswordSection'

class DashboardMe extends React.Component {
  render() {
    return (
      <UiContainer size="lg">
        <h4
          css={css`
            margin-top: 0;
            margin-bottom: 36px;
            padding-bottom: 24px;
            color: ${s['color-bw-700']};
            border-bottom: 1px solid ${s['color-bw-400']};
            font-size: 16px;
          `}>
          Account Settings
        </h4>

        <AvatarSection />
        <UiSpacer />

        <ChangePasswordSection />
        <UiSpacer />
      </UiContainer>
    )
  }
}

export default DashboardMe