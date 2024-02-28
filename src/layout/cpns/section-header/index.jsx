import React, { memo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'antd'
import NavSearch from '../nav-search'
import NavControl from '../nav-control'
import NavLogo from '../nav-logo'
import NavInfo from '../nav-info'
import {
  HeaderWrapper,
  sectionHeaderCss,
  headerRightCss,
  isTranslateCss,
  scrollFullCss
} from './style'

const SectionHeader = memo(() => {
  //! redux hooks
  const searchMode = useSelector(({ common }) => common.searchMode)
  const scrollFullMode = useSelector(({ common }) => common.scrollFullMode)

  //! props or state
  const [isTranslate, setIsTranslate] = useState(searchMode)

  //! other hooks
  const searchColRef = useRef()

  return (
    <HeaderWrapper
      css={[
        scrollFullMode ? scrollFullCss : null,
        isTranslate ? isTranslateCss : null
      ]}
    >
      <nav className="layout-header filter-bg-card" css={sectionHeaderCss}>
        <Row>
          <Col sm={8} md={8} lg={6} xl={4}>
            <NavLogo></NavLogo>
          </Col>
          <Col
            ref={searchColRef}
            css={headerRightCss}
            sm={16}
            md={16}
            lg={18}
            xl={20}
          >
            <NavSearch
              {...{
                searchColRef,
                setIsTranslate
              }}
            ></NavSearch>
            {searchMode && <i></i>}

            <span className="header-right">
              <NavInfo></NavInfo>
              <NavControl></NavControl>
            </span>
          </Col>
        </Row>
      </nav>
    </HeaderWrapper>
  )
})

export default SectionHeader
