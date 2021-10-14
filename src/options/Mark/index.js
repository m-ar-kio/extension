import * as React from 'react'
import urlParse from 'url-parse'
import SimpleMarkdown from 'simple-markdown'
import { initTwitterRules } from './rules/twitter'
import { isTwitter } from './helper'
import Tweet from './Tweet'
import Article from './Article'

export default function Mark({ mark }) {
  const rules = {
    ...SimpleMarkdown.defaultRules,
    ...initTwitterRules(mark),
  }
  const rawBuiltParser = SimpleMarkdown.parserFor(rules)
  const parse = function (source) {
    const blockSource = source + '\n\n'
    return rawBuiltParser(blockSource, { inline: false })
  }
  const reactOutput = SimpleMarkdown.outputFor(rules, 'react')

  const tree = parse(mark.content)
  const parsedURL = urlParse(mark.origin, true)

  const _isTwitter = isTwitter(parsedURL.hostname)
  if (_isTwitter) {
    return (
      <Tweet
        tree={tree}
        reactOutput={reactOutput}
        mark={mark}
        parsedURL={parsedURL}
      />
    )
  }
  return (
    <Article
      tree={tree}
      reactOutput={reactOutput}
      mark={mark}
      parsedURL={parsedURL}
    />
  )
}
