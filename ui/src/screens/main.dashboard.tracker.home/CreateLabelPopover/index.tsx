import * as React from 'react'
import ls from 'linkstate'
import UiDropdown from '~/components/UiDropdown'
import UiField from '~/components/UiField'
import UiInput from '~/components/UiInput'
import UiSpacer from '~/components/UiSpacer'
import UiInputColorPicker from '~/components/UiInputColorPicker'
import UiButton from '~/components/UiButton'
import UiButtonLink from '~/components/UiButtonLink'
import UiButtonAction from '~/components/UiButtonAction'
import SharedPopover from '../SharedPopover'
import randomColorHex from '~/utils/randomColorHex'

interface Props {
  isOpen: boolean
  isLoading: boolean
  isDisabled: boolean
  onStore: (data: State) => void
  onOpen: () => void
  onClose: () => void
}

interface State {
  name: string
  color: string
}

class CreateLabelPopover extends React.Component<Props, State> {
  state = this.getInitialState()

  getInitialState() {
    return {
      name: '',
      color: randomColorHex()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen && !this.props.isOpen) {
      this.setState(this.getInitialState())
    }
  }

  render() {
    return (
      <UiDropdown
      isOpen={this.props.isOpen}
      onOpen={this.handleOpen}
      onClose={this.handleClose}>
      <UiDropdown.Main>
        <UiButtonLink icon="fa fa-plus">New</UiButtonLink>
      </UiDropdown.Main>

      <UiDropdown.Menu>
        <SharedPopover>
          <UiDropdown.Heading text="Create New Label" />

          <form onSubmit={this.handleSubmit}>
            <UiField label="Name">
              <UiInput autoFocus type="text" value={this.state.name} onChange={ls(this, 'name')} />
            </UiField>

            <UiSpacer />

            <UiField label="Color">
              <UiInputColorPicker
                value={this.state.color}
                onChange={ls(this, 'color')}
              />
            </UiField>

            <UiSpacer />

            <UiButtonAction>
              <UiButton type="submit" preset="primary" disabled={this.props.isLoading}>Create</UiButton>
            </UiButtonAction>
          </form>
        </SharedPopover>
      </UiDropdown.Menu>
    </UiDropdown>
    )
  }

  handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    this.props.onStore(this.state)
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

export default CreateLabelPopover