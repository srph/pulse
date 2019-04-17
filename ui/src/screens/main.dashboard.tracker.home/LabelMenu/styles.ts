import { css } from '@emotion/core'
import s from '~/styles'

const C = {} as any

C.labelSection = css`
  position: relative;
  z-index: ${s['z-index-tracker-calendar-labels']};
  flex-shrink: 0;
  width: 200px;
  padding-left: 26px;
`
C.labelAffix = css`
  position: sticky;
  top: 16;
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
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 32px;
  }
`
C.labelPlaceholder = css`
  flex-shrink: 0;
  width: 16px;
  margin-right: 8px;
`
C.labelCheck = css`
  position: absolute;
  top: 12px;
  left: -26px;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  font-size: 8px;
  border-radius: 50%;
  color: ${s['color-bw-100']};
  background: ${s['color-bw-800']};
`
C.labelList = css`
  margin-bottom: 16px;
`
C.label = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  text-transform: uppercase;
  background: ${s['color-bw-100']};
  border: 0;
  border-radius: ${s['border-radius']}px;
  border-top-left-radius: ${s['border-radius'] + 2}px;
  border-bottom-left-radius: ${s['border-radius'] + 2}px;
  border: 1px solid ${s['color-bw-200']};
  cursor: pointer;
  outline: 0;
  transition: 200ms all ease;
`
C.labelIsActive = css`
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  border-color: ${s['color-bw-400']};
`
C.labelColor = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  height: 40px;
  width: 40px;
  color: ${s['color-bw-900']};
  font-weight: 800;
  font-size: 9px;
  background: ${s['color-blue-500']};
  border-radius: ${s['border-radius']}px;
`
C.labelColorIsDark = css`
  color: ${s['color-bw-900']};
`
C.labelName = css`
  color: ${s['color-text']};
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
C.labelActionsIsActive = css`
  opacity: 1;
`
C.labelAction = css`
  &:not(:last-child) {
    margin-right: 16px;
  }
`
C.labelActionButton = css`
  display: inline-block;
  padding: 0;
  color: ${s['color-bw-700']};
  background: transparent;
  border: 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`

export default C