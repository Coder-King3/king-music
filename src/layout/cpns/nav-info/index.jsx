import React, { memo } from 'react'
import { Avatar } from 'antd'
import SvgIcon from '@/base-ui/svg-icon'
import { navInfoCss } from './style'
import { getAssetsUrl } from '@/utils'

const NavLogo = memo(() => {
  return (
    <div css={navInfoCss} className="nav-info flex-center">
      <Avatar
        className="info-avatar"
        icon={<SvgIcon type="user-out-lined"></SvgIcon>}
      ></Avatar>
      <span className="info-name">未登录</span>
    </div>
  )
})

export default NavLogo
