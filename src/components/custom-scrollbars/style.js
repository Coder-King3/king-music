import { css } from '@emotion/react'

export const lightScrollThumbCss = css`
  background-color: rgba(255, 255, 255, 0.44);
  border-radius: 10px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.55);
  }

  &:active {
    transition: background 0.2s ease-in-out;
    background-color: rgba(255, 255, 255, 0.66);
  }
`

export const darkScrollThumbCss = css`
  background-color: rgba(0, 0, 0, 0.44);
  border-radius: 10px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.55);
  }

  &:active {
    transition: background 0.2s ease-in-out;
    background-color: rgba(0, 0, 0, 0.66);
  }
`
