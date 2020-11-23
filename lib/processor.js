'use strict'
let pkg = require('../package')

class Processor {
  constructor(plugins = []) {
    this.version = pkg.version
    this.plugins = this.normalize(plugins)
  }

  use(plugin) {
    this.plugins = this.plugins.concat(this.normalize([plugin]))
    return this
  }

  process() {
    if (this.plugins.length === 0) {
      console.warn('You did not set any plugins.')
    }
  }

  normalize(plugins) {
    let normalized = []
    for (let i of plugins) {
      if (i.postsfc === true) {
        i = i()
      } else if (i.postsfc) {
        i = i.postsfc
      }
      
      if (typeof i === 'object' && Array.isArray(i.plugins)) {
        normalized = normalize.concat(i.plugins)
      } else if (typeof i === 'object' && i.postsfcPlugin) {
        normalized.push(i)
      } else if (typeof i === 'function') {
        normalized.push(i)
      } else {
        throw new Error(i + ' is not a Postsfs plugin')
      }
    }
    return normalized
  }
}

module.exports = Processor
