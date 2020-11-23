'use strict'

const Parser = require('./parser')

function parse() {
  let parser = new Parser()
  try {
    parser.parse()
  } catch (e) {
    console.warn('parse meets error: ', e.message)
    throw e
  }
  return parser.root
}

module.exports = parse
