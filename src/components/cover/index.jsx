import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import SvgIcon from '@/base-ui/svg-icon'
import classnames from 'classnames'
import { CoverWrapper } from './style'

const CoverRow = memo((props) => {
  //! props and state
  const {
    id,
    type,
    cover,
    coverHover,
    showPlayButton,
    alwaysShowShadow,
    alwaysShowPlayButton,
    playButtonSize,
    circleBorder
  } = props
  const [focus, setFocus] = useState()

  return (
    <CoverWrapper
      className={classnames('cover', { 'cover-hover': coverHover })}
      onMouseOver={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
      circleBorder={circleBorder}
      isFocus={alwaysShowPlayButton ? true : focus}
      playButtonSize={playButtonSize}
      shadowBg={cover}
    >
      <div className="cover-container">
        <div className="operate">
          <Button
            className="play-button"
            icon={<SvgIcon type="play" />}
            onClick={() => {}}
          ></Button>
        </div>
        <span className="scale-box">
          <img className="cover-iamge" src={cover} />
        </span>
        <div className="shadow" style={{ opacity: focus ? '1' : '0' }}></div>
      </div>

      {/*  play() */}
      {/* loading="lazy"  */}
    </CoverWrapper>
  )
})

//! prop types
CoverRow.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  coverHover: PropTypes.bool,
  showPlayButton: PropTypes.bool,
  alwaysShowShadow: PropTypes.bool,
  alwaysShowPlayButton: PropTypes.bool,
  playButtonSize: PropTypes.number,
  circleBorder: PropTypes.bool
}
CoverRow.defaultProps = {
  coverHover: true,
  showPlayButton: true,
  alwaysShowShadow: false,
  alwaysShowPlayButton: false,
  playButtonSize: 0,
  circleBorder: false
}

export default CoverRow
