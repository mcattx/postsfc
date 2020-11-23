'use strict'

const RE_TEMPLATE_LEFT_TAG = /\<template/ig
const RE_TEMPLATE_RIGHT_TAG = /<\/template\>/ig
const RE_SCRIPT_LEFT_TAG = /\<script/ig
const RE_SCRIPT_RIGHT_TAG = /<\/script\>\>/ig
const RE_STYLE_LEFT_TAG = /\<style/g
const RE_STYLE_RIGHT_TAG = /<\/style\>/g

const NEWLINE = '\n'.charCodeAt(0)
const SPACE = ' '.charCodeAt(0)
const TAB = '\t'.charCodeAt(0)
const CR = '\r'.charCodeAt(0)
const FEED = '\f'.charCodeAt(0)
const COLON = ':'.charCodeAt(0)
const SEMICOLON = ';'.charCodeAt(0)
const OPEN_PARENTHESES = '{'.charCodeAt(0)
const CLOSE_PARENTHESES = '}'.charCodeAt(0)

function tokenize(input, options = {}) {
  let inputString = input.toString()
  let code
  let currentToken
  let result = []
 
  let pos = 0
  let returned = []
  let buffer = []
  let inputLength = input.length

  function position () {
    return pos
  }

  function unclosed(what) {
    throw new Error('Unclosed ' + what, pos)
  }

  function endOfFile () {
    return result.length === 0 && pos >= inputLength
  }

  function nextToken (opts) {
    if (result.length) {
      return result.pop()
    }
    if (pos >= inputLength) {
      return
    }

    code = input.charCodeAt(pos)

    switch(code) {
      case NEWLINE:
      case SPACE:
      case TAB:
      case CR:
      case FEED: {
        next = pos
        do {
          next += 1
          code = inputString.charCodeAt(next)
        } while (
          code === SPACE ||
          code === NEWLINE ||
          code === TAB ||
          code === CR ||
          code === FEED
        )
      }

      case COLON:
      case SEMICOLON:
      case CLOSE_PARENTHESES: {
        let controlChar = String.fromCharCode(code)
        currentToken = [controlChar, controlChar, pos]
        break
      }

      case RE_TEMPLATE_LEFT_TAG:
        currentToken = ['template@start', inputString.slice(pos, next + 1), pos, next]
        buffer.push(currentToken)
        break;
      case RE_TEMPLATE_RIGHT_TAG:
        currentToken = ['template@end', inputString.slice(pos, next + 1), pos, next]
        buffer.push(currentToken)
        break;
      case RE_SCRIPT_LEFT_TAG:
        currentToken = ['script@start', inputString.slice(pos, next + 1), pos, next]
        buffer.push(currentToken)
        break;
      case RE_SCRIPT_RIGHT_TAG:
        currentToken = ['script@end', inputString.slice(pos, next + 1), pos, next]
        buffer.push(currentToken)
        break;
      case RE_STYLE_LEFT_TAG:
        currentToken = ['style@start', inputString.slice(pos, next + 1), pos, next]
        buffer.push(currentToken)
        break;
      case RE_STYLE_RIGHT_TAG:
        currentToken = ['style@end', inputString.slice(pos, next + 1), pos, next]
        buffer.push(currentToken)
        break;
      default: {
        if (true) {
          currentToken = ['default', inputString.slice(pos, next + 1), pos, next]
          buffer.push(currentToken)
        }
        break
      }
    }

    pos++
    return currentToken
  }

  function back (token) {
    result.push(token)
  }

  return {
    back,
    nextToken,
    position,
    endOfFile
  }
}

module.exports = tokenize
