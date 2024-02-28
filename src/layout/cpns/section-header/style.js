import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0px;
  z-index: 1;
  padding: var(--space-md) calc(var(--space-md) * 3);
  transition: var(--buffer-200ms);
`

export const sectionHeaderCss = css`
  --header-width: 62px;

  padding: 0 var(--space-lg);
  height: var(--header-width);
  display: flex;
  align-items: center;
  /* line-height: 66px; */
  /* font-size: 18px; */
  font-weight: bold;
  transition: var(--buffer-200ms);
  .ant-row {
    flex: 1;
    .ant-col,
    .header-right,
    .nav-logo,
    .nav-info,
    .nav-control {
      height: calc(var(--header-width) - 2px);
    }
  }
`

export const isTranslateCss = css`
  transform: translateY(-80px);
`

export const scrollFullCss = css`
  padding: 0;
  margin-bottom: 10px;
  background-color: var(--bg-primary_1);
  .layout-header {
    border-radius: 0px;
    box-shadow: 0px 5px 12px rgba(var(--bg-secondary_1--num), 0.6);
  }
`

export const headerRightCss = css`
  &,
  .header-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
