/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import UiContainer from '~/components/UiContainer'
import UiSpacer from '~/components/UiSpacer'
import UiPageHeading from '~/components/UiPageHeading'
import Helmet from 'react-helmet'
import AvatarSection from './AvatarSection'
import ChangePasswordSection from './ChangePasswordSection'
import PersonalDetailsSection from './PersonalDetailsSection'

class DashboardMe extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet title="Account Settings" />

        <UiPageHeading title="Account Settings" />

        <UiContainer size="lg">
          <AvatarSection />
          <UiSpacer />
          
          <PersonalDetailsSection />
          <UiSpacer />

          <ChangePasswordSection />
          <UiSpacer />
        </UiContainer>
      </React.Fragment>
    )
  }
}

export default DashboardMe
