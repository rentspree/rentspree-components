import React, {Component, PropTypes} from 'react'
import getViewData from './../helpers/get-view-data.js'
import rules from './../rules.js'
import TelephoneInput, { phoneNumberFormat, isValidPhoneNumber } from 'react-phone-number-input'
import classnames from 'classnames/bind'
import styles from '../form-validator.scss'

const c = classnames.bind(styles)

class PhoneInput extends Component {
  constructor(props) {
    super(props)

    this.props._register(this)
    this.state = {
      hasValue: false,
      value: props.value
    }
  }

  componentDidMount() {
    this.props._validate(this)
    let {value} = this.props

    let modifiedValue = value.replace('+1', '')

    if (modifiedValue && modifiedValue.length > 0) {
      this.setState({ hasValue: true, value: modifiedValue })
    } else {
      this.setState({ hasValue: false, value: '' })
    }
  }

  componentWillUnmount() {
    this.props._unregister(this)
  }

  handleChange = (value) => {
    let modifiedValue = value.replace('+1', '')

    this.props._update(this, modifiedValue)
    this.props.onChange && this.props.onChange(modifiedValue)

    if (modifiedValue.length > 0) {
      this.setState({ hasValue: true, value: modifiedValue })
    } else {
      this.setState({ hasValue: false, value: '' })
    }
  }

  handleBlur(value) {
    let modifiedValue = value.replace('+1', '')
    this.props._update(this, modifiedValue)
    // this.props._update(this, event)
    // event.persist()
    // this.props.onBlur && this.props.onBlur(event)
  }

  getClass() {
    if (this.state.hasValue) {
      return "hasValue"
    } else {
      return ""
    }
  }

  render() {
    let data = getViewData(this.props)
    let myClass = this.getClass()

    return (
      <div className={c('relative', this.props.containerClassName)}>
        {/*<TelephoneInput {...data.props}
         defaultCountry={'us'}
         preferredCountries={['us']}
         value={this.state.value}
         classNames={data.className}
         onChange={this.handleChange.bind(this)}
         onBlur={this.handleBlur.bind(this)}/>*/}
        <TelephoneInput
          ref="node"
          {...data.props}
          format={ phoneNumberFormat.US }
          value={data.value}
          className={c('validateInput', 'textInput', { 'hasHint' : data.hint })}
          onChange={this.handleChange.bind(this)}
          onBlur={this.handleBlur.bind(this)}/>

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
}

PhoneInput.propTypes = {
  validations: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

module.exports = PhoneInput