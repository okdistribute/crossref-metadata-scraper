var qs = require('querystring')
var pager = require('paged-http-stream')

module.exports = function (opts) {
  var i = 0
  var limit = opts.limit || 0
  var rows = opts.rows || 250

  function getOpts (data) {
    var resp = {
      uri: 'http://api.crossref.org/works?' + qs.stringify(data),
      method: 'GET'
    }
    return resp
  }

  function next (data) {
    if (data.message.items.length === 0) return
    i += data.message.items.length
    if (limit && i >= limit) return
    return getOpts({
      cursor: data.message['next-cursor'],
      rows: rows
    })
  }

  return pager(getOpts({cursor: '*', rows: rows}), next)
}
