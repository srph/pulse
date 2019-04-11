import * as React from 'react'
import Helmet from 'react-helmet'
import EventListener from 'react-event-listener'
import UiContainer from '~/components/UiContainer'
import UiTabs from '~/components/UiTabs'
import UiPageHeading from '~/components/UiPageHeading'
import UiSpacer from '~/components/UiSpacer'
import immer from 'immer'
import axios from '~/lib/axios'
import { RouteComponentProps } from '~/lib/history/types'
import random from '~/utils/random'
import getEntryDateString from '~/utils/tracker/getEntryDateString'
import isNumericKeyCode from '~/utils/isNumericKeyCode'
import toPropertyKeys from '~/utils/toPropertyKeys'
import { State } from './types'
import LoadingPlaceholder from './LoadingPlaceholder';

type RouteProps = RouteComponentProps<{}, {
  trackerId: string
}>

interface OwnProps {
  children: React.ReactNode
}

type Props = RouteProps & OwnProps

class DashboardTracker extends React.Component<Props, State> {
  state = {
    color: '',
    activeLabelIndex: 0,
    editIndex: -1,
    tracker: null,
    deleteIndex: -1,
    isFetching: false,
    isEditingLabel: false,
    isDeletingLabel: false,
    isDestroyingLabel: false,
    isCreatingLabel: false,
    isStoringLabel: false,
    isUpdatingLabel: false
  }

  async componentDidMount() {
    let response = await axios.get(
      `/api/trackers/${this.props.match.params.trackerId}`
    )

    this.setState({
      tracker: response.data,
      isFetching: false
    })
  }

  render() {
    const { tracker } = this.state

    if (tracker == null) {
      return <LoadingPlaceholder />;
    }

    return (
      <React.Fragment>
        <Helmet title={`${tracker.name}`} />

        <EventListener target="document" onKeyDown={this.handleKeyDown} />

        <UiPageHeading title={tracker.name} />

        <UiContainer size="lg">
          <UiTabs>
            <UiTabs.Link to={`/tracker/${tracker.id}`} exact icon="fa fa-pencil">Entries</UiTabs.Link>
            <UiTabs.Link to={`/tracker/${tracker.id}/stats`} icon="fa fa-bar-chart">Stats</UiTabs.Link>
            <UiTabs.Link to={`/tracker/${tracker.id}/settings`} icon="fa fa-cog">Settings</UiTabs.Link>
          </UiTabs>

          <UiSpacer size="xxl" />

          {React.cloneElement(this.props.children as React.ReactElement<any>, {
            ...this.state,
            onKeyDown: this.handleKeyDown,
            onLabelClick: this.handleLabelClick,
            onStoreLabel: this.handleStoreLabel,
            onUpdateLabel: this.handleUpdateLabel,
            onDeleteLabel: this.handleDeleteLabel,
            onEntryClick: this.handleEntryClick,
            onOpenCreateLabel: this.handleOpenCreateLabel,
            onCloseCreateLabel: this.handleCloseCreateLabel,
            onOpenEditLabel: this.handleOpenEditLabel,
            onCloseEditLabel: this.handleCloseEditLabel,
            onOpenDeleteLabel: this.handleOpenDeleteLabel,
            onCloseDeleteLabel: this.handleCloseDeleteLabel,
            onUpdateTracker: this.handleUpdateTracker
          })}
        </UiContainer>
      </React.Fragment>
    )
  }

  handleKeyDown = (evt: React.KeyboardEvent<HTMLDocument>) => {
    if (!evt.altKey || !isNumericKeyCode(evt.keyCode)) {
      return
    }

    const number = evt.keyCode - 48

    const index = number === 0 ? 9 : number - 1

    if (this.state.tracker.labels[index] != null) {
      this.setState({
        activeLabelIndex: index
      })
    }
  }

  handleLabelClick = (index: number) => {
    this.setState({
      activeLabelIndex: index
    })
  }

  handleOpenCreateLabel = () => {
    this.setState({
      isCreatingLabel: true
    })
  }

  handleCloseCreateLabel = () => {
    this.setState({
      isCreatingLabel: false
    })
  }

  handleStoreLabel = async (data: Partial<AppDataTrackerLabel>) => {
    if (this.state.isStoringLabel) {
      return
    }

    this.setState({
      isStoringLabel: true
    })

    try {
      const response = await axios.post(
        `/api/trackers/${this.state.tracker.id}/labels`,
        data
      )

      this.setState({
        isCreatingLabel: false,
        isStoringLabel: false,
        tracker: immer(this.state.tracker, draft => {
          draft.labels.push(response.data)
        })
      })
    } catch (e) {
      this.setState({ isStoringLabel: false })
    }
  }

  handleOpenEditLabel = (index: number) => {
    this.setState({
      editIndex: index
    })
  }

  handleCloseEditLabel = () => {
    this.setState({
      editIndex: -1
    })
  }

  handleEditLabel = index => {
    if (index === this.state.editIndex) {
      this.setState({
        isEditingLabel: false,
        editIndex: -1
      })
    } else {
      this.setState({
        isEditingLabel: true,
        editIndex: index
      })
    }
  }

  handleUpdateLabel = async (data: Partial<AppDataTrackerLabel>) => {
    if (this.state.isUpdatingLabel) {
      return
    }

    this.setState({
      isUpdatingLabel: true
    })

    const { tracker } = this.state
    const index = this.state.editIndex
    const label = tracker.labels[index]

    try {
      await axios.put(
        `/api/trackers/${tracker.id}/labels/${label.id}`,
        data
      )
    } catch (e) {
      this.setState({ isUpdatingLabel: false })
      return
    }

    this.setState({
      editIndex: -1,
      isUpdatingLabel: false,
      tracker: immer(this.state.tracker, draft => {
        // If the label color changes, we'll also update all of the entries' label color
        if (data.color !== label.color) {
          const entries: AppDataTrackerEntry[] = Object.values(draft.entries)

          entries.filter(entry => entry.label.id === label.id).forEach(entry => {
            entry.label.color = data.color
          })
        }

        draft.labels[index].name = data.name
        draft.labels[index].color = data.color
      })
    })
  }

  handleOpenDeleteLabel = (index: number) => {
    this.setState({
      deleteIndex: index
    })
  }

  handleCloseDeleteLabel = () => {
    this.setState({
      deleteIndex: -1
    })
  }

  handleDeleteLabel = async () => {
    if (this.state.isDestroyingLabel) {
      return
    }

    this.setState({
      isDestroyingLabel: true
    })

    const { tracker } = this.state
    const index = this.state.deleteIndex
    const label = tracker.labels[index]

    try {
      await axios.delete(`/api/trackers/${tracker.id}/labels/${label.id}`)
    } catch (e) {
      this.setState({ isDestroyingLabel: false })
      return
    }

    this.setState({
      deleteIndex: -1,
      activeLabelIndex: 0,
      isDeletingLabel: false,
      isDestroyingLabel: false,
      tracker: immer(this.state.tracker, draft => {
        draft.entries = toPropertyKeys(
          Object.values(draft.entries).filter((entry: AppDataTrackerEntry) => entry.label.id !== label.id),
          'entry_date'
        )
        draft.labels.splice(index, 1)
      })
    })
  }

  handleEntryClick = async (month: number, day: number) => {
    const id = random(2, 5000)
    const date = getEntryDateString({
      tracker: this.state.tracker,
      month,
      day
    })
    const label = this.state.tracker.labels[this.state.activeLabelIndex]

    this.setState({
      tracker: immer(this.state.tracker, draft => {
        draft.entries[date] = {
          id,
          label,
          entry_date: date,
          created_at: '',
          updated_at: ''
        }
      })
    })

    // @TODO Undo errors
    await axios.post(`/api/trackers/${this.state.tracker.id}/entries`, {
      entry_date: date,
      tracker_label_id: label.id
    })
  }

  handleUpdateTracker = (data: Partial<AppDataTracker>) => {
    this.setState({
      tracker: {
        ...this.state.tracker,
        ...data
      }
    })
  }
}

/**
 * Little trick to force our component to remount entirely if the user
 * creates a tracker all while viewing another tracker.
 */
function WrappedDashboardTracker(props: Props) {
  return (
    <DashboardTracker key={props.match.params.trackerId} {...props} />
  )
}

export default WrappedDashboardTracker
