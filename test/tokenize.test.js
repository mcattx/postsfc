let tokenizer = require('../lib/tokenize')
const fs = require('fs')
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, './test.vue')).toString()

r = tokenizer(input)
console.log(res = r.nextToken())
console.log(r.nextToken())
console.log(r.nextToken())
console.log(r.nextToken())
console.log(r.endOfFile())


function tokenize(input, options) {
  let processor = tokenizer(input, options)
  let tokens = []
  while (!processor.endOfFile()) {
    tokens.push(processor.nextToken())
  }
  return tokens
}

function run(input, tokens, options) {
  expect(tokenize(input, options)).toEqual(tokens)
}

// it('tokenizes empty file', () => {
//   run('', [])
// })
