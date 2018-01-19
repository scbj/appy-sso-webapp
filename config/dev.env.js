'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const machineEnv = require('../.env')

module.exports = merge(prodEnv, machineEnv, {
  NODE_ENV: '"development"'
})
