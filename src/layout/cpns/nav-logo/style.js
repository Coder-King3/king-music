import { css } from '@emotion/react'

export const navLogoCss = css`
  justify-content: start;

  .logo-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--rounded-md);
    transition: var(--buffer-200ms);
    width: 32px;
    height: 32px;
    background-image: var(--entity-color-gradient);
    img {
      width: 65%;
      height: 65%;
    }
  }
  .logo-text {
    transition: var(--buffer-200ms);
    /* color: ; */
    margin-left: var(--space-xs);
    font-size: var(--text-lg);
  }
`
