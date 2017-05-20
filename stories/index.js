import React from 'react'
import { storiesOf } from '@kadira/storybook'
import {
  Form,
  Input,
  PhoneInput,
  NumberInput,
  Textarea,
  Tags,
  Select,
  Button
} from '../src/index'

storiesOf('Input', module)
  .add('Text', () => (
    <Form>
      <Input
        type='text'
        value=''
        name='text'
        placeholder='Text'
        validations={['required']}/>
    </Form>
  ))
  .add('Password', () => (
    <Form>
      <Input
        type='password'
        value=''
        name='password'
        placeholder='Password'
        validations={['required', 'password', 'length8']}/>
    </Form>
  ))
  .add('Phone', () => (
    <Form>
      <PhoneInput
        type='tel'
        value=''
        name='tel'
        placeholder='Phone Number'
        validations={['required', 'phone']}/>
    </Form>
  ))
  .add('Number', () => (
    <Form>
      <NumberInput
        type='text'
        value=''
        name='number'
        placeholder='Number'
        validations={['required']}/>
    </Form>
  ))

storiesOf('Textarea', module)
  .add('Text', () => (
    <Form>
      <Textarea
        type='text'
        name='selfintro'
        value=''
        placeholder='Area'
        validations={['required']}
        maxLength={500} />
    </Form>
  ))
  .add('Tags', () => (
    <Form>
      <Tags
        type='text'
        name='tags'
        value={[]}
        placeholder='Tags'
        validations={['required', 'duplicate']} />
    </Form>
  ))

storiesOf('Select', module)
  .add('Single', () => (
    <Form>
      <Select
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
    </Form>
  ))

storiesOf('Button', module)
  .add('Submit', () => (
    <Form>
      <Button type='submit'>
        Submit
      </Button>
    </Form>
  ))
