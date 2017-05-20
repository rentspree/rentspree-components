import React from 'react'
import Validation from './react-validation/form-validator'

export const InputText = () => (
  <Validation.components.Form>
    <Validation.components.Input
      type='text'
      value=''
      name='text'
      placeholder='Text'
      validations={['required']}/>
  </Validation.components.Form>
)

export const InputPassword = () => (
  <Validation.components.Form>
    <Validation.components.Input
      type='password'
      value=''
      name='password'
      placeholder='Password'
      validations={['required', 'password', 'length8']}/>
  </Validation.components.Form>
)

export const InputPhone = () => (
  <Validation.components.Form>
    <Validation.components.PhoneInput
      type='tel'
      value=''
      name='tel'
      placeholder='Phone Number'
      validations={['required', 'phone']}/>
  </Validation.components.Form>
)

export const InputNumber = () => (
  <Validation.components.Form>
    <Validation.components.NumberInput
      type='text'
      value=''
      placeholder='Number'
      validations={['required']}/>
  </Validation.components.Form>
)

export const TextArea = () => (
  <Validation.components.Form>
    <Validation.components.Textarea
      type='text'
      name='selfintro'
      value=''
      placeholder='Area'
      validations={['required']}
      maxLength={500} />
  </Validation.components.Form>
)

export const Tags = () => (
  <Validation.components.Form>
    <Validation.components.Tags
      type='text'
      name='tags'
      value={[]}
      placeholder="Tags"
      validations={['required', 'duplicate']} />
  </Validation.components.Form>
)

export const Select = () => (
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
)
