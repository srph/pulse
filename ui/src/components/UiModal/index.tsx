/** @jsx jsx */
import * as React from 'react'
import { css, jsx } from '@emotion/core'
import BaseModal from 'react-modal2'
import Portal from '/components/Portal'
import UiPlainButton from '/components/UiPlainButton'
import s from '/styles'

const C = {} as any
C.modal = css`
  .ui-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);

    .ui-modal {
      width: 480px;
      margin: 0 auto;
      margin-top: 64px;
      border-radius: ${s['border-radius']}px;
      outline: 0;
    }
  }
`
C.modalPanel = css`
  padding: 16px;
  background: ${s['color-bw-100']};
  border-radius: ${s['border-radius']}px;
  border: 1px solid ${s['color-bw-300']};
`
C.modalHeading = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid ${s['color-bw-300']};
`
C.modalHeadingTitle = css`
  margin: 0;
  font-size: ${s['font-size-heading']}px;
`
C.modalHeadingClose = css`
  color: ${s['color-bw-500']};
`
C.modalBody = css`
  padding-top: 16px;
`

interface Props {
  title: string
  action: React.ReactNode
  closeOnEsc?: boolean
  closeOnBackdropClick?: boolean
  onClose: () => void
}

class UiModal extends React.Component<Props> {
  static init() {
    BaseModal.getApplicationElement = () => document.getElementById('mount')
  }

  render() {
    return (
      <Portal>
        <div css={C.modal}>
          <BaseModal
            closeOnEsc={this.props.closeOnEsc}
            closeOnBackdropClick={this.props.closeOnBackdropClick}
            onClose={this.props.onClose}
            backdropClassName='ui-modal-overlay'
            modalClassName='ui-modal'>
            <div css={C.modalPanel}>
              <div css={C.modalHeading}>
                <h4 css={C.modalHeadingTitle}>
                  {this.props.title}
                </h4>

                <div css={C.modalHeadingClose}>
                  <UiPlainButton onClick={this.props.onClose}>
                    <i className='fa fa-close' />
                  </UiPlainButton>
                </div>
              </div>

              <div css={C.modalBody}>
                {this.props.children}
              </div>
            </div>
          </BaseModal>
        </div>
      </Portal>
    )
  }
}

export default UiModal