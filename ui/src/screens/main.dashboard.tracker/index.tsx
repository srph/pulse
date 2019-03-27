/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import { Link } from 'react-router-dom'
import UiContainer from '/components/UiContainer'
import UiButtonLink from '/components/UiButtonLink'
import UiDropdown from '/components/UiDropdown'
import UiInput from '/components/UiInput'
import UiField from '/components/UiField'
import UiSpacer from '/components/UiSpacer'
import UiButton from '/components/UiButton'
import UiInputColorPicker from '/components/UiInputColorPicker'
import { format, getDaysInMonth } from 'date-fns'
import s from '/styles'

interface State {
  color: string
  isCreatingLabel: boolean
}

const C = {} as any
C.title = css`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: ${s['font-size-title']}px;
`
C.wrapper = css`
  display: flex;
  padding-bottom: 64px;
`
C.calendar = css`
  display: flex;
  width: 100%;
  margin-right: 16px;
`
C.calendarColumn = css`
  width: ${(1 / 13) * 100}%;
`
C.calendarBox = css`
  border: 1px solid ${s['color-bw-400']};

  .css-${C.calendarColumn.name}:not(:last-child) & {
    border-right-color: transparent;
  }

  &:not(:last-child) {
    border-bottom-color: transparent;
  }
`
C.calendarBoxInner = css`
  position: relative;
  padding-bottom: 100%;
`
C.calendarBoxContent = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
C.calendarBoxTitle = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 600;
`
C.labelSection = css`
  flex-shrink: 0;
  width: 180px;
`
C.labelMenu = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`
C.labelMenuHeading = css`
  margin: 0;
  text-transform: uppercase;
`
C.labelContainer = css`
  position: relative;

  &:last-child {
    margin-bottom: 32px;
  }
`
C.label = css`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  text-transform: uppercase;
  background: ${s['color-bw-800']};
  border-radius: ${s['border-radius']}px;
`
C.labelColor = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  height: 48px;
  width: 48px;
  color: ${s['color-bw-100']};
  font-weight: 600;
  font-size: 8px;
  background: ${s['color-blue-500']};
  border-radius: ${s['border-radius']}px;
`
C.labelName = css`
  color: ${s['color-bw-100']};
  font-weight: 600;
  font-size: ${s['font-size-subtitle']}px;
`
C.labelActions = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 100%;
  margin-left: 16px;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: 100ms all ease;

  .css-${C.labelContainer.name}:hover & {
    opacity: 1;
  }
`
C.labelAction = css`
  display: inline-block;
  padding: 0;
  color: ${s['color-bw-700']};
  background: transparent;
  border: 0;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 16px;
  }
`
C.popover = css`
  padding: 12px 16px;
  width: 320px;
`

const columns = Array(13).fill(0)
const boxes = Array(32).fill(0)

class DashboardTracker extends React.Component<{}, State> {
  state = {
    color: '',
    isCreatingLabel: false
  }
  
  render() {
    return (
      <UiContainer size="lg">
        <h4 css={C.title}>Jakol Tracker 2018</h4>

        <div css={C.wrapper}>
          <div css={C.calendar}>
            {columns.map((_, columnIndex: number) => (
              <div css={C.calendarColumn} key={columnIndex} data-column>
                {boxes.map((_, boxIndex: number) => (
                  <div css={C.calendarBox} data-calendar-box key={boxIndex}>
                    <div css={C.calendarBoxInner}>
                      <div css={C.calendarBoxContent}>
                        {columnIndex > 0 && boxIndex === 0 && (
                          <div css={C.calendarBoxTitle}>{format(new Date(2019, columnIndex - 1), 'MMM')}</div>
                        )}

                        {columnIndex === 0 && boxIndex > 0 && (
                          <div css={C.calendarBoxTitle}>{boxIndex}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div css={C.labelSection}>
            <div css={C.labelMenu}>
              <h5 css={C.labelMenuHeading}>
                Labels
              </h5>

              <UiDropdown isOpen={this.state.isCreatingLabel} onOpen={() => this.setState({ isCreatingLabel: true })} onClose={() => this.setState({ isCreatingLabel: false })}>
                <UiDropdown.Body>
                  <UiButtonLink icon="fa fa-plus">
                    New
                  </UiButtonLink>
                </UiDropdown.Body>

                <UiDropdown.Menu>
                  <div css={C.popover}>
                    <UiDropdown.Heading text="Create New Label" />

                    <UiField label="Name">
                      <UiInput type="text" />
                    </UiField>

                    <UiSpacer />

                    <UiField label="Color">
                      <UiInputColorPicker value={this.state.color} onChange={(color) => this.setState({ color })} type="text" />
                    </UiField>

                    <UiSpacer />

                    <UiButton preset="primary">
                      Create
                    </UiButton>
                  </div>
                </UiDropdown.Menu>
              </UiDropdown>
            </div>

            <section>
              <div css={C.labelContainer}>
                <div css={C.label}>
                  <div css={C.labelColor}>
                    Alt + 1
                  </div>
                  
                  <span css={C.labelName}>
                    Muntik Lang
                  </span>
                </div>

                <div css={C.labelActions}>
                  <button type="button" css={C.labelAction}>
                    <i className='fa fa-pencil' />
                  </button>

                  <button type="button" css={C.labelAction}>
                    <i className='fa fa-trash' />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </UiContainer>
    )
  }
}

export default DashboardTracker
