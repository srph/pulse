/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import UiSpacer from '~/components/UiSpacer'
import UiContainer from '~/components/UiContainer'
import UiPlaceholderBlock from '~/components/UiPlaceholderBlock'

const C = {} as any
C.heading = css`
  height: 68px;
  display: flex;
  align-items: center;
`
C.tabs = css`
  display: flex;
`
C.tab = css`
  margin-right: 16px;
`
C.layout = css`
  display: flex;
`
C.calendar = css`
  width: 100%;
  margin-right: 16px;
`
C.side = css`
  flex-shrink: 0;
  width: 180px;
`
C.actions = css`
  display: flex;
  justify-content: space-between;
`

function LoadingPlaceholder() {
  return (
    <div>
      <UiPlaceholderBlock shape="rounded" height="auto">
        <UiContainer size="lg">
          <div css={C.heading}>
            <UiPlaceholderBlock height={16} width={240} shape="rounded" darker />
          </div>
        </UiContainer>
      </UiPlaceholderBlock>
      <UiSpacer />
      
      <UiContainer size="lg">
        <div css={C.tabs}>
          <div css={C.tab}>
            <UiPlaceholderBlock shape="rounded" height={36} width={64} />
          </div>

          <div css={C.tab}>
            <UiPlaceholderBlock shape="rounded" height={36} width={64} />
          </div>

          <div css={C.tab}>
            <UiPlaceholderBlock shape="rounded" height={36} width={64} />
          </div>
        </div>

        <UiSpacer size="xxl" />

        <div css={C.layout}>
          <div css={C.calendar}>
            <UiPlaceholderBlock shape="rounded" />
          </div>

          <div css={C.side}>
            <div css={C.actions}>
            <UiPlaceholderBlock height={14} width={40} shape="rounded" />
            <UiPlaceholderBlock height={24} width={40} shape="rounded" />
            </div>
            <UiSpacer size="sm" />

            <UiPlaceholderBlock height={48} shape="rounded" />
            <UiSpacer size="sm" />

            <UiPlaceholderBlock height={48} shape="rounded" />
            <UiSpacer size="sm" />

            <UiPlaceholderBlock height={48} shape="rounded" />
            <UiSpacer size="sm" />

            <UiPlaceholderBlock height={48} shape="rounded" />
            <UiSpacer size="sm" />
          </div>
        </div>
      </UiContainer>
    </div>
  )
}

export default LoadingPlaceholder