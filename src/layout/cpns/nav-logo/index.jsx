import React, { memo } from 'react'
import { navLogoCss } from './style'
import { getAssetsUrl } from '@/utils'

const NavLogo = memo(() => {
  return (
    <div css={navLogoCss} className="nav-logo flex-center">
      <div className="logo-icon">
        <img src={getAssetsUrl('LogoWhite')} />
      </div>
      <div className="logo-text">
        <span> king music</span>
      </div>
    </div>
  )
})

export default NavLogo
