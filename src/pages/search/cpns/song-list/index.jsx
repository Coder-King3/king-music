import React, { memo } from 'react'
import PropTypes from 'prop-types'
import SongItem from '../song-item'
import { SongListWrapper } from './style'

import { mapTracksToType } from '@/utils/common'

const SongList = memo((props) => {
  //! props and state
  const { songs, type, columnNumber, gap } = props
  console.log(`songs:`, songs)

  console.log(
    `songs-ids:`,
    songs.map((item) => item.id)
  )
  console.log(`mapTracksToType:`, mapTracksToType(songs, type))
  return (
    <SongListWrapper
      className="song-list"
      columnNumber={columnNumber}
      gap={gap}
    >
      {mapTracksToType(songs, type).map((item, index) => (
        <SongItem
          key={item.id}
          id={item.id}
          name={item.name}
          type={type}
          cover={item.cover}
          artist={item.artist}
        ></SongItem>
      ))}
    </SongListWrapper>
  )
})

//! prop types
SongList.propTypes = {
  songs: PropTypes.array.isRequired, // 展示列表
  type: PropTypes.string.isRequired, // 展示类型
  columnNumber: PropTypes.number, // items展示数量
  gap: PropTypes.string // items间隔
}
SongList.defaultProps = {
  columnNumber: 4,
  gap: '10px'
}

export default SongList
