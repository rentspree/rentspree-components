import React from 'react'
import Validation from './react-validation/form-validator'

export const VForm = ({ children }) => (
  <Validation.components.Form>
    {children}
  </Validation.components.Form>
)

export const VInput = ({ ...props }) => (
  <Validation.components.Input {...props} />
)
export const VPhoneInput = ({ ...props }) => (
  <Validation.components.PhoneInput {...props} />
)
export const VNumberInput = ({ ...props }) => (
  <Validation.components.NumberInput {...props} />
)
export const VTextarea = ({ ...props }) => (
  <Validation.components.Textarea {...props} />
)
export const VTags = ({ ...props }) => (
  <Validation.components.Tags {...props} />
)
export const VSelect = ({ ...props }) => (
  <Validation.components.Select {...props} />
)
export const VButton = ({ ...props }) => (
  <Validation.components.Button {...props} />
)

export class TestComponent extends React.Component {
  render() {
    return (
      <div>This is Test Component</div>
    )
  }
}
