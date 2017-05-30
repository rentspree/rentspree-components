import React, { Component, PropTypes } from 'react'
import rules from './../rules.js'
import Button from './Button.react.js'

class Form extends Component {
  constructor (props) {
    super (props)

    this.state = {
      errors: {},
      states: {}
    }

    this.components = {}

    this._unregister = this._unregister.bind(this)
    this._register = this._register.bind (this)
    this._update = this._update.bind (this)
    this._validate = this._validate.bind (this)
    this.validate = this.validate.bind (this)
  }

  _extendProps (props) {
    let _unregister = this._unregister
    let _register = this._register
    let _update = this._update
    let _validate = this._validate
    let validate = this.validate

    return Object.assign (props, {
      _unregister,
      _register,
      _update,
      _validate,
      validate
    })
  }

  _unregister (component) {
    delete this.components[component.props.name]
    this._validate ()
  }

  _register (component) {
    this.components[component.props.name] = component
  }

  _update (component, event, isChanged, isUsed) {
    // FIXME: remove mutation
    this.state.states[component.props.name] = this.state.states[component.props.name] || {}

    let componentState = this.state.states[component.props.name]
    let checkbox = (component.props.type === 'checkbox' || component.props.type === 'radio')

    //Some Component onChange & onBlur callback does not return event but value instead
    //So need to check if event is a value (event.target === undefined) or a real event
    Object.assign (componentState, {
      value: event.target ? (event.target.selectedOptions ? Array.prototype.map.call (event.target.selectedOptions, option => option.value) : event.target.value) : event,
      isChanged: isChanged || componentState.isChanged || event.type === 'change' || !event.target, //If event = value > force set true
      isUsed: isUsed || checkbox || componentState.isUsed || event.type === 'blur' || !event.target,
      isChecked: !componentState.isChecked
    })

    this._validate ()
  }

  _validate () {
    //let errors = Object.assign ({}, this.state.errors)
    let errors = {} // The removed components should not show any errors
    Object.keys (this.components).forEach (key => {

      let error = this._getError (this.components[key])
      error ? Object.assign (errors, error) : delete errors[this.components[key].props.name]
    })

    this.setState ({
      errors
    })
    //console.log(errors)
    return errors
  }

  _getError (component) {
    let validations = component.props.validations
    let i = validations.length
    let hasError = false
    let error = null

    while (i--) {
      let validation = validations[validations.length - i - 1]
      let value = this.state.states.hasOwnProperty (component.props.name)
        ? this.state.states[component.props.name].value
        : component.props.value || ''

      if ((component.props.type === 'checkbox' || component.props.type === 'radio') && component.refs.node && !component.refs.node.checked) {
        value = ''
      }

      if (!rules[validation].rule (value, component, this)) {
        error = {}
        error[component.props.name] = validation
        hasError = true

        break
      }
    }
    return error
  }

  _clone (children) {
    return React.Children.map (children, child => {
      if (typeof child !== 'object') {
        return child
      }
      let props = {}
      let isValidationComponent = child.props.validations && child.props.validations.length
      console.log(' child.type.name   =========> ', child.type.name)
      if (child.type === Button || isValidationComponent) {
        props = Object.assign ({}, this.state)

        this._extendProps (props)
        // if (isValidationComponent) {
        //   this._extendProps (props)
        // }
      }

      props.children = this._clone (child.props.children)

      return React.cloneElement (child, props)
    }, this)
  }

  _markUsedAndChanged (name) {
    // FIXME: remove mutation
    this.state.states[name] = this.state.states[name] || {}
    let componentState = this.state.states[name]

    Object.assign (componentState, {
      //value: this.state.states[name].value || this.components[name].props.value,
      isChanged: true,
      isUsed: true
    })
  }

  showError (name, error) {
    let errors = Object.assign ({}, this.state.errors)

    errors[name] = error

    this.setState ({
      errors
    })
  }

  hideError (name) {
    let errors = Object.assign ({}, this.state.errors)

    delete errors[name]

    this.setState ({
      errors
    })
  }

  validate (name) {
    this._markUsedAndChanged(name)
    this._validate ()
  }

  validateAll () {
    Object.keys (this.components).forEach (this.validate)

    return this._validate ()
  }

  render () {
    return <form {...this.props}>
      {this._clone (this.props.children)}
    </form>
  }
}

module.exports = Form