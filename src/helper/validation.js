export const required = value => (value ? undefined : 'Required')

export const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)

export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`

export const validateEmail = value => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(value) ? 'Must be an email address' : undefined
}

export const validateYear = value => {
  const re = /^[12][0-9]{3}$/
  return !re.test(value) ? 'Must be a year from 1000 to 2999' : undefined
}

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)