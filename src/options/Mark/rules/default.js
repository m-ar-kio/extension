import parse from 'url-parse'

const TYPE_SYMBOL =
  (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) ||
  0xeac7

const UNESCAPE_URL_R = /\\([^0-9A-Za-z\s])/g

/**
 * @param {string} type
 * @param {string | number | null | undefined} key
 * @param {Object<string, any>} props
 * @returns {SimpleMarkdown.ReactElement}
 */
export const reactElement = function (
  type /* : string */,
  key /* : string | number | null | void */,
  props /* : { [string]: any } */
) /* : ReactElement */ {
  var element /* : ReactElement */ =
    /** @type {SimpleMarkdown.ReactElement} */ {
      $$typeof: TYPE_SYMBOL,
      type: type,
      key: key == null ? undefined : key,
      ref: null,
      props: props,
      _owner: null,
    } /* : any */
  return element
}

/**
 * @param {string} rawUrlString
 * @returns {string}
 */
export const unescapeUrl = function (rawUrlString /* : string */) {
  return rawUrlString.replace(UNESCAPE_URL_R, '$1')
}

/**
 * @param {string | null | undefined} url - url to sanitize
 * @returns {string | null} - url if safe, or null if a safe url could not be made
 */
export const sanitizeUrl = function (url /* : ?string */) {
  if (url == null) {
    return null
  }
  try {
    var prot = decodeURIComponent(url)
      .replace(/[^A-Za-z0-9/:]/g, '')
      .toLowerCase()
    if (
      // eslint-disable-next-line no-script-url
      prot.indexOf('javascript:') === 0 ||
      prot.indexOf('vbscript:') === 0 ||
      prot.indexOf('data:') === 0
    ) {
      return null
    }
  } catch (e) {
    // decodeURIComponent sometimes throws a URIError
    // See `decodeURIComponent('a%AFc');`
    // http://stackoverflow.com/questions/9064536/javascript-decodeuricomponent-malformed-uri-exception
    return null
  }
  return url
}

// Creates a match function for an inline scoped element from a regex
/** @type {(regex: RegExp) => SimpleMarkdown.MatchFunction} */
export const inlineRegex = function (regex /* : RegExp */) {
  /** @type {SimpleMarkdown.MatchFunction} */
  const match /* : MatchFunction */ = function (source, state) {
    if (state.inline) {
      return regex.exec(source)
    } else {
      return null
    }
  }
  match.regex = regex
  return match
}

export const prefixLink = (url, origin) => {
  if (!origin) {
    return sanitizeUrl(url)
  }
  if (url.startsWith('/')) {
    const result = parse(origin, true)
    return `${result.origin}${sanitizeUrl(url)}`
  }
  return sanitizeUrl(url)
}
