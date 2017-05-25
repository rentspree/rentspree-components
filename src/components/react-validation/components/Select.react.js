import React, {Component, PropTypes} from 'react'
import getViewData from './../helpers/get-view-data.js'
import rules from './../rules.js'
import SingleSelect from '../../ui/single-select'
import classnames from 'classnames/bind'
import styles from '../form-validator.scss'

const c = classnames.bind(styles)

class Select extends Component {
  constructor (props) {
    super (props)
    this.state = {
      hasValue: false,
      value: props.value
    }

    this.props._register (this)
    //this.props._update (this, props.selectedValue)
  }

  componentDidMount() {
    this.props._validate(this)

    let {value} = this.props
    if (value && value.length > 0) {
      this.setState({ hasValue: true, value: value })
    } else {
      this.setState({ hasValue: false, value: '' })
    }
  }

  componentDidUpdate() {
    let {value} = this.props

    if(value && this.state.value !== value) {
      if (value.length > 0) {
        if (this.props.isPullValue) {
          this.props._update (this, value)
        }
        this.setState({ hasValue: true, value: value })
      } else {
        this.setState({ hasValue: false, value: '' })
      }
    }
  }

  componentWillUnmount() {
    this.props._unregister(this)
  }

  render () {
    let data = getViewData (this.props)

    if (data.props.isPullValue) {
      delete data.props.isPullValue
    }
    
    return (
      <div className={c('relative', this.props.containerClassName)}>
        <SingleSelect
          {...data.props}
          selectedValue={data.value}
          className={c({'formError': data.hint}, 'selectBox', {'hasLabel': !data.props.noLabel})}
          onSelectItem={this.handleChange.bind(this)}/>

        {!data.props.noLabel &&
          <label className={c('controlLabel', {'hasValue': data.value})}>
            {data.props.placeholder}&nbsp;
            {this.props.validations && this.props.validations.includes('required') && <span className={c('formError')}>*</span>}
            &nbsp;{data.hint}
          </label>
        }
      </div>
    )
  }

  handleChange = (object) => {
    this.props._update (this, object.value)
    this.setState({ hasValue: true, value: object.value })

    //event.persist ()
    this.props.onSelectItem && this.props.onSelectItem(object)
    //this.props.onChange && this.props.onChange (event)
  }

}

Select.propTypes = {
  validations: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onSelectItem: PropTypes.func,
  searchable: PropTypes.bool
}

module.exports = Select
