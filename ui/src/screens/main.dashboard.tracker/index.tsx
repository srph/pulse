/** @jsx jsx */
import * as React from 'react'
import Helmet from 'react-helmet'
import { jsx, css } from '@emotion/core'
import EventListener from 'react-event-listener'
import UiContainer from '~/components/UiContainer'
import UiTabs from '~/components/UiTabs'
import immer from 'immer'
import axios from '~/lib/axios'
import { RouteComponentProps } from '~/lib/history/types'
import s from '~/styles'
import random from '~/utils/random'
import isNumericKeyCode from '~/utils/isNumericKeyCode'
import toPropertyKeys from '~/utils/toPropertyKeys'
import { State } from './types'

const C = {} as any
C.title = css`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: ${s['font-size-title']}px;
`
C.tabs = css`
  margin-bottom: 48px;
`

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

  getEntryDate = (month: number, day: number) => {
    const mm = String(month).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    return `2019-${mm}-${dd}`
  }

  getEntry = (month: number, day: number) => {
    return this.state.tracker.entries[this.getEntryDate(month, day)]
  }

  render() {
    const { tracker } = this.state

    if (tracker == null) {
      return null;
    }

    return (
      <UiContainer size="lg">
        <Helmet title={`${tracker.name}`} />

        <EventListener target="document" onKeyDown={this.handleKeyDown} />

        <h4 css={C.title}>{tracker.name}</h4>

        <div css={C.tabs}>
          <UiTabs>
            <UiTabs.Link to={`/tracker/${tracker.id}`} exact icon="fa fa-pencil">Entries</UiTabs.Link>
            <UiTabs.Link to={`/tracker/${tracker.id}/stats`} icon="fa fa-bar-chart">Stats</UiTabs.Link>
            <UiTabs.Link to={`/tracker/${tracker.id}/settings`} icon="fa fa-cog">Settings</UiTabs.Link>
          </UiTabs>
        </div>

        {React.cloneElement(this.props.children as React.ReactElement<any>, {
          ...this.state,
          onKeyDown: this.handleKeyDown,
          onLabelClick: this.handleLabelClick,
          onStoreLabel: this.handleStoreLabel,
          onEditLabel: this.handleEditLabel,
          onUpdateLabel: this.handleUpdateLabel,
          onDeleteLabel: this.handleDeleteLabel,
          onEntryClick: this.handleEntryClick
        })}
      </UiContainer>
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
    } catch(e) {
      this.setState({ isStoringLabel: false })
    }
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

    try {
      await axios.put(
        `/api/trackers/${tracker.id}/labels/${tracker.labels[index].id}`,
        data
      )
    } catch(e) {
      this.setState({ isUpdatingLabel: false })
      return
    }

    this.setState({
      editIndex: -1,
      isUpdatingLabel: false,
      tracker: immer(this.state.tracker, draft => {
        draft.labels[index].name = data.name
        draft.labels[index].color = data.color
      })
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
    } catch(e) {
      this.setState({ isDestroyingLabel: false })
      return
    }

    this.setState({
      deleteIndex: -1,
      isDeletingLabel: false,
      isDestroyingLabel: false,
      tracker: immer(this.state.tracker, draft => {
        draft.entries = toPropertyKeys(
          Object.values(draft.entries).filter((entry: AppDataTrackerEntry) => entry.label.id !== label.id),
          'entry_date'
        )
        delete draft.labels[index]
      })
    })
  }

  handleEntryClick = async (month: number, day: number) => {
    const id = random(2, 5000)
    const date = this.getEntryDate(month, day)
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
