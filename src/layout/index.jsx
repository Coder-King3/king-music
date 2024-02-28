import { memo } from 'react'
import { createPortal } from 'react-dom'
import { Outlet } from 'react-router-dom'
import SectionHeader from './cpns/section-header'
import WrapperBackdrop from '@/components/wrapper-backdrop'
import PlayerBar from '@/components/player-bar'
import CustomScrollbars from '@/components/custom-scrollbars'
import { LayoutWrapper } from './style'
import useGlobalToast from '@/hooks/useGlobalToast'
import useScrollFull from '@/hooks/useScrollFull'
import useInitialState from './hook/useInitialState'

const Layout = memo(() => {
  //! other hooks
  useInitialState()
  const GlobalToastContextHolder = useGlobalToast()
  const [scrollBarRef, handleScrollFull] = useScrollFull()

  return (
    <CustomScrollbars
      ref={scrollBarRef}
      scrollBarTheme="dark"
      onScroll={handleScrollFull}
    >
      {/*#ff0000 Layout Wrapper */}
      <LayoutWrapper id="layout-wrapper">
        {/* 头部 */}
        <SectionHeader></SectionHeader>

        {/* 内容 */}
        <div className="layout-content">
          <Outlet></Outlet>
        </div>

        {/* 播放栏 */}
        <PlayerBar></PlayerBar>

        {/* 背景 */}
        {createPortal(
          <WrapperBackdrop></WrapperBackdrop>,
          document.body,
          'WrapperBackdrop'
        )}

        {/* 全局提示 */}
        {GlobalToastContextHolder}
      </LayoutWrapper>
    </CustomScrollbars>
  )
})

export default Layout
