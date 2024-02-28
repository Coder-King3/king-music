import styled from '@emotion/styled'

export const SearchWrapper = styled.div`
  .ant-row {
    margin-bottom: var(--space-xl);
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .track-card {
    .cover-row,
    .song-list {
      padding: 0px 0px var(--space-us) 0px;
    }
  }

  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: var(--buffer-500ms);
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: var(--buffer-500ms);
  }
`
