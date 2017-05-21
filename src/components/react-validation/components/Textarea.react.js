import React, {Component, PropTypes} from 'react'
import getViewData from './../helpers/get-view-data.js'
import rules from './../rules.js'
import classnames from 'classnames/bind'
import styles from '../form-validator.scss'

const c = classnames.bind(styles)

class Textarea extends Component {
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
    if (value.length > 0) {
      this.setState({ hasValue: true, value: value })
    } else {
      this.setState({ hasValue: false, value: '' })
    }
  }

  componentWillUnmount() {
    this.props._unregister(this)
  }

  componentDidUpdate() {
    let {value} = this.refs.node

    if(this.state.value !== value) {
      if (value.length > 0) {
        this.setState({ hasValue: true, value: value })
      } else {
        this.setState({ hasValue: false, value: '' })
      }
    }
  }

  render() {
    let data = getViewData(this.props)
    return (
      <div className={c('relative', this.props.containerClassName)}>
        <textarea
          ref='node'
          {...data.props}
          className={c('validateInput', 'textInput', { 'hasHint' : data.hint })}
          checked={data.props.checked}
          value={data.value}
          maxLength={150}
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

    this.props.onChange && this.props.onChange(event)

    let {value} = this.refs.node
    if (value.length > 0) {
      this.setState({ hasValue: true, value: value })
    } else {
      this.setState({ hasValue: false, value: '' })
    }
  }

  handleBlur = (event) => {
    this.props._update(this, event)
    event.persist()
    this.props.onBlur && this.props.onBlur(event)
  }
}

Textarea.propTypes = {
  validations: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

module.exports = Textarea