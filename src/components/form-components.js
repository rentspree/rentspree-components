import React from 'react'
import Validation from './react-validation/form-validator'

export const Form = ({ children }) => (
  <Validation.components.Form>
    {children}
  </Validation.components.Form>
)

export const Input = ({ ...props }) => (
  <Validation.components.Input {...props} />
)
export const PhoneInput = ({ ...props }) => (
  <Validation.components.PhoneInput {...props} />
)
export const NumberInput = ({ ...props }) => (
  <Validation.components.NumberInput {...props} />
)
export const Textarea = ({ ...props }) => (
  <Validation.components.Textarea {...props} />
)
export const Tags = ({ ...props }) => (
  <Validation.components.Tags {...props} />
)
export const Select = ({ ...props }) => (
  <Validation.components.Select {...props} />
)
export const Button = ({ ...props }) => (
  <Validation.components.Button {...props} />
)
