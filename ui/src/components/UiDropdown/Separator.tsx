import * as React from 'react'
import s from '@app/styles'
import styled from 'styled-components'

const ui = {} as any
ui.Separator = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
`
ui.SeparatorLine = styled.div`
height: 1px;
  background: ${s['color-silver']};
`

const UiDropdownSeparator: React.SFC<any> = (props) => {
  return (
    <ui.Separator>
      <ui.SeparatorLine />
    </ui.Separator>
  )
}

export default UiDropdownSeparator