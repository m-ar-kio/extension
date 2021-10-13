import { reactElement, unescapeUrl, inlineRegex, prefixLink } from './default'

var LINK_INSIDE = '(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*'
var LINK_HREF_AND_TITLE =
  '\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+[\'"]([\\s\\S]*?)[\'"])?\\s*'

export function initTwitterRules(bookmark) {
  let currOrder = 0
  return {
    image: {
      order: currOrder++,
      match: inlineRegex(
        new RegExp(
          '^!\\[(' + LINK_INSIDE + ')\\]\\(' + LINK_HREF_AND_TITLE + '\\)'
        )
      ),
      parse: function (capture, parse, state) {
        var image = {
          alt: capture[1],
          target: unescapeUrl(capture[2]),
          title: capture[3],
        }
        return image
      },
      react: function (node, output, state) {
        const src = prefixLink(node.target, bookmark.origin)
        return reactElement('img', state.key, {
          src: prefixLink(node.target, bookmark.origin),
          alt: node.alt,
          title: node.title,
          width: src.includes('/hashflags/') ? 18 : undefined,
        })
      },
    },
    link: {
      order: currOrder++,
      match: inlineRegex(
        new RegExp(
          '^\\[(' + LINK_INSIDE + ')\\]\\(' + LINK_HREF_AND_TITLE + '\\)'
        )
      ),
      parse: function (capture, parse, state) {
        var link = {
          content: parse(capture[1], state),
          target: unescapeUrl(capture[2]),
          title: capture[3],
        }
        return link
      },
      react: (node, output, state) => {
        return reactElement('a', state.key, {
          href: prefixLink(node.target, bookmark.origin),
          title: node.title,
          children: output(node.content, state),
          target: '_blank',
        })
      },
    },
  }
}
