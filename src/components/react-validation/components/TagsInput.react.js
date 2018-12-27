import React, {Component, PropTypes} from 'react'
import UAParser from "ua-parser-js"
import getViewData from './../helpers/get-view-data.js'
import rules from './../rules.js'
import TagsInput from 'react-tagsinput'
import _ from 'lodash'
import classnames from 'classnames/bind'
import NumberFormat from 'react-number-format'
import styles from '../form-validator.scss'
const parser = new UAParser()
const {os} = parser.getResult()

const isAndroid = os.name === "Android"
const c = classnames.bind(styles)

const AsciiToKeyCode = (value = "", oldCode) => {
  const code = value.charCodeAt(value.length - 1)
  switch (code) {
    /// value = ","
    case 44:
      return 188
    /// value = " "
    case 32:
      return 32
    default:
      return oldCode;
  }
}
const RenderInput = ({addTag, ...props}) => {
  let {onChange, onKeyDown, value, id, ...other} = props

  const handleChange = (e) => {
    onChange(e)
  }
  const handleKeyDown = (e) => {
    if (isAndroid && e.keyCode === 229) {
      try {
        const event = _.cloneDeep(e)
        setTimeout(()=> {
          event.keyCode = AsciiToKeyCode(event.target.value, event.oldCode)
          onKeyDown(event)
        }, 1)
      } catch (error) {
        onKeyDown(e)
      }  
    } else {
      onKeyDown(e)
    }
  }
  return (
    <input type='text'  onChange={handleChange} onKeyDown={handleKeyDown}  value={value} {...other} id={id} placeholder="" autoFocus/>
  )
}

const RenderFormattedInput = ({addTag, ...props}) => {
  return (
    <NumberFormat
      customInput={RenderInput}
      format="(###) ###-####"
      type="tel"
      id="inputEmail"
      {...props}
  />
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
    // setTimeout(()=>{
    //   this.focus()
    // }, 300)

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
  focus() {
    try {
      document.getElementById(this.props.id).focus()
    } catch (e) {
      console.log("focus error=>", e)
    }
  }
  handleClick() {
    this.focus()
  }
  render () {
    let data = getViewData(this.props)

    return (
      <div className={c('relative', this.props.containerClassName)} onClick={this.handleClick.bind(this)}>
        <TagsInput
          {...data.props}
          value={data.value || []}
          className={c('validateInput', 'tagsInput', { 'hasHint' : data.hint })}
          addKeys={[13, 32, 188]}
          addOnBlur={true}
          onChange={this.handleChange.bind(this)}
          inputProps={{id: this.props.id}}
          renderInput={this.props.renderFormattedInput ? RenderFormattedInput : RenderInput}
        />
        <label className={c('bottomErrorMessage')}>{data.hint}</label>
        <div className={c('topLabelBg', {'hasValue': data.value && data.value.length > 0 })}/>
        <label className={c('controlLabel', 'placeholder-tags', 'label-tag', {'hasValue': data.value && data.value.length > 0 })} style={{left: 10}} id="tagInput">
          {data.props.placeholder}&nbsp;
          {(this.props.validations && this.props.validations.includes('required')) &&
          <span className={c('errorMessage')}>*</span>
          }
        </label>
      </div>
    )
  }
  handleChange = (value) => {
    if(isAndroid) {
      value = value.map((v)=> v.replace(/,$/g, "").trim())
    }

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
