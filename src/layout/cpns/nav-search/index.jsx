import React, { memo, useEffect, useState } from 'react'
import { Input, Button } from 'antd'
import classNames from 'classnames'
import SvgIcon from '@/base-ui/svg-icon'
import {
  SearchWrapper,
  searchModeCss,
  showSearchTitleCss,
  showSearchContentCss,
  denoSearchContentCss
} from './style'
import enhancedState from './hoc/enhanced-state'
import eventBus from '@/utils/eventBus'

const NavSearch = memo((props) => {
  //! props and state
  const {
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
  } = props
  const [isModeStyle, setIsModeStyle] = useState(false)

  //! other hooks
  useEffect(() => {
    if (!searchMode) return

    setIsTranslate(true)
    setPostion({
      top: '45%',
      left: '50%',
      translate: '50%'
    })
    setIsModeStyle(true)
  }, [searchMode])

  //! logic code
  const handleSearchClick = () => {
    // 为空则return
    if (!keywords || (keywords && keywords.trim() == '')) return
    setSearchLoading(true)

    // 关闭搜索模式
    if (searchMode == true) handleUpdateMode(false)

    // 调用搜索事件
    if (keywords.trim() == oldKeywordsRef.current.trim()) {
      if (searchMode != true) {
        setTimeout(() => {
          setSearchLoading(false)
        }, 1000)
      }
      return
    }

    const querys = [
      [
        { type: 'artists' },
        { type: 'albums' },
        { type: 'songs' },
        { type: 'playlists' }
      ]
    ]
    const emitSearchOptions = [
      // keywords, querys, cycleStartFns, cycleEndFns
      keywords,
      querys,
      null,
      [() => setSearchLoading(false)]
    ]

    eventBus.emit('search', ...emitSearchOptions)
    oldKeywordsRef.current = keywords
  }
  const handleClearClick = () => {
    setKeywords(null)
    if (searchMode == false) handleUpdateMode(true)
  }
  const handleUpdateMode = (mode) => {
    if (mode == false) {
      setIsTranslate(false)
      const { x, y } = searchColRef.current.getBoundingClientRect()
      const postionY = `${y + 80 + (58 - 40) / 2}px`
      const postionX = `${x}px`

      setPostion({
        top: postionY,
        left: postionX,
        translate: '0'
      })

      setIsModeStyle(false)
      setTimeout(() => {
        setSearchMode(false)
        if (keywords.trim() == oldKeywordsRef.current.trim())
          setSearchLoading(false)
      }, 1000)
    } else {
      setSearchMode(true)
    }
  }

  return (
    <SearchWrapper
      className="search-wrapper flex-center"
      postion={postion}
      css={searchMode ? searchModeCss : null}
    >
      <div
        className="search-wrapper_title flex-center"
        css={isModeStyle ? showSearchTitleCss : null}
      >
        <span>KingMusic</span>
        <span className="title-rounded flex-center">Search</span>
      </div>
      <div
        className="search-wrapper_content flex-center"
        css={isModeStyle ? showSearchContentCss : denoSearchContentCss}
      >
        <Input
          className="search-input "
          value={keywords}
          placeholder={!isModeStyle ? 'Search' : ''}
          onChange={({ target }) => setKeywords(target.value)}
          onKeyDown={({ code }) => code == 'Enter' && handleSearchClick()}
        ></Input>
        <Button
          className={classNames('search-submit', {
            'icon-hover-btn': !isModeStyle
          })}
          icon={<SvgIcon type="search"></SvgIcon>}
          loading={searchLoading}
          onClick={handleSearchClick}
        ></Button>
        {!searchMode && (
          <Button
            className="search-close icon-hover-btn"
            icon={<SvgIcon type="close"></SvgIcon>}
            onClick={handleClearClick}
          ></Button>
        )}
      </div>
    </SearchWrapper>
  )
})

export default enhancedState(NavSearch)
