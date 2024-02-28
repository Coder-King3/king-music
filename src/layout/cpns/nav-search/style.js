import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const SearchWrapper = styled.div`
  position: static;
  top: ${({ postion }) => postion.top};
  left: ${({ postion }) => postion.left};
  transform: translate(
    -${({ postion }) => postion.translate},
    -${({ postion }) => postion.translate}
  );
  flex-direction: column;
  transition: var(--buffer-500ms);
  color: var(--text-primary);

  .search-wrapper_title {
    /* show mode */
    height: 0px;
    width: 0px;
    margin: 0px;
    overflow: hidden;
    transition: var(--buffer-500ms);

    /* style */
    font-size: calc(var(--text-md) * 3);
    font-weight: bold;
    .title-rounded {
      height: 55px;
      font-size: var(--text-3ul);
      margin-left: var(--space-sm);
      padding: 0 calc(var(--space-sm) - 2px);
      border-radius: var(--rounded-xl);
      background: var(--entity-color-gradient);
      color: var(--text-primary);
    }
    color: var(--text-primary);
    text-shadow: 0px 0px 12px rgba(var(--bg-secondary_1--num), 0.3);
  }

  .search-wrapper_content {
    position: relative;
    width: 300px;
    height: 40px;
    line-height: 40px;
  }
`

export const searchModeCss = css`
  position: absolute !important;
  z-index: 1;
`

export const showSearchTitleCss = css`
  margin-bottom: var(--space-lg) !important;
  height: 70px !important;
  width: 450px !important;
`

export const showSearchContentCss = css`
  width: 345px !important;

  .search-input,
  .search-submit {
    height: 40px;
    background: rgba(var(--bg-secondary_1--num), 0.5);
    backdrop-filter: blur(20px);
    box-shadow: 0px 0px 12px rgba(var(--bg-secondary_1--num), 0.3);
    border: 1px solid rgba(var(--boder-secondary_1--num), 0.5);
    &:hover {
      border-color: rgba(var(--boder-secondary_1--num), 0.2) !important;
      background-color: rgba(var(--bg-secondary_1--num), 0.5);
    }
  }

  .search-input {
    font-family: var(--body-font);
    width: 300px;
    font-size: var(--text-md);
    color: var(--text-primary);

    /* text-align: center; */
  }

  .search-submit {
    padding: 0;
    width: 40px;
    margin-left: calc(var(--space-us) + 2px);
    font-size: var(--text-xl);
    line-height: var(--text-xl);

    .ant-btn-icon {
      color: rgba(var(--boder-secondary_1--num), 0.8);
    }
  }
`

export const denoSearchContentCss = css`
  &:hover {
    .search-close {
      opacity: 1;
    }
  }

  .search-input {
    padding: 0 calc(var(--space-lg) * 2);
    width: 320px;
    height: 100%;
    background-color: rgba(var(--bg-secondary_2--num), 0.5);
    font-family: var(--body-font);
    font-size: var(--text-md);
    font-weight: 500;
    color: var(--text-primary);
    border: none;
    border-radius: var(--rounded-md);
    box-shadow: 0 0 0 2px rgba(var(--shadow-primary_1--num), 0.02);

    &::placeholder {
      font-family: var(--body-font);
      color: var(--text-secondary);
      font-size: var(--text-md);
      font-weight: 500;
    }
  }

  .search-submit {
    position: absolute;
    left: 5px;
  }

  .search-close {
    position: absolute;
    right: 5px;
    opacity: 0;
  }
`
