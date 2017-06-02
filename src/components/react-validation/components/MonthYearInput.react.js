import React, {Component, PropTypes} from 'react'
import getViewData from './../helpers/get-view-data.js'
import rules from './../rules.js'
import numeral from 'numeral'
import classnames from 'classnames/bind'
import styles from '../form-validator.scss'

const c = classnames.bind (styles)

class MonthYearInput extends Component {
  constructor (props) {
    super (props)

    this.props._register (this)
    this.state = {
      hasValue: false,
      value: props.value
    }
  }

  componentDidMount () {
    this.props._validate (this)

    let {value} = this.refs.node
    let modifiedValue = value.replace (/[^0-9]+/g, '')

    if (('' + value).length > 0) {
      this.setState ({hasValue: true, value: value})
    }
    else {
      this.setState ({hasValue: false, value: ''})
    }
  }

  componentWillUnmount () {
    this.props._unregister (this)
  }

  componentDidUpdate () {
    let {value} = this.refs.node
    let modifiedValue = value.replace (/[^0-9]+/g, '')

    if (this.state.value !== value) {
      if (value.length > 0) {
        this.setState ({hasValue: true, value: value})
      }
      else {
        this.setState ({hasValue: false, value: ''})
      }
    }
  }

  insertString (originalString, newString, index) {
    return originalString.substr (0, index) + newString + originalString.substr (index);
  }

  formatDate (dateString) {
    var cleanString = dateString.replace (/\D/g, ''), // Removes all non-numeric characters
      output = cleanString.substr (0, 6), // Limit to 8 digits
      size = dateString.length;

    // if (size > 4)
    //   output = this.insertString (output, '/', 4);

    if (size > 2)
      output = this.insertString (output, '/', 2);

    return output;
  }

  render () {
    let data = getViewData (this.props)
    let formatDate = this.formatDate(data.value)
    return (
      <div className={c('relative', this.props.containerClassName)}>
        <input
          ref='node'
          {...data.props}
          className={c('validateInput', 'textInput', { 'hasHint': data.hint })}
          checked={data.props.checked}
          value={(!formatDate || formatDate === '') ? '' : formatDate}
          onChange={this.handleChange}
          onBlur={this.handleBlur}/>

        <label className={c('controlLabel', { 'hasValue': data.value })}>
          {data.props.placeholder}&nbsp;
          {(this.props.validations && this.props.validations.includes ('required')) &&
            <span className={c('errorMessage')}>*</span>
          }
          &nbsp;{data.hint}
        </label>
      </div>
    )
  }

  handleChange = (event) => {
    this.props._update (this, event)
    event.persist ()

    let {value} = this.refs.node
    let modifiedValue = value.replace (/[^0-9]+/g, '')
    
    this.props.onChange && this.props.onChange (event, value)
    if (('' + value).length > 0) {
      this.setState ({hasValue: true, value: value})
    }
    else {
      this.setState ({hasValue: false, value: ''})
    }
  }

  handleBlur = (event) => {
    this.props._update (this, event, true)
    event.persist ()
    this.props.onBlur && this.props.onBlur (event)
  }
}

MonthYearInput.propTypes = {
  validations: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

module.exports = MonthYearInput