import React, {Component, PropTypes} from 'react'
import Validation from '../react-validation/form-validator'
import moment from 'moment'
import classnames from 'classnames/bind'
import styles from './date-input-group.scss'

const c = classnames.bind (styles)

const dates = [
  {label: '1', value: '01'},
  {label: '2', value: '02'},
  {label: '3', value: '03'},
  {label: '4', value: '04'},
  {label: '5', value: '05'},
  {label: '6', value: '06'},
  {label: '7', value: '07'},
  {label: '8', value: '08'},
  {label: '9', value: '09'},
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
    value: '01'
  }, {
    label: 'February',
    value: '02'
  }, {
    label: 'March',
    value: '03'
  }, {
    label: 'April',
    value: '04'
  }, {
    label: 'May',
    value: '05'
  }, {
    label: 'June',
    value: '06'
  }, {
    label: 'July',
    value: '07'
  }, {
    label: 'August',
    value: '08'
  }, {
    label: 'September',
    value: '09'
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
const years = [
  {label: '1950', value: '1950'},
  {label: '1951', value: '1951'},
  {label: '1952', value: '1952'},
  {label: '1953', value: '1953'},
  {label: '1954', value: '1954'},
  {label: '1955', value: '1955'},
  {label: '1956', value: '1956'},
  {label: '1957', value: '1957'},
  {label: '1958', value: '1958'},
  {label: '1959', value: '1959'},
  {label: '1960', value: '1960'},
  {label: '1961', value: '1961'},
  {label: '1962', value: '1962'},
  {label: '1963', value: '1963'},
  {label: '1964', value: '1964'},
  {label: '1965', value: '1965'},
  {label: '1966', value: '1966'},
  {label: '1967', value: '1967'},
  {label: '1968', value: '1968'},
  {label: '1969', value: '1969'},
  {label: '1970', value: '1970'},
  {label: '1971', value: '1971'},
  {label: '1972', value: '1972'},
  {label: '1973', value: '1973'},
  {label: '1974', value: '1974'},
  {label: '1975', value: '1975'},
  {label: '1976', value: '1976'},
  {label: '1977', value: '1977'},
  {label: '1978', value: '1978'},
  {label: '1979', value: '1979'},
  {label: '1980', value: '1980'},
  {label: '1981', value: '1981'},
  {label: '1982', value: '1982'},
  {label: '1983', value: '1983'},
  {label: '1984', value: '1984'},
  {label: '1985', value: '1985'},
  {label: '1986', value: '1986'},
  {label: '1987', value: '1987'},
  {label: '1988', value: '1988'},
  {label: '1989', value: '1989'},
  {label: '1990', value: '1990'},
  {label: '1991', value: '1991'},
  {label: '1992', value: '1992'},
  {label: '1993', value: '1993'},
  {label: '1994', value: '1994'},
  {label: '1995', value: '1995'},
  {label: '1996', value: '1996'},
  {label: '1997', value: '1997'},
  {label: '1998', value: '1998'},
  {label: '1999', value: '1999'},
  {label: '2000', value: '2000'},
  {label: '2001', value: '2001'},
  {label: '2002', value: '2002'},
  {label: '2003', value: '2003'},
  {label: '2004', value: '2004'},
  {label: '2005', value: '2005'},
  {label: '2006', value: '2006'},
  {label: '2007', value: '2007'},
  {label: '2008', value: '2008'},
  {label: '2009', value: '2009'},
  {label: '2010', value: '2010'},
  {label: '2011', value: '2011'},
  {label: '2012', value: '2012'},
  {label: '2013', value: '2013'},
  {label: '2014', value: '2014'},
  {label: '2015', value: '2015'},
  {label: '2016', value: '2016'},
  {label: '2017', value: '2017'}
]

export default class DateInputGroup extends Component {
  constructor (props) {
    super (props)
    this.state = {
      date: props.value ? '' + props.value.date () : '01',
      month: props.value ? '' + props.value.month () : '01',
      year: props.value ? '' + props.value.year () : '1950',
      value: props.value || moment.utc ('1950-01-01')
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

  digest () {
    if (this.state.date && this.state.month && this.state.year) {
      let value = moment.utc (this.state.year + '-' + this.state.month + '-' + this.state.date)
      this.setState ({value: value})
    }
  }

  render () {
    return (
      <div className={c('dateInput')}>
        <span className={c('component', 'month')}>
          <Validation.components.Form>
            <Validation.components.Select
              options={months}
              searchable
              value={this.state.month || '01'}
              name='month'
              placeholder='Month'
              onSelectItem={ this.handleMonthSelected }
              validations={['required']}/>
          </Validation.components.Form>
        </span>
        <span className={c('component', 'date')}>
          <Validation.components.Form>
            <Validation.components.Select
              options={dates}
              searchable
              value={this.state.date || '01'}
              name='date'
              placeholder='Date'
              onSelectItem={ this.handleDateSelected }
              validations={['required']}/>
          </Validation.components.Form>
        </span>
        <span className={c('component', 'year')}>
          <Validation.components.Form>
            <Validation.components.Select
              options={years}
              searchable
              value={this.state.year || '1950'}
              name='year'
              placeholder='Year'
              onSelectItem={ this.handleYearSelected }
              validations={['required']}/>
          </Validation.components.Form>
        </span>
      </div>
    )
  }
}