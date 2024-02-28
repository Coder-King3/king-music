import React, { memo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { wrapperBackdropCss, BackdropImage, BackdropVideo } from './style'

const WrapperBackdrop = memo(() => {
  const backdropUrl = useSelector(
    ({ setting }) => setting.backdropUrl,
    shallowEqual
  )
  const backdropMode = useSelector(
    ({ setting }) => setting.backdropMode,
    shallowEqual
  )

  return (
    <div css={wrapperBackdropCss} className="music-backdrop">
      {backdropMode == 'image' || backdropMode == 'bing' ? (
        <BackdropImage bgUrl={backdropUrl}></BackdropImage>
      ) : (
        <BackdropVideo>
          <video
            width="320"
            height="240"
            autoPlay={true}
            loop={true}
            muted={true}
          >
            <source
              src={
                backdropUrl || 'https://assets.codepen.io/3364143/7btrrd.mp4'
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </BackdropVideo>
      )}
    </div>
  )
})

export default WrapperBackdrop
