import * as React from 'react'
import UiButton, { UiButtonProps } from '~/components/UiButton'

type Props = UiButtonProps & {
  // Typescript says this property doesn't exist in UiButtonProp when it DOES.
  // So we'll put this here anyway.
  disabled?: boolean
  isLoading: boolean
}

export default function UiButtonLoader({ isLoading, ...props }: Props) {
  return (
    <UiButton {...props} disabled={isLoading || props.disabled}>
      {isLoading ? 'Loading...' : props.children}
    </UiButton>
  )
}