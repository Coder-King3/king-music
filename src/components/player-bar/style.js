import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const PlayerBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;

  .player {
    position: relative;
    overflow: hidden;
    height: 80px;
    margin: var(--space-lg) calc(var(--space-lg) * 4);
    margin-top: 0px;
    border-radius: var(--rounded-lg);
    background-color: rgba(var(--bg-primary_1--num), 60%);
    backdrop-filter: blur(20px);
    box-shadow: 2px 2px 12px rgba(var(--bg-secondary_1--num), 69%);
  }
`

export const ProgressBarCss = css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  /* height: 100%; */
  /* overflow: hidden; */
  /* border-radius: var(--rounded-lg); */
  /* background-color: red; */

  .ant-slider {
    margin: 0;
    transform: translate(0, -4px);
    border-top-left-radius: 10%;
    &:hover {
      .ant-slider-handle {
        opacity: 1;
      }
      .ant-slider-track,
      .ant-slider-step,
      .ant-slider-rail {
        height: 6px !important;
      }
    }
    .ant-slider-track,
    .ant-slider-handle {
      transition: var(--buffer-200ms);
    }
    .ant-slider-handle {
      opacity: 0;
      .ant-tooltip.ant-slider-tooltip {
        opacity: 0;
        transition: opacity 200ms var(--buffer-timifunc);
      }
      &:hover {
        .ant-tooltip.ant-slider-tooltip {
          opacity: 1;
        }
      }
      &::after {
        width: 6px;
        height: 6px;
      }
      &::before,
      &::after {
        box-shadow: none !important;
      }
      &,
      &::after {
        transform: translateY(4px);
      }
    }
  }
`
