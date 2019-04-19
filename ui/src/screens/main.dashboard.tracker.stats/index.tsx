/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import { VictoryGroup, VictoryArea, VictoryLine, VictoryScatter, VictoryChart, VictoryAxis } from 'victory'
import { ClonedProps } from '~/screens/main.dashboard.tracker/types'
import ContainerWidthSizer from '~/components/ContainerWidthSizer'
import UiPanel from '~/components/UiPanel'
import padDate from '~/utils/padDate'
import { format } from 'date-fns'
import random from '~/utils/random';
import getTrackerYear from '~/utils/tracker/getTrackerYear';
import C from '~screens/main.dashboard.tracker.home/LabelMenuStreak/styles';

const styles = {
  chart: {
    parent: {
      height: 400,
      // border: `1px solid ${s['color-bw-600']}`
    }
  },
  xAxis: {
    axis: {
      stroke: s['color-bw-500'],
      strokeWidth: 1
    },
    tickLabels: {
      fill: s['color-bw-700'],
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: s['font-family']
    }
  },
  yAxis: {
    axis: {
      // stroke: s['color-bw-500'],
      strokeWidth: 0
    },
    tickLabels: {
      fontFamily: s['font-family'],
      fill: s['color-bw-600']
    },
    grid: {
      stroke: s['color-bw-200'],
      strokeWidth: 1
    }
  },
  group: {
    data: {
      strokeWidth: 2,
      strokeLinecap: 'round',
      fillOpacity: 0.5
    }
  }
}

const C = {} as any
C.list = css`
  display: flex;
`
C.label = css`
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid ${s['color-bw-200']};
  border-radius: ${s['border-radius']}px;

  &:not(:last-child) {
    margin-right: 32px;
  }
`
C.labelCircle = css`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin-right: 12px;
`
C.labelText = css`
  color: ${s['color-bw-700']};
`

class DashboardTrackerStats extends React.Component<ClonedProps, {}> {
  render() {
    const year = getTrackerYear(this.props.tracker)

    const months = Array(12)
      .fill(0)
      .map((_, i: number) => format(new Date(year, i, 1), 'MMM'))

    const data = this.props.tracker.labels.map(label => (
      months.map((month, i) => ({
        x: month,
        y: this.getEntryCountForLabel(i, label)
      }))
    ))

    return (
      <div>
        <UiPanel>
          <div css={C.list}>
            {this.props.tracker.labels.map((label, i) => (
              <div css={C.label}>
                <div css={C.labelCircle} style={{ background: label.color}} />
                <span css={C.labelText}>{label.name}</span>
              </div>
            ))}
          </div>

          <ContainerWidthSizer>
            {({ width }) => (
              <VictoryChart style={styles.chart} domain={{ y: [0, 31] }} height={400} width={width}>
                <VictoryAxis crossAxis style={styles.xAxis} />
                <VictoryAxis dependentAxis crossAxis orientation="left" style={styles.yAxis} />
                <VictoryGroup
                  style={styles.group}
                  colorScale={this.props.tracker.labels.map(label => label.color)}
                  offset={16}>
                  {data.map((data, i) => (
                    <VictoryLine
                      key={i}
                      interpolation="stepAfter"
                      data={data}
                    />
                  ))}
                </VictoryGroup>

                <VictoryGroup
                  style={styles.group}
                  colorScale={this.props.tracker.labels.map(label => label.color)}
                  offset={16}>
                  {data.map((data, i) => (
                    <VictoryArea
                    key={i}
                      interpolation="stepAfter"
                      data={data}
                    />
                  ))}
                </VictoryGroup>

                <VictoryGroup
                  style={styles.group}
                  colorScale={this.props.tracker.labels.map(label => label.color)}
                  offset={16}>
                  {data.map((data, i) => (
                    <VictoryScatter
                    key={i}
                      data={data}
                    />
                  ))}
                </VictoryGroup>
              </VictoryChart>
            )}
          </ContainerWidthSizer>
        </UiPanel>
      </div>
    )
  }

  getEntryCountForLabel(month: number, label: AppDataTrackerLabel): number {
    const entries: AppDataTrackerEntry[] = Object.values(this.props.tracker.entries)
    const yy = getTrackerYear(this.props.tracker)
    const mm = padDate(month)
    const date = new RegExp(`^${yy}-${mm}`)
    return entries.filter(entry => entry.label.id === label.id && date.test(entry.entry_date)).length
  }
}

export default DashboardTrackerStats
