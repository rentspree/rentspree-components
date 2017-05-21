import React from 'react'
import { storiesOf } from '@kadira/storybook'
import {
  Validation,
  SearchingBox,
  SingleSelect
} from '../src/index'

storiesOf('Input', module)
  .add('Text', () => (
    <Validation.components.Form>
      <Validation.components.Input
        type='text'
        value=''
        name='text'
        placeholder='Text'
        validations={['required']}/>
    </Validation.components.Form>
  ))
  .add('Password', () => (
    <Validation.components.Form>
      <Validation.components.Input
        type='password'
        value=''
        name='password'
        placeholder='Password'
        validations={['required', 'password', 'length8']}/>
    </Validation.components.Form>
  ))
  .add('Phone', () => (
    <Validation.components.Form>
      <Validation.components.PhoneInput
        type='tel'
        value=''
        name='tel'
        placeholder='Phone Number'
        validations={['required', 'phone']}/>
    </Validation.components.Form>
  ))
  .add('Number', () => (
    <Validation.components.Form>
      <Validation.components.NumberInput
        type='text'
        value=''
        name='number'
        placeholder='Number'
        validations={['required']}/>
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
        validations={['required', 'duplicate']} />
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
      onSelectItem={ ()=>console.log('select') }
      searchable={false}
      value=''
      name='select'
      placeholder='Select...' />
  ))
  .add('With Label', () => (
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
        searchable={false}
        value='one'
        name='select'
        placeholder='Select...'
        validations={['required']} />
    </Validation.components.Form>
  ))
  .add('Searchable', () => (
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
        searchable
        value=''
        name='select'
        placeholder='Select...'
        validations={['required']} />
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
    <SearchingBox onSelected={()=> console.log('Search')} />
  ))