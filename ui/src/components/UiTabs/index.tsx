/** @jsx jsx */
import * as React from 'react'
import { jsx } from '@emotion/core'
import C from './styles'
import { NavLink, NavLinkProps } from 'react-router-dom'

type LinkProps = Omit<NavLinkProps, 'activeClassName'> & {
  icon?: string
}

class UiTabs extends React.Component {
  static Link = (props: LinkProps) => {
    return <NavLink {...props} css={C.link} activeClassName="-active">
      {props.icon && <span css={C.icon}><i className={props.icon} /></span>}
      {props.children}
    </NavLink>
  }

  render() {
    return (
      <div css={C.tabs}>
        {this.props.children}
      </div>
    )
  }
}

export default UiTabs