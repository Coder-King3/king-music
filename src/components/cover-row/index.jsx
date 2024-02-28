import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Cover from '@/components/cover'
import { CoverRowWrapper } from './style'
import { mapTracksToType } from '@/utils/common'

console.log(`PropTypes:`, PropTypes)
const CoverRow = memo((props) => {
  //! prop types
  const {
    items,
    type,
    subText,
    subTextFontSize,
    columnNumber,
    gap,
    playButtonSize
  } = props

  //! logic code
  const getSubText = ({ source }) => {
    const item = source
    let subTextContent = null
    let isRender = false

    if (subText === 'copywriter') subTextContent = item.copywriter
    if (subText === 'description') subTextContent = item.description
    if (subText === 'updateFrequency') subTextContent = item.updateFrequency
    if (subText === 'creator') subTextContent = 'by ' + item.creator.nickname
    if (subText === 'releaseYear')
      subTextContent = new Date(item.publishTime).getFullYear()
    if (subText === 'artist') {
      isRender = true
      if (item.artist !== undefined)
        subTextContent = (
          <span
            className="hover-underline sub-hover-text"
            href="/#/artist/${item.artist.id}"
          >
            {item.artist.name}
          </span>
        )
      if (item.artists !== undefined)
        subTextContent = (
          <span
            className="hover-underline sub-hover-text"
            href="/#/artist/${item.artists[0].id}"
          >
            {item.artists[0].name}
          </span>
        )
    }
    if (subText === 'albumType+releaseYear') {
      let albumType = item.type
      if (item.type === 'EP/Single') {
        albumType = item.size === 1 ? 'Single' : 'EP'
      } else if (item.type === 'Single') {
        albumType = 'Single'
      } else if (item.type === '专辑') {
        albumType = 'Album'
      }
      subTextContent = `${albumType} · ${new Date(item.publishTime).getFullYear()}`
    }

    return isRender ? (
      subTextContent
    ) : (
      <span className="hover-underline sub-hover-text">{subTextContent}</span>
    )
  }

  return (
    <CoverRowWrapper
      className="cover-row"
      columnNumber={columnNumber}
      gap={gap}
      noSub={type === 'artist' && subText === 'none'}
    >
      {mapTracksToType(items, type).map((item) => (
        <div
          className={classnames('item', { artist: type == 'artist' })}
          key={item.id}
        >
          <Cover
            id={item.id}
            type={type}
            cover={item.cover}
            circleBorder={type === 'artist' ? true : false}
          ></Cover>
          <div className="text ">
            <div className="title" style={{ fontSize: subTextFontSize }}>
              {/* <router-link :to="getTitleLink(item)">{{ item.name }}</router-link> */}
              <span className="hover-underline">{item.name}</span>
            </div>
            {type !== 'artist' && subText !== 'none' ? (
              <div className="info">{getSubText(item)}</div>
            ) : (
              <i></i>
            )}
          </div>
        </div>
      ))}
    </CoverRowWrapper>
  )
})

//! prop types
CoverRow.propTypes = {
  items: PropTypes.array.isRequired, // 展示列表
  type: PropTypes.string.isRequired, // 展示类型
  subText: PropTypes.string, // 副标题
  subTextFontSize: PropTypes.string,
  columnNumber: PropTypes.number, // items展示数量
  gap: PropTypes.string, // items间隔
  playButtonSize: PropTypes.number
}
CoverRow.defaultProps = {
  subText: 'none',
  columnNumber: 5,
  subTextFontSize: '16px',
  gap: '44px 24px',
  playButtonSize: 22
}

export default CoverRow
