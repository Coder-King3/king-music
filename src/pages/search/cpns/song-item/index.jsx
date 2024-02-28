import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import SvgIcon from '@/base-ui/svg-icon'
import { SongItemWrapper } from './style'
import { getSongUrl } from '@/service/modules/track'
import { downloadMP3 } from '@/utils/common'

const SongItem = memo((props) => {
  //! props and state
  const { id, name, type, cover, artist } = props
  // console.log(`SongItemProps:`, props)
  const [downloadling, setDownloadling] = useState(false)

  const handleDownloadMusic = () => {
    const params = { id, name }
    const fetchCycle = {
      cycleStart: () => setDownloadling(true),
      cycleEnd: () => setDownloadling(false)
    }
    downloadMP3(params, fetchCycle)
  }

  return (
    <SongItemWrapper>
      <div className="cover">
        <img src={cover} />
        <Button
          className="play-button"
          icon={<SvgIcon type="play" />}
          onClick={() => {}}
        ></Button>
      </div>
      <div className="container">
        <div className="info">
          <div className="title text-two-ellipsis">{name}</div>
          <div className="artist">
            {artist.map((item, index) => (
              <React.Fragment key={`${item.id}-${item.name}`}>
                <span className="hover-underline sub-hover-text">
                  {item.name}
                </span>
                {index != artist.length - 1 && (
                  <span className="separator">,</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="control">
          <Button
            className="control-btn icon-hover-btn"
            icon={<SvgIcon type="download"></SvgIcon>}
            loading={downloadling}
            style={downloadling ? { opacity: '1' } : {}}
            onClick={handleDownloadMusic}
          ></Button>
          <Button
            className="control-btn icon-hover-btn"
            icon={<SvgIcon type="plus-circle"></SvgIcon>}
          ></Button>
        </div>
      </div>
    </SongItemWrapper>
  )
})

//! prop types
SongItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  artist: PropTypes.array.isRequired
}

export default SongItem
