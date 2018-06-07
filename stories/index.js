import React from 'react'
import moment from 'moment'
import _ from 'lodash'
import { storiesOf, action } from '@kadira/storybook'
import {
  Validation,
  SearchingBox,
  SingleSelect,
  DateInputGroup
} from '../src/index'

storiesOf('Input', module)
  .add('Text', () => (
    <Validation.components.Form>
      <Validation.components.Input
        type='text'
        value=''
        name='text'
        placeholder='Text'
        validations={['required']}
      />
    </Validation.components.Form>
  ))
  .add('Password', () => (
    <Validation.components.Form>
      <Validation.components.Input
        type='password'
        value=''
        name='password'
        placeholder='Password'
        validations={['required', 'password', 'length8']}
      />
    </Validation.components.Form>
  ))
  .add('Phone', () => (
    <Validation.components.Form>
      <Validation.components.PhoneInput
        type='tel'
        value=''
        name='tel'
        placeholder='Phone Number'
        validations={['required', 'phone']}
      />
    </Validation.components.Form>
  ))
  .add('Number', () => (
    <Validation.components.Form>
      <Validation.components.NumberInput
        type='text'
        value=''
        name='number'
        placeholder='Number'
        validations={['required']}
      />
    </Validation.components.Form>
  ))

// Validation

const validationRules = _.keys(Validation.rules)
const validationStories = storiesOf('Validation', module)

validationRules.forEach((ruleName) => {
  validationStories.add(_.capitalize(ruleName), () =>
    <Validation.components.Form>
      <Validation.components.Input
        type='text'
        value=''
        name={ruleName}
        placeholder={`Rule: ${_.capitalize(ruleName)}`}
        validations={[ruleName]}
      />
    </Validation.components.Form>)
})

Validation.addRule('noZ', ({ invalidChars, styles }) => ({
  rule: value => {
    return /^[a-yA-Y\-\s']+$/.test(value.trim()) || value === ''
  },
  hint: value => {
    let invalids = invalidChars(value, /^[a-yA-Y\-\s']+$/)
    // return <span className={styles.errorMessage}>Valid characters are <strong>A-Z a-z space - '</strong></span>
    return <span className={styles.errorMessage}>Character <strong>{invalids[0]}</strong> is invalid</span>
  }
}))

validationStories.add('New Rule', () => (
  <Validation.components.Form>
    <Validation.components.Input
      type='text'
      value=''
      name='newRule'
      placeholder='Rule: noZ'
      validations={['noZ']}
    />
  </Validation.components.Form>
))

Validation.addRuleWithRegExp('someRegexp', /z{5}/)

validationStories.add('RegExp Rule', () => (
  <Validation.components.Form>
    <Validation.components.Input
      type='text'
      value=''
      name='someRegexp'
      placeholder='Rule: someRegexp'
      validations={['someRegexp']}
    />
  </Validation.components.Form>
))

storiesOf('Textarea', module)
  .add('Text', () => (
    <Validation.components.Form>
      <Validation.components.Textarea
        type='text'
        name='selfintro'
        value=''
        placeholder='Area'
        validations={['required']}
        maxLength={500} />
    </Validation.components.Form>
  ))
  .add('Tags', () => (
    <Validation.components.Form>
      <Validation.components.Tags
        type='text'
        name='tags'
        value={[]}
        placeholder='Tags'
        validations={['required', 'duplicate']}
      />
    </Validation.components.Form>
  ))

storiesOf('Select', module)
  .add('Basic', () => (
    <SingleSelect
      options={[
        {
          label: 'one',
          value: 'one'
        }, {
          label: 'two',
          value: 'two'
        }, {
          label: 'three',
          value: 'three'
        }
      ]}
      selectedValue={''}
      onSelectItem={action('selected')}
      searchable={false}
      noLabel
      name='select'
      placeholder='Select'
    />
  ))
  .add('Basic val', () => (
    <SingleSelect
      options={[
        {
          label: 'one',
          value: 'one'
        }, {
          label: 'two',
          value: 'two'
        }, {
          label: 'three',
          value: 'three'
        }
      ]}
      selectedValue={'one'}
      onSelectItem={action('selected')}
      searchable={false}
      noLabel
      name='select'
      placeholder='Select'
    />
  ))
  .add('Basic + Label', () => (
    <SingleSelect
      options={[
        {
          label: 'one',
          value: 'one'
        }, {
          label: 'two',
          value: 'two'
        }, {
          label: 'three',
          value: 'three'
        }
      ]}
      selectedValue={''}
      onSelectItem={action('selected')}
      searchable={false}
      name='select'
      placeholder='Select'
    />
  ))
  .add('Basic val + Label', () => (
    <SingleSelect
      options={[
        {
          label: 'one',
          value: 'one'
        }, {
          label: 'two',
          value: 'two'
        }, {
          label: 'three',
          value: 'three'
        }
      ]}
      selectedValue={'one'}
      onSelectItem={action('selected')}
      searchable={false}
      name='select'
      placeholder='Select'
    />
  ))
  .add('Validation + Label', () => (
    <Validation.components.Form>
      <Validation.components.Select
        options={[
          {
            label: 'one',
            value: 'one'
          }, {
            label: 'two',
            value: 'two'
          }, {
            label: 'three',
            value: 'three'
          }
        ]}
        onSelectItem={action('selected')}
        searchable={false}
        value=''
        name='select'
        placeholder='Select'
        validations={['required']}
      />
    </Validation.components.Form>
  ))
  .add('Validation val + Label', () => (
    <Validation.components.Form>
      <Validation.components.Select
        options={[
          {
            label: 'one',
            value: 'one'
          }, {
            label: 'two',
            value: 'two'
          }, {
            label: 'three',
            value: 'three'
          }
        ]}
        onSelectItem={action('selected')}
        searchable={false}
        value='one'
        name='select'
        placeholder='Select'
        validations={['required']}
      />
    </Validation.components.Form>
  ))
  .add('Validation + Search', () => (
    <Validation.components.Form>
      <Validation.components.Select
        options={[
          {
            label: 'one',
            value: 'one'
          }, {
            label: 'two',
            value: 'two'
          }, {
            label: 'three',
            value: 'three'
          }
        ]}
        onSelectItem={action('selected')}
        searchable
        value=''
        name='select'
        placeholder='Select'
        validations={['required']}
      />
    </Validation.components.Form>
  ))
  .add('Validation val + Search', () => (
    <Validation.components.Form>
      <Validation.components.Select
        options={[
          {
            label: 'one',
            value: 'one'
          }, {
            label: 'two',
            value: 'two'
          }, {
            label: 'three',
            value: 'three'
          }
        ]}
        onSelectItem={action('selected')}
        searchable
        value='one'
        name='select'
        placeholder='Select'
        validations={['required']}
      />
    </Validation.components.Form>
  ))
  .add('Validation + Search + noLabel', () => (
    <Validation.components.Form>
      <Validation.components.Select
        options={[
          {
            label: 'one',
            value: 'one'
          }, {
            label: 'two',
            value: 'two'
          }, {
            label: 'three',
            value: 'three'
          }
        ]}
        onSelectItem={action('selected')}
        searchable noLabel
        value=''
        name='select' placeholder='Select'
        validations={['required']}
      />
    </Validation.components.Form>
  ))
  .add('Validation val + Search + noLabel', () => (
    <Validation.components.Form>
      <Validation.components.Select
        options={[
          {
            label: 'one',
            value: 'one'
          }, {
            label: 'two',
            value: 'two'
          }, {
            label: 'three',
            value: 'three'
          }
        ]}
        onSelectItem={action('selected')}
        searchable noLabel
        value='one'
        name='select' placeholder='Select'
        validations={['required']}
      />
    </Validation.components.Form>
  ))

storiesOf('Date', module)
  .add('DateInput', () => (
    <Validation.components.Form>
      <Validation.components.DateInput
        type='text'
        value=''
        name='date'
        placeholder='MM/DD/YYYY'
        validations={['required', 'monthdateyear']}
      />
    </Validation.components.Form>
  ))
  .add('MonthYearInput', () => (
    <Validation.components.Form>
      <Validation.components.MonthYearInput
        type='text'
        value=''
        name='monthyear'
        placeholder='MM/YYYY'
        validations={['required', 'monthyear']}
      />
    </Validation.components.Form>
  ))
  .add('DateInputGroup', () => (
    <DateInputGroup
      type='text'
      value=''
      name='date'
      label='Date input group'
      error='Error msg'
      validations={['required']}
    />
  ))
  .add('Picker', () => (
    <Validation.components.Form>
      <Validation.components.DatePick
        type='text'
        value={moment()}
        name='date'
        placeholder='Date'
        validations={['required']}
        dropdownMode='select'
      />
    </Validation.components.Form>
  ))
  .add('Picker with Dropdown', () => (
    <Validation.components.Form>
      <Validation.components.DatePick
        type='text'
        value={moment()}
        name='date'
        placeholder='Date'
        validations={['required']}
        dropdownMode='select'
        showMonthDropdown
        showYearDropdown
      />
    </Validation.components.Form>
  ))

storiesOf('Button', module)
  .add('Submit', () => (
    <Validation.components.Form>
      <Validation.components.Button type='submit'>
        Submit
      </Validation.components.Button>
    </Validation.components.Form>
  ))

storiesOf('Search', module)
  .add('Address', () => (
    <SearchingBox onSelected={() => console.log('Search')} placeholder='Address' />
  ))