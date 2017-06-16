import React from 'react'
import * as Validation from './validation'
import validator from 'validator'
import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'

const styles = require('./form-validator.scss')

// Use Object.assign or any similar API to merge a rules
Object.assign(Validation.rules, {
  none: {
    rule: (value, component, form) => {
      return true
    }
  },

  // Key name maps the rule
  required: {
    // Function to validate value
    rule: (value, component, form) => {
      if (typeof value === 'string') {
        return value.trim() !== ''
      } else if (typeof value === 'number') {
        return true;
      } else if (Array.isArray(value)) {
        return value.length !== 0
      } else {
        return !!value
      }
    },
    // Function to return hint
    // You may use current value to inject it in some way to the hint
    hint: value => {
      return <span className={styles.errorMessage}>Required</span>
    }
  },
  email: {
    // Example usage with external 'validator'
    rule: value => {
      return validator.isEmail(value.trim()) || value === ''
    },
    hint: value => {
      return <span className={styles.errorMessage}>Invalid Email format</span>
    }

    // rule: (value, component, form) => {
    //   let email = form.state.states.email;
    //   let emailConfirm = form.state.states.emailConfirm;
    //
    //   let isBothUsed = email && emailConfirm && email.isUsed && emailConfirm.isUsed;
    //   let isBothChanged = isBothUsed && email.isChanged && emailConfirm.isChanged;
    //
    //   if(!isBothUsed || !isBothChanged) {
    //     return true;
    //   }
    //
    //   return email.value === emailConfirm.value;
    // },
    // hint: value => {
    //   return <div className={styles.errorMessage}>Email mismatch.</div>
    // }

  },
  emailArray: {
    // Example usage with external 'validator'
    rule: value => {
      if (Array.isArray(value) && value.length > 0) {
        return _.findIndex(value, function (v) { return !validator.isEmail(v.trim()) || v === '' }) === -1
      }
    },
    hint: value => {
      return <span className={styles.errorMessage}>Invalid Email format</span>
    }

    // rule: (value, component, form) => {
    //   let email = form.state.states.email;
    //   let emailConfirm = form.state.states.emailConfirm;
    //
    //   let isBothUsed = email && emailConfirm && email.isUsed && emailConfirm.isUsed;
    //   let isBothChanged = isBothUsed && email.isChanged && emailConfirm.isChanged;
    //
    //   if(!isBothUsed || !isBothChanged) {
    //     return true;
    //   }
    //
    //   return email.value === emailConfirm.value;
    // },
    // hint: value => {
    //   return <div className={styles.errorMessage}>Email mismatch.</div>
    // }
  },
  // This example shows a way to handle common task - compare two fields for equality
  password: {
    // rule function can accept 2 extra arguments:
    // component - current checked component
    // form - form component which has 'states' inside native 'state' object
    rule: (value, component, form) => {
      // form.state.states[name] - name of corresponding field
      let password = form.state.states.password
      let passwordConfirm = form.state.states.passwordConfirm
      // isUsed, isChanged - public properties
      let isBothUsed = password && passwordConfirm && password.isUsed && passwordConfirm.isUsed
      let isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged

      if (!isBothUsed || !isBothChanged) {
        return true
      }
      if (password.value === '' || passwordConfirm.value === '') {
        return true
      }

      return password.value === passwordConfirm.value
    },
    hint: value => {
      return <span className={styles.errorMessage}>Passwords mismatch</span>
    }
  },
  transUnionName: {
    rule: value => {
      return /^[a-zA-Z\-\s']+$/.test(value.trim()) || value === '';
    },
    hint: value => {
      let invalids = invalidChars(value, /^[a-zA-Z\-\s']+$/)
      // return <span className={styles.errorMessage}>Valid characters are <strong>A-Z a-z space - '</strong></span>
      return <span className={styles.errorMessage}>Character <strong>{invalids[0]}</strong> is invalid</span>
    }
  },
  transUnionCity: {
    rule: value => {
      return /^[a-zA-Z\s]+$/.test(value.trim()) || value === '';
    },
    hint: value => {
      let invalids = invalidChars(value, /^[a-zA-Z\s]+$/)
      // return <span className={styles.errorMessage}>Valid characters are <strong>A-Z a-z space</strong></span>
      return <span className={styles.errorMessage}>Character <strong>{invalids[0]}</strong> is invalid</span>
    }
  },
  transUnionAddress: {
    rule: value => {
      return /^[a-zA-Z0-9\s'\-.,()&#]+$/.test(value.trim()) || value === '';
    },
    hint: value => {
      let invalids = invalidChars(value, /^[a-zA-Z0-9\s'\-.,()&#]+$/)
      // return <span className={styles.errorMessage}>Valid characters are <strong>A-Z a-z 0-9 space ' - . , () & #</strong></span>
      return <span className={styles.errorMessage}>Character <strong>{invalids[0]}</strong> is invalid</span>
    }
  },
  transUnionDob: {
    rule: value => {
      if(moment.isMoment(value)) {
        return value < moment().subtract(18, 'years') || value === '';
      }
      else {
        return moment(value, 'MM/DD/YYYY') < moment().subtract(18, 'years') || value === '';
      }
    },
    hint: value => {
      return <span className={styles.errorMessage}>You must be older than 18 years old</span>
    }
  },
  length8: {
    rule: value => {
      return value.trim().length >= 8 || value === ''
    },
    hint: value => {
      return <span />
    }
  },
  length3to500: {
    rule: value => {
      return (value.trim().length >= 3 && value.trim().length <= 500) || value === ''
    },
    hint: value => {
      return <span className={styles.errorMessage}>Length must be between 3 to 500 characters</span>
    }
  },
  length3to250: {
    rule: value => {
      return (value.trim().length >= 3 && value.trim().length <= 250) || value === ''
    },
    hint: value => {
      return <span className={styles.errorMessage}>Length must be between 3 to 250 characters</span>
    }
  },
  length3to50: {
    rule: value => {
      return (value.trim().length >= 3 && value.trim().length <= 50) || value === ''
    },
    hint: value => {
      return <span className={styles.errorMessage}>Length must be between 3 to 50 characters</span>
    }
  },
  lengthMax50: {
    rule: value => {
      return (value.trim().length <= 50) || value == '';
    },
    hint: value => {
      return <span className={styles.errorMessage}>Cannot be longer than 50 characters</span>
    }
  },
  lengthMax25: {
    rule: value => {
      return (value.trim().length <= 25) || value == '';
    },
    hint: value => {
      return <span className={styles.errorMessage}>Cannot be longer than 25 characters</span>
    }
  },
  lengthMax15: {
    rule: value => {
      return (value.trim().length <= 15) || value == '';
    },
    hint: value => {
      return <span className={styles.errorMessage}>Cannot be longer than 15 characters</span>
    }
  },
  lengthMin2: {
    rule: value => {
      return value.trim().length >= 2 || value === '';
    },
    hint: value => {
      return <span className={styles.errorMessage}>Must be at least 2 characters</span>
    }
  },
  lengthMin3: {
    rule: value => {
      return value.trim().length >= 3 || value === '';
    },
    hint: value => {
      return <span className={styles.errorMessage}>Must be at least 3 characters</span>
    }
  },
  hasNumber: {
    rule: value => {
      return /[0-9]/.test(value.trim()) || value === ''
    },
    hint: value => {
      return <span className={styles.errorMessage}>Must contains at least 1 number</span>
    }
  },
  hasLowercase: {
    rule: value => {
      return /[a-z]/.test(value.trim()) || value === ''
    },
    hint: value => {
      return <span className={styles.errorMessage}>Must contains at least 1 lowercase character</span>
    }
  },
  hasUppercase: {
    rule: value => {
      return /[A-Z]/.test(value.trim()) || value === ''
    },
    hint: value => {
      return <span className={styles.errorMessage}>Must contains at least 1 uppercase character</span>
    }
  },
  phone: {
    rule: value => {
      return value.length === 10 || value === ''
    },
    hint: value => {
      return <span className={styles.errorMessage}>Invalid Phone Number</span>
    }
  },
  ssn: {
    rule: (value, component, form) => {

      let ssn = form.state.states.ssn
      let ssnConfirm = form.state.states.ssnConfirm
      // isUsed, isChanged - public properties
      let isBothUsed = ssn && ssnConfirm && ssn.isUsed && ssnConfirm.isUsed
      let isBothChanged = isBothUsed && ssn.isChanged && ssnConfirm.isChanged

      if (!isBothUsed || !isBothChanged) {
        return true
      }
      if(ssn.value === '' || ssnConfirm.value === '') {
        return true
      }

      return ssn.value === ssnConfirm.value
    },
    hint: value => {
      return <span className={styles.errorMessage}>SSN mismatch</span>
    }
  },
  ssnLength9: {
    rule: value => {
      return value.trim().length >= 9 || value === ''
    },
    hint: value => {
      return <span className={styles.errorMessage}>SSN must have 9 digits</span>
    }
  },
  monthyear: {
    rule: value => {
      let month = 0;
      let year = 0;

      if (value) {
        if (value.trim().length === 7 && value.indexOf('/') === 2) {
          if (/^[0-9]*$/.test(value.substring(0, 2))) {
            month = numeral(value.substring(0, 2));
          }
          if (/^[0-9]*$/.test(value.substring(3, 7))) {
            year = numeral(value.substring(3, 7));
          }
        } else {
          return false;
        }
      } else {
        return value === ''
      }
      return month > 0 && month <= 12 && year > 0;
    },

    hint: value => {
      return <span className={styles.errorMessage}>Wrong format</span>
    }
  },
  monthdateyear: {
    rule: value => {
      let date = 0
      let month = 0
      let year = 0

      if (value) {
        if (value.trim().length === 10 && value.indexOf('/') === 2 && value.lastIndexOf('/') === 5) {
          if (/^[0-9]*$/.test(value.substring(0, 2))) {
            month = numeral(value.substring(0, 2));
          }
          if (/^[0-9]*$/.test(value.substring(3, 5))) {
            date = numeral(value.substring(3, 5));
          }
          if (/^[0-9]*$/.test(value.substring(6))) {
            year = numeral(value.substring(6));
          }
        } else {
          return false;
        }
      } else {
        return value === ''
      }
      return date > 0 && date <= 31 && month > 0 && month <= 12 && year > 0
    },

    hint: value => {
      return <span className={styles.errorMessage}>Wrong format</span>
    }
  },
  /// validate value in array duplicate
  duplicate: {
    rule: value => {
      return (new Set(value)).size === value.length
    },
    hint: value => {
      return <span className={styles.errorMessage}>Duplicate items are not allowed</span>
    }
  },
  zipcode: {
    rule: value => {
      return /^\d{5}$/.test(value.trim()) || value === ''
    },
    hint: value => {
      return <span className={styles.errorMessage}>Allow only 5 digit number</span>
    }
  }
})

function invalidChars (string, regex) {
  let arr = string.split('')
  let invalids = []
  for (let i = 0; i < arr.length; i++) {
    if (!regex.test(arr[i])) {
      invalids.push(arr[i])
    }
  }
  return invalids
}

export default Validation
