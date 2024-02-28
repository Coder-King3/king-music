import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeScrollFullMode } from '@/store/features/common'
// import { throttle, debounce } from '@/utils/StopFrequent'

function useScrollFull() {
  //! redux hooks
  const diapatch = useDispatch()
  const scrollFullMode = useSelector(({ common }) => common.scrollFullMode)
  const setScrollFullMode = (mode) => diapatch(changeScrollFullMode(mode))

  //! other hooks
  const scrollBarRef = useRef(null)
  const isScrollFullRef = useRef(scrollFullMode)

  //! logic code
  const threshold = 5
  const handleScrollFull = () => {
    const { scrollTop } = scrollBarRef.current.getValues()
    if (isScrollFullRef.current === true && scrollTop <= threshold) {
      // console.log('up top')
      setScrollFullMode(false)
      isScrollFullRef.current = false
    } else if (isScrollFullRef.current === false && scrollTop > threshold) {
      // console.log('down content')
      setScrollFullMode(true)
      isScrollFullRef.current = true
    }
  }

  return [scrollBarRef, handleScrollFull]
}

export default useScrollFull
