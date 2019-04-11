/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import { VictoryGroup, VictoryArea, VictoryLine, VictoryScatter, VictoryChart, VictoryAxis } from 'victory'
import { ClonedProps } from '~/screens/main.dashboard.tracker/types'
import padDate from '~/utils/padDate'
import { format } from 'date-fns'
import random from '~/utils/random';

const box = {
  width: 600,
  height: 300
}

const styles = {
  chart: {
    parent: {
      height: box.height,
      width: box.width
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
      stroke: s['color-bw-400'],
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

class DashboardTrackerStats extends React.Component<ClonedProps, {}> {
  render() {
    const months = Array(12)
      .fill(0)
      .map((_, i: number) => format(new Date(2019, i, 1), 'MMM'))

    const data = this.props.tracker.labels.map(label => (
      months.map((month, i) => ({
        x: month,
        y: this.getEntryCountForLabel(i, label)
      }))
    ))

    return (
      <div>
        <h4>Entry Count / Label</h4>
        <VictoryChart style={styles.chart} domain={{ y: [0, 31] }} height={box.height} width={box.width}>
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
      </div>
    )
  }

  getEntryCountForLabel(month: number, label: AppDataTrackerLabel): number {
    const entries: AppDataTrackerEntry[] = Object.values(this.props.tracker.entries)
    const date = new RegExp(`^2019-${padDate(month)}`)
    return entries.filter(entry => entry.label.id === label.id && date.test(entry.entry_date)).length || random(10, 31)
  }
}

export default DashboardTrackerStats
