import React from 'react'
import Select from 'react-select'
import classnames from 'classnames/bind'
import styles from './single-select.scss'

const c = classnames.bind(styles)

export default class SingleSelect extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      currentValue: props.selectedValue
    }
  }

  handleChange (val) {
    this.setState({currentValue: val})
    this.props.onSelectItem(val)
  };

  getOptionByValue (val) {
    return this.props.options.filter((item) => {
      return item.value === val
    })
  }

  render () {
    let {...otherProps} = this.props
    let selectedOption = this.props.options.filter((item) => {
      return item.value === this.props.selectedValue
    })[0]

    return (
      <div className={c('selectWrap')}>
        <Select
          name={this.props.name || 'form-field-name'}
          value={selectedOption}
          clearable={this.props.clearable || false}
          searchable={this.props.searchable || false}
          disabled={this.props.disabled || false}
          onChange={this.handleChange.bind(this)}
          className={c({'hasValue': selectedOption}, {'hasLabel': !this.props.noLabel}, {'hasError': this.props.hasError})}
          {...otherProps}
        />
        {!this.props.noLabel &&
        <label className={c('controlLabel', {'hasValue': selectedOption})}>
          {this.props.placeholder}&nbsp;
        </label>
        }
      </div>
    )
  }
}