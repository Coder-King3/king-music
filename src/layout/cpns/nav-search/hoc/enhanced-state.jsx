import React, { memo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { changeSearchMode } from '@/store/features/common'

const enhancedSatte = (OriginComponent) => {
  return memo((props) => {
    //! props and state
    const { searchColRef, setIsTranslate } = props
    const [keywords, setKeywords] = useState(null)
    const [searchLoading, setSearchLoading] = useState(false)
    const [postion, setPostion] = useState({
      top: '0',
      left: '0',
      translate: '0'
    })
    //! redux hooks
    const dispatch = useDispatch()
    const searchMode = useSelector(({ common }) => common.searchMode)
    const setSearchMode = (mode) => dispatch(changeSearchMode(mode))

    //! other hooks
    const oldKeywordsRef = useRef('oldKeywordsRef')

    //! logic code
    const searchProps = () => ({
      searchColRef,
      setIsTranslate,
      postion,
      setPostion,
      keywords,
      setKeywords,
      oldKeywordsRef,
      searchLoading,
      setSearchLoading,
      searchMode,
      setSearchMode
    })

    return (
      <>
        {searchMode ? (
          createPortal(
            <OriginComponent {...searchProps()}></OriginComponent>,
            document.body,
            'NavSearchMode'
          )
        ) : (
          <OriginComponent {...searchProps()}></OriginComponent>
        )}
      </>
    )
  })
}

export default enhancedSatte
