import styled from '@emotion/styled'

export const CoverRowWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columnNumber }) => columnNumber}, 1fr);
  gap: ${({ gap }) => gap};

  .item {
    /* color: var(--color-text); */
    .text {
      margin-top: var(--space-xs);
      height: 40px;
      ${({ noSub }) =>
        noSub
          ? `
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          `
          : ''}
      .title {
        font-size: var(--text-xs);
        font-weight: 600;
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-break: break-all;
      }
      .info {
        font-size: 12px;
        opacity: 0.68;
        line-height: 18px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-break: break-word;
      }
    }
  }

  .item.artist {
    display: flex;
    flex-direction: column;
    text-align: center;
    .cover {
      display: flex;
    }

    .title {
      /* margin-top: 4px; */
    }
  }
`
