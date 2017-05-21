import React from 'react';
import Select from 'react-select';
import './single-select.scss'

export default class SingleSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentValue: null
    };
  }

  handleChange = (val) => {
    this.setState({currentValue: val});
    this.props.onSelectItem(val);
  };

  getOptionByValue = (val) => {
    return this.props.options.filter((item) => {
      return item.value === val;
    })
  };

  render() {
    let { ...otherProps } = this.props;
    let selectedOption = this.props.options.filter((item) => {
      return item.value === this.props.selectedValue;
    })[0];

    return (
      <Select
        name={this.props.name || "form-field-name"}
        value={selectedOption}
        clearable={this.props.clearable || false}
        searchable={this.props.searchable || false}
        disabled={this.props.disabled || false}
        onChange={this.handleChange}
        {...otherProps}
      />
    );
  }
}