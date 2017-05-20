import React, {Component, PropTypes} from 'react'
import getViewData from './../helpers/get-view-data.js'
import rules from './../rules.js'
import numeral from 'numeral'
import classnames from 'classnames/bind'
import styles from '../form-validator.scss'

const c = classnames.bind(styles)

class NumberInput extends Component {
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

    let {value} = this.refs.node
    if(('' + value).length > 0) {
      this.setState({ hasValue: true, value: value.replace(/,|[A-z]/g, '') })
    } else {
      this.setState({ hasValue: false, value: '' })
    }
  }

  componentWillUnmount() {
    this.props._unregister(this)
  }

  componentDidUpdate() {
    let {value} = this.refs.node
    let modifiedValue = value.replace(/,|[A-z]/g, '')

    if(this.state.value !== modifiedValue) {
      if (value.length > 0) {
        this.setState({ hasValue: true, value: modifiedValue })
      } else {
        this.setState({ hasValue: false, value: '' })
      }
    }
  }

  render() {
    let data = getViewData(this.props)
    return (
      <div className={this.props.containerClassName || null}>
        <input
          ref='node'
          {...data.props}
          className={c('validateInput', 'textInput', { 'hasHint': data.hint })}
          checked={data.props.checked}
          value={(!data.value || data.value === '') ? '' : numeral(data.value).format('0,0')}
          maxLength={20}
          onChange={this.handleChange}
          onBlur={this.handleBlur} />

        <label className={c('controlLabel', { 'hasValue': data.value })}>
          {data.props.placeholder}&nbsp;
          {(this.props.validations && this.props.validations.includes('required')) &&
            <span className={c('formError')}>*</span>
          }
          &nbsp;{data.hint}
        </label>
      </div>
    )
  }

  handleChange = (event) => {
    this.props._update(this, event)
    event.persist()

    let {value} = this.refs.node
    this.props.onChange && this.props.onChange(event, value)
    if(('' + value).length > 0) {
      this.setState({ hasValue: true, value: value.replace(/,|[A-z]/g, '') })
    } else {
      this.setState({ hasValue: false, value: '' })
    }
  }

  handleBlur = (event) => {
    this.props._update(this, event, true)
    event.persist()
    this.props.onBlur && this.props.onBlur(event)
  }
}

NumberInput.propTypes = {
  validations: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

module.exports = NumberInput