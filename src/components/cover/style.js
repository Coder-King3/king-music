import styled from '@emotion/styled'

export const CoverWrapper = styled.div`
  .cover {
    position: relative;
    transition: var(--buffer-200ms);
  }

  &.cover-hover {
    &:hover {
      cursor: pointer;
    }
  }

  .cover-container {
    position: relative;
    /* border-radius: ${({ circleBorder }) =>
      circleBorder ? 'var(--rounded-full)' : 'var(--rounded-md)'}; */
    /* overflow: hidden; */

    .operate {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: ${({ circleBorder }) =>
        circleBorder ? 'var(--rounded-full)' : 'var(--rounded-md)'};

      .play-button {
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(249, 250, 251, 1);
        overflow: hidden;
        backdrop-filter: blur(8px);
        background: rgba(255, 255, 255, 0.14);
        border: 1px solid rgba(255, 255, 255, 0.08);
        height: ${({ playButtonSize }) =>
          playButtonSize != 0 ? `${playButtonSize}%` : '22%'};
        width: ${({ playButtonSize }) =>
          playButtonSize != 0 ? `${playButtonSize}%` : '22%'};

        transition: var(--buffer-200ms);
        opacity: ${({ isFocus }) => (isFocus ? 1 : 0)};
        border-radius: var(--rounded-full);
        cursor: default;
        transform: scale(1.00001);

        .svg-icon {
          /* width: 18px; */
          /* height: 18px; */
          /* font-size: 18px; */
          font-size: var(--size-xl);
          transform: translate(2px, 1px);
          /* margin: 1px 0 0 3px; */
        }
        &:hover {
          background: rgba(255, 255, 255, 0.28);
        }
        &:active {
          transform: scale(0.94);
        }
      }
      z-index: 3;
    }

    .cover-iamge {
      border-radius: ${({ circleBorder }) =>
        circleBorder ? 'var(--rounded-full)' : 'var(--rounded-md)'};
      width: 100%;
      user-select: none;
      aspect-ratio: 1 / 1;
      border: 1px solid rgba(0, 0, 0, 0.04);

      transition: var(--buffer-200ms);
      transform: scale(${({ isFocus }) => (isFocus ? 1.05 : 1)});
      overflow: hidden;
    }
    .scale-box {
      display: inline-block;
      width: 100%;
      height: auto;
      border-radius: ${({ circleBorder }) =>
        circleBorder ? 'var(--rounded-full)' : 'var(--rounded-md)'};
      overflow: hidden;
    }

    .shadow {
      position: absolute;
      top: 12px;
      height: 100%;
      width: 100%;
      filter: blur(16px) opacity(0.6);
      transform: scale(0.92, 0.96);
      z-index: -1;
      transition: var(--buffer-200ms);
      background-size: cover;
      border-radius: ${({ circleBorder }) =>
        circleBorder ? 'var(--rounded-full)' : 'var(--rounded-md)'};
      aspect-ratio: 1 / 1;
      background-image: ${({ shadowBg }) => `url(${shadowBg})`};
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: var(--buffer-200ms);
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
`
