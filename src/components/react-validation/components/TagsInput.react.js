import React, {Component, PropTypes} from 'react'
import getViewData from './../helpers/get-view-data.js'
import rules from './../rules.js'
import TagsInput from 'react-tagsinput'
import _ from 'lodash'
import classnames from 'classnames/bind'
import styles from '../form-validator.scss'

const c = classnames.bind(styles)

const RenderInput = ({addTag, ...props}) => {
  let {onChange, value, ...other} = props
  const handleChange = (e) => {
    onChange(e)
  }
  return (
    <input type='text' onChange={handleChange} value={value} {...other} id="inputEmail" placeholder="" />
  )
}


class Tags extends Component {
  constructor (props) {
    super (props)
    this.props._register (this)

    this.state = {
      hasValue: false,
      value: props.value || []
    }
    //this.props._update (this, props.selectedValue)
  }

  componentDidMount() {
    this.props._validate(this)

    let {value} = this.props
    if (value && value.length > 0) {
      this.setState({ hasValue: true, value: value })
    } else {
      this.setState({ hasValue: false, value: [] })
    }
    setTimeout(()=>{
      document.getElementById("inputEmail").focus()
    }, 300)

  }

  componentDidUpdate() {
    let {value} = this.props

    if(value &&  !_.isEqual(this.state.value , value)) {
      if (value.length > 0) {
        this.setState({ hasValue: true, value: value })
      } else {
        this.setState({ hasValue: false, value: [] })
      }
    }
  }

  render () {
    let data = getViewData(this.props)

    return (
      <div className={c('relative', this.props.containerClassName)}>
        <TagsInput
          {...data.props}
          value={data.value || []}
          className={c('validateInput', 'tagsInput', { 'hasHint' : data.hint })}
          addKeys={[13, 32, 188]}
          addOnBlur={true}
          onChange={this.handleChange.bind(this)}
          renderInput={RenderInput}
        />

        <div className={c('topLabelBg', {'hasValue': data.value && data.value.length > 0 })}/>
        <label className={c('controlLabel', 'label-tag', {'hasValue': data.value && data.value.length > 0 })} style={{left: 10}} id="tagInput">
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
    this.props._update(this, value)
    if (value.length > 0) {
      this.setState({ hasValue: true, value: value })
    } else {
      this.setState({ hasValue: false, value: [] })
    }
    this.props.onChangeItem && this.props.onChangeItem(value)
  }

  handleBlur = (event) => {
    this.props._update(this, event, true)
    event.persist()
    this.props.onBlur && this.props.onBlur(event)
  }
}

Tags.propTypes = {
  validations: PropTypes.array.isRequired,
  // value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChangeItem: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

module.exports = Tags
