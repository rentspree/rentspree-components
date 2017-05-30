import React from 'react'

if (!String.prototype.includes) {
  String.prototype.includes = function () {
    'use strict'
    return String.prototype.indexOf.apply(this, arguments) !== -1
  }
}

// TODO: Rework React.element appearance
module.exports = props => {
  console.log(' props in pull-error =========> ', props)
  let state = props.states[props.name]
  let error = props.errors[props.name]

  if (React.isValidElement(error) || error && error.includes(':')) {
    return error
  }

  return state && state.isUsed && state.isChanged && error
}