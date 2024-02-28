import styled from '@emotion/styled'

export const SongItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: var(--space-xs);
  height: 80px;

  border-radius: var(--rounded-lg);
  transition: var(--buffer-200ms);
  &:hover {
    background: var(--bg-primary_2);

    .control-btn,
    .play-button {
      opacity: 1 !important;
    }
  }
  .cover {
    position: relative;
    margin-right: var(--space-sm);
    width: 64px;
    height: 64px;
    border-radius: var(--rounded-md);
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    .play-button {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      border: none;
      font-size: calc(var(--size-xl) - 2px);
      color: var(--text-primary);
      opacity: 0;
      transition: var(--buffer-200ms);
      backdrop-filter: blur(5px);
      .ant-btn-icon {
        color: var(--text-primary);
        transition: var(--buffer-200ms);
      }
      &:hover .ant-btn-icon {
        transform: scale(1.08);
      }
      &:active .ant-btn-icon {
        transform: scale(0.92);
      }
    }
  }
  .container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info {
      flex: 3;
      .title {
        font-weight: 500;
        font-size: var(--text-md);
        line-height: var(--text-md);
        margin-bottom: var(--space-xs);
      }
      .artist {
        font-size: var(--text-xs);
      }
      .separator {
        margin-left: 1px;
        margin-right: 4px;
        color: var(--text-secondary);
        position: relative;
        top: 0.5px;
      }
    }

    .control {
      display: flex;
      align-items: center;
      justify-content: end;
      flex: 2;
      margin-right: var(--space-xs);
      .control-btn {
        opacity: 0;
        margin-right: var(--space-us);
        &:hover {
          background: transparent;
        }
      }
    }
  }
`
