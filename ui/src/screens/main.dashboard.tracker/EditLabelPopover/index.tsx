import * as React from 'react'
import ls from 'linkstate'
import UiDropdown from '/components/UiDropdown'
import UiField from '/components/UiField'
import UiInput from '/components/UiInput'
import UiSpacer from '/components/UiSpacer'
import UiInputColorPicker from '/components/UiInputColorPicker'
import UiButton from '/components/UiButton'
import SharedPopover from '../SharedPopover'

interface Props {
  label: AppDataTrackerLabel
  isOpen: boolean
  isLoading: boolean
  isDisabled: boolean
  onUpdate: (data: State) => void
  onOpen: () => void
  onClose: () => void
}

interface State {
  name: string
  color: string
}

class EditLabelPopover extends React.Component<Props, State> {
  state = this.getInitialState()

  getInitialState() {
    return {
      name: this.props.label.name,
      color: this.props.label.color
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
      <UiDropdown.Body>
        {this.props.children}
      </UiDropdown.Body>

      <UiDropdown.Menu>
        <SharedPopover>
          <UiDropdown.Heading text="Update Label" />

          <form onSubmit={this.handleSubmit}>
            <UiField label="Name">
              <UiInput autoFocus type="text" value={this.state.name} onChange={ls(this, 'name')} />
            </UiField>

            <UiSpacer />

            <UiField label="Color">
              <UiInputColorPicker
                value={this.state.color}
                onChange={ls(this, 'color')}
                type="text"
              />
            </UiField>

            <UiSpacer />

            <UiButton type="submit" preset="primary" disabled={this.props.isLoading}>Update</UiButton>
          </form>
        </SharedPopover>
      </UiDropdown.Menu>
    </UiDropdown>
    )
  }

  handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    this.props.onUpdate(this.state)
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

export default EditLabelPopover