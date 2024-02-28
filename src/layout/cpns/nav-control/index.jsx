import React, { memo } from 'react'
import { Button } from 'antd'
import SvgIcon from '@/base-ui/svg-icon'
import { NavControlWrapper } from './style'

const NavControl = memo(() => {
  return (
    <NavControlWrapper className="nav-control flex-center">
      <Button
        className="icon-hover-btn"
        icon={<SvgIcon type="setting"></SvgIcon>}
      ></Button>
      <Button
        className="icon-hover-btn"
        icon={<SvgIcon type="theme"></SvgIcon>}
      ></Button>
      <Button
        className="icon-hover-btn"
        icon={<SvgIcon type="switch"></SvgIcon>}
      ></Button>
      <i className="control-gutter"></i>
      <Button
        className="icon-hover-btn"
        icon={<SvgIcon type="arrow-left"></SvgIcon>}
      ></Button>
      <Button
        className="icon-hover-btn"
        icon={<SvgIcon type="arrow-right"></SvgIcon>}
      ></Button>
    </NavControlWrapper>
  )
})

export default NavControl
