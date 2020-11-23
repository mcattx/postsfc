'use strict'
const tokenizer = require('./tokenize')

class Parser {
  constructor(input) {
    this.input = input

    this.root = {
      nodes: [],
      type: 'root'
    }
    this.current = this.root
    this.spaces = ''
    this.semicolon = false
    this.customProperty = false
    this.createTokenizer()
  }

  createTokenizer () {
    this.tokenizer = tokenizer(this.input)
  }

  parse() {
    let token
    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken()
      console.log(token)

      switch (token[0]) {
        case 'space':
          this.spaces += token[1]
          break

        default:
          this.other(token)
          break
      }
    }
    this.endFile()
  }

  comment(token) {

  }

  other (start) {

  }

  end (token) {

  }

  endOfFile () {

  }

  // Helper

  getPosition (offset) {

  }

  init (node, offset) {
    this.current.push(node)
    node.source = {
      start: 0,
      input: this.input
    }
    node.raws.before = this.spaces
    this.spaces = ''
    if (node.type !== 'comment') {
      this.semicolon = false
    }
  }

  raw () {

  }

  // Errors

  unclosedBracket (bracket) {

  }
}

module.exports = Parser
