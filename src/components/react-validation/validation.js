import Form from './components/Form.react.js'
import Input from './components/Input.react.js'
import NumberInput from './components/NumberInput.react.js'
import Select from './components/Select.react.js'
import Textarea from './components/Textarea.react.js'
import Button from './components/Button.react.js'
import PhoneInput from './components/PhoneInput.react.js'
import Tags from './components/TagsInput.react.js'
import DatePick from './components/DatePick.react.js'
import DateInput from './components/DateInput.react.js'
import MonthYearInput from './components/MonthYearInput.react.js'
import rules from './rules.js'
import {addRule, addRuleWithRegExp} from './validator-helper'

module.exports = {
  components: {
    Form,
    Input,
    NumberInput,
    Select,
    Textarea,
    Button,
    PhoneInput,
    Tags,
    DatePick,
    DateInput,
    MonthYearInput
  },
  rules,
  addRule: addRule.bind(rules),
  addRuleWithRegExp: addRuleWithRegExp.bind(rules)
}
