'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  // BASE_API: '"https://easy-mock.com/mock/5b8f4e7a830bb75e3ad4c56a"'
})
