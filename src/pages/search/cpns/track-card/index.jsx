import React, { memo } from 'react'
import { TrackCardWrapper } from './style'
import PropTypes from 'prop-types'

const TrackCard = memo((props) => {
  //! props and state
  const { children, title, subtitle, subClick } = props

  return (
    <TrackCardWrapper className="track-card filter-bg-card">
      <div className="card-title flex-between">
        <span className="title">{title}</span>
        <span
          className="subtitle sub-hover-text hover-underline"
          onClick={subClick}
        >
          {subtitle}
        </span>
      </div>
      {children}
    </TrackCardWrapper>
  )
})

//! prop types
TrackCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  subClick: PropTypes.func
}
TrackCard.defaultProps = {
  subtitle: '查看全部'
}

export default TrackCard
