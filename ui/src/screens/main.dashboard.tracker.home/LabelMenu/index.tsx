/** @jsx jsx */
import * as React from 'react'
import { jsx } from '@emotion/core'
import CreateLabelPopover from '../CreateLabelPopover'
import EditLabelPopover from '../EditLabelPopover'
import DeleteLabelPopover from '../DeleteLabelPopover'
import UiTransitionFadeSlideIn from '~components/UiTransitionFadeSlideIn'
import LabelMenuScrollToToday from '../LabelMenuScrollToToday'
import LabelMenuStreak from '../LabelMenuStreak'
import color from 'color'
import C from './styles'
import { ClonedProps } from '~/screens/main.dashboard.tracker/types'
import axios from '~/lib/axios';
import isTrackerFinished from '~/utils/tracker/isTrackerFinished'

class LabelMenu extends React.Component<ClonedProps, {}> {
  render() {
    const { tracker } = this.props
    const isFinished = isTrackerFinished(tracker)

    return (
      <div css={C.labelSection}>
        <div css={C.labelAffix}>
          <div css={C.labelMenu}>
            <h5 css={C.labelMenuHeading}>Labels</h5>

            {!isFinished && <CreateLabelPopover
              isDisabled={false}
              isOpen={this.props.isCreatingLabel}
              isLoading={this.props.isStoringLabel}
              onStore={this.props.onStoreLabel}
              onOpen={this.props.onOpenCreateLabel}
              onClose={this.props.onCloseCreateLabel}
            />}
          </div>

          <section css={C.labelList}>
            {tracker.labels.map((label: AppDataTrackerLabel, i: number) => (
              <div css={C.labelContainer} key={label.id}>
                {!isFinished && this.props.activeLabelIndex === i ? (
                  <UiTransitionFadeSlideIn>
                    <div css={C.labelCheck}>
                      <i className="fa fa-check" />
                    </div>
                  </UiTransitionFadeSlideIn>
                ) : (
                  <div css={C.labelPlaceholder} />
                )}

                <button
                  type="button"
                  css={[C.label, !isFinished && this.props.activeLabelIndex === i && C.labelIsActive]}
                  onClick={() => this.handleSelectLabel(i)}
                  disabled={isFinished}>
                  <div
                    css={[C.labelColor, color(label.color).isDark() && C.labelColorIsDark]}
                    style={{ backgroundColor: label.color }}>
                    Alt + {i + 1}
                  </div>

                  <span css={C.labelName}>{label.name}</span>
                </button>

                {!isFinished && <div
                  css={[
                    C.labelActions,
                    (this.props.editIndex === i || this.props.deleteIndex === i) && C.labelActionsIsActive
                  ]}>
                  <div css={C.labelAction}>
                    <EditLabelPopover
                      label={label}
                      isOpen={this.props.editIndex === i}
                      isLoading={this.props.isUpdatingLabel}
                      isDisabled={false}
                      onUpdate={this.props.onUpdateLabel}
                      onOpen={() => this.props.onOpenEditLabel(i)}
                      onClose={this.props.onCloseEditLabel}>
                      <button type="button" css={C.labelActionButton}>
                        <i className="fa fa-pencil" />
                      </button>
                    </EditLabelPopover>
                  </div>

                  <div css={C.labelAction}>
                    <DeleteLabelPopover
                      label={label}
                      isOpen={this.props.deleteIndex === i}
                      isLoading={this.props.isDestroyingLabel}
                      isDisabled={tracker.labels.length === 1}
                      onDelete={this.props.onDeleteLabel}
                      onOpen={() => this.props.onOpenDeleteLabel(i)}
                      onClose={this.props.onCloseDeleteLabel}>
                      <button type="button" css={C.labelActionButton} disabled={tracker.labels.length === 1}>
                        <i className="fa fa-trash" />
                      </button>
                    </DeleteLabelPopover>
                  </div>
                </div>}
              </div>
            ))}
          </section>

          <LabelMenuStreak tracker={tracker} />

          <LabelMenuScrollToToday tracker={tracker} />
        </div>
      </div>
    )
  }

  handleSelectLabel(i: number) {
    // We don't really want to disable the button, so we'll just do a noop here in-case.
    if (this.props.activeLabelIndex === i) {
      return
    }

    this.props.onLabelClick(i)

    // @TODO Disable the toast and silently fail for all errors.
    // Also, for 500 errors; The interceptor doesn't allow this at the moment.
    axios.put(`/api/trackers/${this.props.tracker.id}/last-selected-label`, {
      last_selected_label_id: this.props.tracker.labels[i].id
    })
  }
}

export default LabelMenu
