import * as React from 'react'
import s from '@app/styles'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ui = {} as any
ui.Link = styled(props => <Link {...props} />)`
  display: block;
  padding: 8px;
  color: ${s['color-dirty-blue']};
  text-decoration: none;

  &:hover {
    background: ${s['color-silver']};
  }
`

const UiDropdownLink: React.SFC<any> = (props) => {
  return (
    <ui.Link {...props} />
  )
}

export default UiDropdownLink