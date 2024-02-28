import { memo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'
import { lightScrollThumbCss, darkScrollThumbCss } from './style'

const CustomScrollbars = memo(
  forwardRef((props, ref) => {
    //! props/state
    const { scrollBarTheme, children, onScroll } = props

    //! logic code
    // 滚动套渲染样式
    const renderThumb = () => (
      <div
        css={
          scrollBarTheme === 'dark' ? darkScrollThumbCss : lightScrollThumbCss
        }
      />
    )
    // 滚动条配置
    const scrollbarsOptions = {
      autoHide: true,
      autoHideTimeout: 1000,
      renderThumbVertical: renderThumb,
      onScroll
    }

    return (
      <Scrollbars ref={ref} {...scrollbarsOptions}>
        {children}
      </Scrollbars>
    )
  })
)

//! prop types
CustomScrollbars.propTypes = {
  scrollBarTheme: PropTypes.string,
  onScroll: PropTypes.func
}
CustomScrollbars.defaultProps = {
  scrollBarTheme: 'dark',
  onScroll: undefined
}

export default CustomScrollbars
