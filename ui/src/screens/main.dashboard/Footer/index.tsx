/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import UiContainer from '~/components/UiContainer'

const C = {} as any
C.container = css`
  margin-top: auto;
`
C.footer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 32px;
  padding-bottom: 32px;
`
C.text = css`
  margin: 0;
  color: ${s['color-bw-700']};
`
C.social = css`
  display: flex;
`
C.icon = css`
  color: ${s['color-bw-700']};
  text-decoration: none;
  transition: 200ms opacity ease;

  .css-${C.social.name}:hover & {
    opacity: 0.6;
  }

  .css-${C.social.name}:hover &:hover {
    opacity: 1;
  }

  &:not(:last-child) {
    margin-right: 32px;
  }
`

class Footer extends React.Component {
  render() {
    return (
      <div css={C.container}>
        <UiContainer size="lg">
          <footer css={C.footer}>
            <p css={C.text}>Pulse was crafted by Kier Borromeo</p>

            <div css={C.social}>
              <a target="_blank" href="https://github.com/srph/pulse" css={C.icon} title="View the source code, or even contribute some of your own!">
                <i className='fa fa-github' />
              </a>

              <a target="_blank" href="https://twitter.com.com/carebe" css={C.icon} title="Feel free to send me complaints, bugs, or just drop by to say hi!">
                <i className='fa fa-twitter' />
              </a>

              <a target="_blank" href="https://ko-fi.com/carebe" css={C.icon} title="Like this software? Send me a coffee or something!">
                <i className='fa fa-coffee' />
              </a>


              <a href="mailto:seraphipod@gmail.com" css={C.icon} title="Feel free to send me complaints, bugs, or just drop by to say hi!">
                <i className='fa fa-envelope' />
              </a>
            </div>
          </footer>
        </UiContainer>
      </div>
    )
  }
}

export default Footer