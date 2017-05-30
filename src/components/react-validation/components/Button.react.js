import React, { Component, PropTypes } from 'react'
import getViewData from './../helpers/get-view-data.js'
import classnames from 'classnames/bind'
import styles from '../form-validator.scss'

const c = classnames.bind(styles)

class Button extends Component {
  render () {
    // let data = getViewData(this.props)
    let {errors} = this.props
    let hasErrors = Object.keys(errors).length

    return (
      <button
        {...this.props}
        onClick={this.handleClick}
        className={c('button', {'buttonError': hasErrors})}>
        {this.props.children}
      </button>
    )
  }

  handleClick = (event) => {
    let errorNames = Object.keys(this.props.errors)

    if (errorNames.length > 0) {
      event.preventDefault()
      errorNames.forEach((item) => {
        this.props.validate(item)
      })
    }
    else {
      this.props.onClick && this.props.onClick()
    }
  }
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func
}

module.exports = Button