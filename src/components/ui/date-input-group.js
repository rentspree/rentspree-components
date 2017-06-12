import React, {Component, PropTypes} from 'react'
import {Row, Col, FormGroup} from 'react-bootstrap'
import Validation from '../react-validation/form-validator'
import SingleSelect from './single-select'
import moment from 'moment'
import classnames from 'classnames/bind'
import styles from './date-input-group.scss'

const c = classnames.bind (styles)

const dates = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
  {label: '9', value: '9'},
  {label: '10', value: '10'},
  {label: '11', value: '11'},
  {label: '12', value: '12'},
  {label: '13', value: '13'},
  {label: '14', value: '14'},
  {label: '15', value: '15'},
  {label: '16', value: '16'},
  {label: '17', value: '17'},
  {label: '18', value: '18'},
  {label: '19', value: '19'},
  {label: '20', value: '20'},
  {label: '21', value: '21'},
  {label: '22', value: '22'},
  {label: '23', value: '23'},
  {label: '24', value: '24'},
  {label: '25', value: '25'},
  {label: '26', value: '26'},
  {label: '27', value: '27'},
  {label: '28', value: '28'},
  {label: '29', value: '29'},
  {label: '30', value: '30'},
  {label: '31', value: '31'}
]
const months = [
  {
    label: 'January',
    value: '1'
  }, {
    label: 'February',
    value: '2'
  }, {
    label: 'March',
    value: '3'
  }, {
    label: 'April',
    value: '4'
  }, {
    label: 'May',
    value: '5'
  }, {
    label: 'June',
    value: '6'
  }, {
    label: 'July',
    value: '7'
  }, {
    label: 'August',
    value: '8'
  }, {
    label: 'September',
    value: '9'
  }, {
    label: 'October',
    value: '10'
  }, {
    label: 'November',
    value: '11'
  }, {
    label: 'December',
    value: '12'
  }
]
const rules = Validation.rules;

export default class DateInputGroup extends Component {
  years = []

  constructor (props) {
    super (props)

    let startYear = props.startYear || 1950, endYear = props.endYear || moment ().year ();
    for (var i = startYear; i <= endYear; i++) {
      this.years.push ({label: '' + i, value: '' + i})
    }
    this.state = {
      date: props.value ? '' + props.value.date () : '',
      month: props.value ? '' + props.value.add ('month', 1).month () : '',
      year: props.value ? '' + props.value.year () : '',
      value: props.value || null,
      error: null
    }
  }

  handleDateSelected = (e) => {
    this.setState ({date: e.value || ''}, this.digest)
  }
  handleMonthSelected = (e) => {
    this.setState ({month: e.value || ''}, this.digest)
  }
  handleYearSelected = (e) => {
    this.setState ({year: e.value || ''}, this.digest)
  }

  validate (value) {
    try {
      this.props.validations.forEach ((validation, index) => {
        this.setState ({error: !rules[validation].rule (value) ? rules[validation].hint () : null})
        if (!rules[validation].rule (value)) {
          throw 400;
        }
      })
    } catch (e) {
      return false
    }

    return true;
  }

  digest () {
    let value = null
    if (this.state.date && !isNaN (this.state.date) &&
      this.state.month && !isNaN (this.state.month) &&
      this.state.year && !isNaN (this.state.year)) {
      value = moment.utc (this.state.year + '-' +
        (this.state.month >= 10 ? this.state.month : '0' + this.state.month) + '-' +
        (this.state.date >= 10 ? this.state.date : '0' + this.state.date))
    }

    this.validate (value)
    this.setState ({value: value})
    this.props.onChange && this.props.onChange (value)
  }

  render () {
    return (
      <div>
        <div className={c('dateLabel')}>
          <span className={c('title')}>{this.props.label}</span>
          {this.state.error}
        </div>
        <Row>
          <Col xs={12} sm={4}>
            <FormGroup>
              <SingleSelect
                hasError={this.state.error}
                options={months}
                searchable
                selectedValue={this.state.month && !isNaN(this.state.month) ? this.state.month : ''}
                name='month'
                placeholder='Month'
                onSelectItem={ this.handleMonthSelected }/>
            </FormGroup>
          </Col>
          <Col xs={12} sm={4}>
            <FormGroup>
              <SingleSelect
                hasError={this.state.error}
                options={dates}
                searchable
                selectedValue={this.state.date && !isNaN(this.state.date) ? this.state.date : ''}
                name='date'
                placeholder='Date'
                onSelectItem={ this.handleDateSelected }/>
            </FormGroup>
          </Col>
          <Col xs={12} sm={4}>
            <FormGroup>
              <SingleSelect
                hasError={this.state.error}
                options={this.years}
                searchable
                selectedValue={this.state.year && !isNaN(this.state.year) ? this.state.year : ''}
                name='year'
                placeholder='Year'
                onSelectItem={ this.handleYearSelected }/>
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }
}