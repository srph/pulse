/** @jsx jsx */
import * as React from 'react'
import { Global, jsx, css } from '@emotion/core'
import s from '~/styles'

interface IUiRootProps {
  children: React.ReactNode
}

export default function UiRoot({ children }: IUiRootProps) {
  return (
    <React.Fragment>
      <Global styles={css`
        * {
          box-sizing: border-box;
        }
        
        html, body {
          font-family: ${s['font-family']};
          font-weight: 400;
          font-size: ${`${s['font-size']}px`};
          background: ${s['color-bw-200']};
          color: ${s['color-text']};
        }

        form {
          /* Fix sanitize.css's default */
          margin-block-end: 0;
        }

        /* Allow footer to be sticky */
        #mount {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
      `} />
      {children}
    </React.Fragment>
  )
}
