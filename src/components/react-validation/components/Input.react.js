import React, { Component, PropTypes } from 'react'
import getViewData from './../helpers/get-view-data.js'
import classnames from 'classnames/bind'
import styles from '../form-validator.scss'

const c = classnames.bind(styles)

class Input extends Component {
  constructor (props) {
    super(props)

    this.props._register(this)
    this.state = {
      hasValue: false,
      value: props.value,
      isPassword: props.validations.includes('length8'),
      type: props.type
    }
  }

  componentDidMount () {
    this.props._validate(this)

    let { value } = this.refs.node
    if (value.length > 0) {
      this.setState({ hasValue: true, value: value })
    } else {
      this.setState({ hasValue: false, value: '' })
    }
  }

  componentWillUnmount () {
    this.props._unregister(this)
  }

  componentDidUpdate () {
    let { value } = this.refs.node

    if (this.state.value !== value) {
      if (value.length > 0) {
        if (this.props.isPullValue) {
          this.props._update(this, value)
        }
        this.setState({ hasValue: true, value: value })
      } else {
        this.setState({ hasValue: false, value: '' })
      }
    }
  }

  render () {
    let data = getViewData(this.props)

    if (data.props.isPullValue) {
      delete data.props.isPullValue
    }

    return (
      <div className={this.props.containerClassName || null}>
        <input
          ref='node'
          {...data.props}
          type={this.state.type}
          className={c('validateInput', 'textInput', { 'hasHint' : data.hint })}
          checked={data.props.checked}
          value={data.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur} />

        <label className={c('controlLabel', { 'hasValue': data.value })}>
          {data.props.placeholder}&nbsp;
          {this.state.isPassword && <span className={c('formError')}>(Min 8 characters)&nbsp;</span>}
          {(this.props.validations && this.props.validations.includes('required')) &&
            <span className={c('formError')}>*</span>
          }
          &nbsp;{data.hint}
        </label>

        {data.props.type === 'password' &&
          <span className={c('showPassword')} onClick={this.showHidePassword}>
            <i className={c({ 'icon-lock': this.state.type === 'text' }, { 'icon-eye': this.state.type === 'password' })}/>
          </span>
        }
      </div>
    )
  }

  handleChange = (event) => {
    this.props._update(this, event)
    event.persist()

    let { value } = this.refs.node
    this.props.onChange && this.props.onChange(event, value)
    if (value.length > 0) {
      this.setState ({ hasValue: true, value: value })
    } else {
      this.setState ({ hasValue: false, value: '' })
    }
  }

  handleBlur = (event) => {
    this.props._update(this, event, true)
    event.persist()
    this.props.onBlur && this.props.onBlur(event)
  }

  showHidePassword = () => {
    let type = this.state.type === 'password' ? 'text' : 'password'
    this.setState ({ type: type })
  }
}

Input.propTypes = {
  validations: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

module.exports = Input