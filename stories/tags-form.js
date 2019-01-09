import React from 'react'
import {
  Validation
} from '../src/index'

export default class TagsForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tagsEmail: [],
      tagsPhone: [],
      selected: 'email'
    }
  }

  handleChangeRadio (e) {
    this.setState({ selected: e.target.value })
  }

  render () {
    return (
      <div>
        <input type='radio' name='tag-radio' value='email' onClick={this.handleChangeRadio.bind(this)} /> EMAIL
        <input type='radio' name='tag-radio' value='phone' onClick={this.handleChangeRadio.bind(this)} /> PHONE
        {
          this.state.selected === 'email'
          ? <Validation.components.Form>
            <Validation.components.Tags
              id='dashboardEmailListTagsInput'
              type='text'
              name='emails'
              value={this.state.tagsEmail || []}
              onChangeItem={(tagsEmail) => this.setState({ tagsEmail })}
              placeholder='Enter renters’ emails separated by comma'
              validations={['emailRequired', 'emailArray', 'duplicateEmail']}
              />
            <Validation.components.Button id='dashboardPhonesListSubmitBtn' type='submit'>
              Send Request(s)
            </Validation.components.Button>
          </Validation.components.Form>
            : <Validation.components.Form>
              <Validation.components.Tags
                id='dashboardPhoneListTagsInput'
                type='text'
                name='phoneNumbers'
                value={this.state.tagsPhone || []}
                onChangeItem={(tagsPhone) => this.setState({ tagsPhone })}
                placeholder='Enter renters’ mobile numbers separated by comma'
                validations={['phoneRequired', 'phoneArray', 'duplicatePhone']}
                renderFormattedInput
            />
              <Validation.components.Button id='dashboardEmailsListSubmitBtn' type='submit'>
              Send Request(s)
            </Validation.components.Button>
            </Validation.components.Form>
          }
      </div>
    )
  }
}
