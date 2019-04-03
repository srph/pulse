/** @jsx jsx */
import * as React from 'react'
import UiDropdown from '~/components/UiDropdown'
import UiSpacer from '~/components/UiSpacer'
import UiButton from '~/components/UiButton'
import UiLevelMenu from '~/components/UiLevelMenu'
import SharedPopover from '../SharedPopover'
import { jsx, css } from '@emotion/core'
import s from '~/styles'

interface Props {
  label: AppDataTrackerLabel
  isOpen: boolean
  isLoading: boolean
  isDisabled: boolean
  onDelete: () => void
  onOpen: () => void
  onClose: () => void
}

class DeleteLabelPopover extends React.Component<Props, {}> {
  render() {
    return (
      <UiDropdown isOpen={this.props.isOpen} onOpen={this.handleOpen} onClose={this.handleClose}>
        <UiDropdown.Body>{this.props.children}</UiDropdown.Body>

        <UiDropdown.Menu>
          <SharedPopover>
            <UiDropdown.Heading text="Delete Confirmation" />

            <p
              css={css`
                color: ${s['color-bw-700']};
                line-height: 1.5;
              `}>
              <strong>This action cannot be undone.</strong> This will <strong>permanently delete</strong> all of your
              entries marked with this label.
            </p>

            <UiSpacer />

            <UiLevelMenu>
              <UiLevelMenu.Section>
                <UiButton preset="danger" onClick={this.props.onDelete} disabled={this.props.isLoading}>Delete</UiButton>
              </UiLevelMenu.Section>

              <UiLevelMenu.Section>
                <UiButton onClick={this.handleClose} disabled={this.props.isLoading}>Cancel</UiButton>
              </UiLevelMenu.Section>
            </UiLevelMenu>
          </SharedPopover>
        </UiDropdown.Menu>
      </UiDropdown>
    )
  }
  handleOpen = () => {
    if (this.props.isDisabled) {
      return
    }

    this.props.onOpen()
  }

  handleClose = () => {
    if (this.props.isLoading) {
      return
    }

    this.props.onClose()
  }
}

export default DeleteLabelPopover
