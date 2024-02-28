import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { SvgIconStyle } from './style'

function SvgIcon(props) {
  const { type, styleName, click, color } = props

  return (
    <svg
      aria-hidden="true"
      onClick={click}
      css={SvgIconStyle}
      // className={`svg-icon${styleName ? ` ${styleName}` : ''}`}
      className={classNames('svg-icon', { [styleName]: styleName })}
      style={color ? { color } : null}
    >
      <use xlinkHref={'#icon-' + type} />
    </svg>
  )
}

SvgIcon.propTypes = {
  type: PropTypes.string.isRequired,
  styleName: PropTypes.string,
  color: PropTypes.string,
  click: PropTypes.func
}

export default SvgIcon
