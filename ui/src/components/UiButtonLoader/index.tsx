import * as React from 'react'
import UiButton, { UiButtonProps } from '/components/UiButton'

type Props = UiButtonProps & {
  isLoading: boolean
}

export default function UiButtonLoader({ isLoading, ...props }: Props) {
  return (
    <UiButton {...props} disabled={isLoading || props.disabled}>
      {isLoading ? 'Loading...' : props.children}
    </UiButton>
  )
}