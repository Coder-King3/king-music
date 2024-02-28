import React, { memo, useRef, useState } from 'react'
import { Slider as PlayerSliderBar } from 'antd'
import { PlayerBarWrapper, ProgressBarCss } from './style'
import {
  toastInfo,
  toastSuccess,
  toastError,
  toastWarning
} from '@/utils/common'

const PlayerBar = memo(() => {
  //! props ans state
  // const play
  const [progress, setProgress] = useState(30)

  //! other hooks
  const audioRef = useRef()

  const sliderChange = (value) => {
    console.log(`value:`, value)
    setProgress(value)
  }

  return (
    <PlayerBarWrapper>
      <div className="player">
        <div className="progress-bar" css={ProgressBarCss}>
          <PlayerSliderBar
            tooltip={{
              open: true,
              getPopupContainer: (triggerNode) => triggerNode
            }}
            value={progress}
            onChange={sliderChange}
          ></PlayerSliderBar>
          {/* ant-slider-handle ant-tooltip-open */}
          {/* getPopupContainer */}
        </div>
        <div className="controls"></div>
      </div>
      <audio ref={audioRef} className="player-audio"></audio>
    </PlayerBarWrapper>
  )
})

export default PlayerBar
