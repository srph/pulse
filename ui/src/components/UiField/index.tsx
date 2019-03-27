/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '/styles'

interface UiFieldProps {
  id?: string
  label: string
  children: JSX.Element
  disabled?: boolean
  error?: string
  spacer?: boolean
  actions?: React.ReactNode
  isRequired?:  boolean
}

const C = {} as any
C.field = css`
  transition: 250ms all ease;
`
C.fieldDisabled = css`
  opacity: 0.5;
`
C.label = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  font-family: ${s['font-family-heading']};
  font-size: 12px;
  color: ${s['color-dark-silver']};
  margin-bottom: 8px;
  text-transform: uppercase;
`
C.labelRequired = css`
  color: ${s['color-red']};
  margin-left: 4px;
`
C.labelError = css`
  font-size: 10px;
  background: red;
  padding: 4px;
  color: ${s['color-white']};
`
C.actions = css`
  display: flex;
  align-items: center;
`
C.actionsItem = css`
  &:not(:last-child) {
    margin-right: 8px;
  }
`

const UiField: React.SFC<UiFieldProps> = (props) => {
  const actions = props.actions ? (Array.isArray(props.actions) ? props.actions : [props.actions]) : []
  return (
    <div css={[C.field, props.disabled && c.fieldDisabled]} spacer={props.spacer}>
      <label css={C.label} htmlFor={props.id}>
        <span>{props.label} {props.isRequired && <span css={C.labelRequired}>*</span>}</span>
        {props.error && Boolean(props.error.length) && <div css={C.labelError}>Invalid JSON!</div>}
        {Boolean(actions.length) && (
          <div css={C.actions}>
            {actions.map((action, i) => (
              <div css={C.actionsItem} key={i}>
                {React.cloneElement(action, { disabled: action.props.disabled || props.disabled })}
              </div>
            ))}
          </div>
        )}
      </label>
      {React.cloneElement(props.children, {
        id: props.id,
        disabled: props.disabled
      })}
    </div>
  )
}

UiField.defaultProps = {
  isRequired: false
}

export default UiField