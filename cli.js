#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2))
var scraper = require('./')

var opts = {
  offset: args.offset,
  limit: args.limit,
  rows: args.rows
}

function convertAuthors (authors) {
  var res = []
  for (var i = 0; i < authors.length; i++) {
    var name = authors[i].given + ' ' + authors[i].family
    res.push({
      name: name
    })
  }
  return res
}

var readStream = scraper(opts)
readStream.on('data', function (data) {
  var items = data.message.items
  for (var i = 0; i < items.length; i++) {
    if (args.raw) {
      console.log(JSON.stringify(data))
    } else {
      var bibjson = {
        title: items[i]['title'][0],
        doi: items[i]['DOI'],
        authors: convertAuthors(items[i]['author']),
        journal: items[i]['container-title'][0],
        URL: items[i]['URL']
      }
      console.log(JSON.stringify(bibjson))
    }
  }
})
readStream.on('error', function (err) { throw err })
