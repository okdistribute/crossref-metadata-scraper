var qs = require('querystring')
var pager = require('paged-http-stream')

module.exports = function (opts) {
  var i = 0
  var offset = opts.offset || 0
  var limit = opts.limit || 1000
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
    if (i >= limit) return
    return getOpts({
      offset: data.message.query['start-index'] + rows,
      rows: rows
    })
  }

  return pager(getOpts({offset: offset, rows: rows}), next)
}
