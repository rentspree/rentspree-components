import React from 'react'
import { storiesOf } from '@kadira/storybook'
import {
  InputText,
  InputPassword,
  InputPhone,
  InputNumber,
  TextArea,
  Tags,
  Select,
Footer
} from '../src/index'

storiesOf('Input', module)
  .add('Text', () => (
    <InputText />
  ))
  .add('Password', () => (
    <InputPassword />
  ))
  .add('Phone', () => (
    <InputPhone />
  ))
  .add('Number', () => (
    <InputNumber />
  ))
  .add('Footer', () => (
    <Footer />
  ))

storiesOf('Textarea', module)
  .add('Text', () => (
    <TextArea />
  ))
  .add('Tags', () => (
    <Tags />
  ))

storiesOf('Select', module)
  .add('Single', () => (
    <Select />
  ))
