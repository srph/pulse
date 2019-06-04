/** @jsx jsx */
import * as React from 'react'
import Helmet from 'react-helmet'
import { jsx, css } from '@emotion/core'
import { Link } from 'react-router-dom'
import UiContainer from '~/components/UiContainer'
import UiPageHeading from '~/components/UiPageHeading'
import UiPlaceholderBlock from '~/components/UiPlaceholderBlock'
import UiSpacer from '~/components/UiSpacer'
import UiEmptySlate from '~/components/UiEmptySlate'
import UiButton from '~/components/UiButton'
import UiAlert from '~/components/UiAlert'
import empty from './empty.svg'
import archived from './archived.svg'
import s from '~/styles'
import axios from '~/lib/axios'
import { differenceInDays } from 'date-fns'
import distanceInWordsStrictToNow from '~/utils/distanceInWordsStrictToNow'
import isTrackerFinished from '~/utils/tracker/isTrackerFinished'
import PeriodicNow from '~/components/PeriodicNow'
import { RouteComponentProps } from '~/lib/history/types'

const C = {} as any
C.year = css`
  margin-bottom: 64px;
`
C.yearHeading = css`
  margin: 0;
  margin-bottom: 16px;
`
C.trackerList = css``
C.tracker = css`
  display: flex;
  align-items: center;
  padding: 0 16px;
  text-decoration: none;
  color: ${s['color-text']};
  height: 46px;
  background: ${s['color-bw-100']};
  border: 1px solid ${s['color-bw-400']};
  border-radius: ${s['border-radius']}px;
  box-shadow: ${s['drop-shadow']};
  transition: 100ms opacity ease;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  .css-${C.trackerList.name}:hover & {
    opacity: 0.7;
  }

  .css-${C.trackerList.name}:hover &:hover {
    opacity: 1;
  }
`
C.trackerTitle = css`
  margin: 0;
  margin-right: auto;
  font-size: ${s['font-size-title']}px;
`
C.trackerDate = css`
  margin-right: 24px;
  color: ${s['color-bw-500']};
  font-weight: 500;
  font-size: ${s['font-size-subtitle']}px;
`
C.trackerDateIndicator = css`
  margin-left: 8px;
  font-size: 12px;
`
C.trackerDateIndicatorIsFollowUp = css`
  color: ${s['color-blue-500']};
`
C.trackerDateIndicatorIsWarning = css`
  color: #e4d500;
`
C.trackerCaret = css`
  color: ${s['color-bw-500']};
  transform: translateX(0);
  transition: 200ms transform ease;

  .css-${C.tracker.name}:hover & {
    transform: translateX(2px);
  }
`

interface OwnProps {
  onOpenCreateTrackerModal: () => void
}

type RouteProps = RouteComponentProps<{
  archived: string
}>

type Props = RouteProps & OwnProps

interface State {
  data: {
    year: number
    trackers: AppDataTracker[]
  }[]
  isLoading: boolean
}

/**
 * @TODO Handle errors
 */
class DashboardHome extends React.Component<Props, State> {
  state = {
    data: [],
    isLoading: false
  }

  componentDidMount() {
    this.fetch()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.query.archived !== nextProps.location.query.archived) {
      this.fetch(nextProps)
    }
  }

  async fetch(props: Props = this.props) {
    this.setState({
      data: [],
      isLoading: true
    })

    let response = await axios.get(this.isArchived(props) ? '/api/trackers?archived=true' : '/api/trackers')

    this.setState({
      data: response.data,
      isLoading: false
    })
  }

  isArchived(props: Props = this.props) {
    return 'archived' in props.location.query
  }

  render() {
    return (
      <React.Fragment>
        <Helmet title="Trackers" />

        <UiPageHeading title="Your Bullet Journals" />

        <UiContainer size="md">
          {this.state.isLoading &&
            Array(4)
              .fill(0)
              .map((_, i: number) => (
                <React.Fragment key={i}>
                  <UiPlaceholderBlock shape="rounded" height={46} />
                  <UiSpacer size="sm" />
                </React.Fragment>
              ))}

          {!this.state.isLoading && Boolean(this.state.data.length) && this.isArchived() && (
            <React.Fragment>
              <UiAlert preset="warning" isCompact>
                You are viewing all your archived trackers. <Link to="/">View all trackers</Link>.
              </UiAlert>

              <UiSpacer />
            </React.Fragment>
          )}

          <PeriodicNow interval={1000}>
            {(now: Date) => (
              <React.Fragment>
                {this.state.data.map((year, i) => (
                  <section css={C.year} key={year.year}>
                    <h5 css={C.yearHeading}>{year.year}</h5>

                    <section css={C.trackerList}>
                      {year.trackers.map((tracker: AppDataTracker, i: number) => {
                        const dateAgo = this.isArchived()
                          ? tracker.deleted_at
                          : tracker.most_recent_entry_at || tracker.updated_at

                        // We'll skip the indicators if it's a previous year
                        const lastUpdateInDays =
                          now.getFullYear() === year.year ? differenceInDays(now, new Date(dateAgo)) : 0

                        return (
                          <Link css={C.tracker} to={`/tracker/${tracker.id}`} key={i}>
                            <h4 css={C.trackerTitle}>{tracker.name}</h4>

                            {!isTrackerFinished(tracker) && (
                              <span css={C.trackerDate}>
                                {this.isArchived() ? 'Archived' : 'Last updated'}{' '}
                                {lastUpdateInDays === 0 ? 'today' : `${distanceInWordsStrictToNow(dateAgo)} ago`}
                                {!this.isArchived() && lastUpdateInDays > 1 &&
                                  (lastUpdateInDays > 5 ? (
                                    <span css={[C.trackerDateIndicator, C.trackerDateIndicatorIsWarning]}>
                                      <i className="fa fa-exclamation-circle" />
                                    </span>
                                  ) : (
                                    <span css={[C.trackerDateIndicator, C.trackerDateIndicatorIsFollowUp]}>
                                      <i className="fa fa-circle" />
                                    </span>
                                  ))}
                              </span>
                            )}

                            <span css={C.trackerCaret}>
                              <i className="fa fa-angle-right" />
                            </span>
                          </Link>
                        )
                      })}
                    </section>
                  </section>
                ))}
              </React.Fragment>
            )}
          </PeriodicNow>

          {!this.state.isLoading && !this.state.data.length && (
            <React.Fragment>
              {!this.isArchived() && (
                <UiEmptySlate
                  img={empty}
                  heading="You seem new!"
                  text="Make your first tracker, and start reaching your goals!"
                  action={
                    <UiButton preset="primary" onClick={this.props.onOpenCreateTrackerModal}>
                      Create your first tracker
                    </UiButton>
                  }
                />
              )}

              {this.isArchived() && (
                <UiEmptySlate
                  img={archived}
                  heading="Nothing seems to be here."
                  text="You haven't archived any trackers yet."
                  action={
                    <UiButton preset="primary" link to="/">
                      View all trackers
                    </UiButton>
                  }
                />
              )}
            </React.Fragment>
          )}
        </UiContainer>
      </React.Fragment>
    )
  }
}

export default DashboardHome
