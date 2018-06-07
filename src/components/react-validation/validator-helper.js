import React from 'react'
const styles = require('./form-validator.scss')

export const invalidChars = function (string, regex) {
  let arr = string.split('')
  let invalids = []
  for (let i = 0; i < arr.length; i++) {
    if (!regex.test(arr[i])) {
      invalids.push(arr[i])
    }
  }
  return invalids
}

export const addRule = function (ruleName, fn) {
  this[ruleName] = fn({ invalidChars, styles })
}

export const addRuleWithRegExp = function (ruleName, regexp) {
  this[ruleName] = {
    rule: value => {
      return regexp.test(value.trim()) || value === ''
    },
    hint: value => {
      let invalids = invalidChars(value, regexp)
      // return <span className={styles.errorMessage}>Valid characters are <strong>A-Z a-z space - '</strong></span>
      return <span className={styles.errorMessage}>Character <strong>{invalids[0]}</strong> is invalid</span>
    }
  }
}