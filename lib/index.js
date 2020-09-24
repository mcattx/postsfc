'use strict'

const Processor = require('./processor')
const parse = require('./parse')

function postsfc(...plugins) {
  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0]
  }
  return new Processor(plugins, postsfc)
}

postsfc.parse = parse

module.exports = postsfc
