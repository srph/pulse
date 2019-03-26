import * as React from 'react'
import styled from 'styled-components'
import s from '@app/styles'
import Link from './Link'
import Main from './Main'
import Menu from './Menu'
import Separator from './Separator'
import * as utils from './utils'

const ui = {} as any
ui.Dropdown = styled.div`
  position: relative;
`
ui.DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 16px;
  right: 0;
  padding-top: 4px;
  padding-bottom: 4px;
  background: ${s['color-white']};
  border: 1px solid ${s['color-silver']};
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: ${s['z-index-popover']};
`

interface IUiDropdownProps {
  children: any
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

class UiDropdown extends React.Component<IUiDropdownProps> {
  static Link = Link
  static Body = Main
  static Menu = Menu
  static Separator = Separator

  containerNode: HTMLElement
  menuNode: HTMLElement

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscape)
    document.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick)
    document.removeEventListener('keydown', this.handleEscape)
  }

  render() {
    const children = React.Children.toArray(this.props.children)
    const main = children.find((child: React.ReactElement<any>) => child.type === Main) as React.ReactElement<any>
    const menu = children.find((child: React.ReactElement<any>) => child.type === Menu) as React.ReactElement<any>
    
    return (
      <ui.Dropdown
        ref={c => this.containerNode = c}>
        {Boolean(main) && main.props.children}

        {this.props.isOpen && <ui.DropdownMenu ref={c => (this.menuNode = c)}>{Boolean(menu) && menu.props.children}</ui.DropdownMenu>}
      </ui.Dropdown>
    )
  }

  handleEscape = evt => {
    if (evt.keyCode === 27 && this.props.isOpen) {
      this.props.onClose()
    }
  }

  handleClick = evt => {
    // Handler for when the user clicks the dropdown menu
    if (this.props.isOpen && this.menuNode.contains(evt.target)) {
      if (utils.isDescendantOfAnchor(evt.target)) {
        // Allow link inside the dropdown menu to do its side-effects before auto-closing the dropdown.
        setTimeout(() => this.props.onClose(), 0)
      }
    }
    
    // Handler for when the user clicks the dropdown menu
    else if (this.containerNode.contains(evt.target)) {
      if (this.props.isOpen) {
        this.props.onClose()
      } else {
        this.props.onOpen()
      }
    }
    
    // Handler for when the user clicks outside the dropdown menu
    else if (this.props.isOpen) {
      this.props.onClose()
    }
  }
}

export default UiDropdown
