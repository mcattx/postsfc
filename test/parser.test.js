let Parser = require('../lib/parser')
const fs = require('fs')
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, './test.vue')).toString()

const p = new Parser(input)
console.log(p.parse())
