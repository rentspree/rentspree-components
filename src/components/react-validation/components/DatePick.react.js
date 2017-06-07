import React, { Component, PropTypes } from 'react'
import getViewData from './../helpers/get-view-data.js'
import DatePicker from '../../ui/date-picker'
import moment from 'moment'
import classnames from 'classnames/bind'
import styles from '../form-validator.scss'

const c = classnames.bind(styles)

class DatePick extends Component {
  constructor (props) {
    super(props)

    this.props._register(this)
    this.state = {
      hasValue: false,
      value: null
    }
  }

  componentDidMount () {
    this.props._validate(this)
    let { value } = this.props
    if (value) {
      this.setState({ hasValue: true, value: value })
    } else {
      this.setState({ hasValue: false, value: null })
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(!prevProps.value.isSame(this.props.value)) {
  //     this.setState({ hasValue: true, value: this.props.value })
  //   }
  // } Used to fixed Datepicker Redefault bug in Movein date rental form but have better way now

  componentWillUnmount () {
    this.props._unregister(this)
  }

  render () {
    let data = getViewData(this.props)
    return (
      <div className={c('relative', this.props.containerClassName)}>
        <DatePicker
          ref='node'
          {...data.props}
          dateFormat={data.props.dateFormat || 'DD MMM YYYY'}
          className={c('validateInput', 'textInput', { 'hasHint': data.hint })}
          selected={this.state.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          readOnly />

        <label className={c('controlLabel', { 'hasValue': data.value })}>
          {data.props.placeholder}&nbsp;
          {(this.props.validations && this.props.validations.includes('required')) &&
            <span className={c('errorMessage')}>*</span>
          }
          &nbsp;{data.hint}
        </label>
      </div>
    )
  }

  handleChange = (value) => {
    value = moment.utc(value.format('YYYY-MM-DD'))

    //event.persist()
    this.props._update (this, value)
    this.props.onChange && this.props.onChange(value)

    if (value) {
      this.setState({ hasValue: true, value: value })
    } else {
      this.setState({ hasValue: false, value: null })
    }
  }

  handleBlur = (event) => {
    this.props._update(this, event)
    event.persist()
    this.props.onBlur && this.props.onBlur(event)
  }
}

DatePick.propTypes = {
  validations: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

module.exports = DatePick
