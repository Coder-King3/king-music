import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const wrapperBackdropCss = css`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  user-select: none;
`

export const BackdropImage = styled.div`
  width: 100%;
  height: 100%;
  transform: scale(1);
  filter: blur(0px) brightness(1);
  background-repeat: no-repeat;
  background: url(${({ bgUrl }) => bgUrl}) 0% 0% / cover;
  background-position: center center;
`

export const BackdropVideo = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
