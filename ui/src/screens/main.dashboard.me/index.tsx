/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import { NavLink } from 'react-router-dom'
import UiContainer from '~/components/UiContainer'
import UiField from '~/components/UiField'
import UiInput from '~/components/UiInput'
import UiSpacer from '~/components/UiSpacer'
import UiGrid from '~/components/UiGrid'
import UiPanel from '~/components/UiPanel'
import UiButtonLoader from '~/components/UiButtonLoader'

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
        
        <UiGrid>
          <UiGrid.Column size={6}>
            <h4
              css={css`
                margin-top: 0;
                margin-bottom: 8px;
                font-size: 16px;
              `}>
              Change Password
            </h4>
            <p
              css={css`
                margin: 0;
                color: ${s['color-bw-700']};
                font-size: 14px;
                font-weight: 300;
              `}>
              Remember to change your password every now and then, okay?
            </p>
            <UiSpacer />
            <UiPanel>
              <UiField label="Current Password">
                <UiInput />
              </UiField>

              <UiSpacer />

              <UiField label="New Password">
                <UiInput />
              </UiField>

              <UiSpacer />

              <UiField label="New Password Confirmation">
                <UiInput />
              </UiField>

              <UiSpacer />

              <UiButtonLoader preset="primary">Update Password</UiButtonLoader>
            </UiPanel>
          </UiGrid.Column>
        </UiGrid>
      </UiContainer>
    )
  }
}

export default DashboardMe
