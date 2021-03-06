import React, { Component, PropTypes } from 'react'
import getViewData from './../helpers/get-view-data.js'
import classnames from 'classnames/bind'
import styles from '../form-validator.scss'

const c = classnames.bind(styles)

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      validationError: false
    }
  }
  render () {
    let data = getViewData(this.props)
    let {errors} = this.props
    let hasErrors = Object.keys(errors).length

    return (
      <button
        {...data.props}
        onClick={this.handleClick}
        className={c('button', {'shake': this.state.validationError})}>
        {this.props.children}
      </button>
    )
  }

  handleClick = (event) => {
    let errorNames = Object.keys(this.props.errors)

    if (errorNames.length > 0) {
      event.preventDefault()
      errorNames.forEach((item, index) => {
        this.props.validate(item)
      })
      this.props.errorCallback  && this.props.errorCallback(errorNames[0]);
      // Shake Shake
      this.setState({validationError: true})
      setTimeout(() => {
        this.setState({validationError: false})
      }, 500)
    }
    this.props.onClick && this.props.onClick();
  }
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func
}

module.exports = Button