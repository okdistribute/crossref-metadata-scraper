# crossref-metadata-scraper

Scrape crossref metadata.

[![NPM](https://nodei.co/npm/crossref-metadata-scraper.png)](https://nodei.co/npm/crossref-metadata-scraper/)

## CLI Example

```
crossref-metadata-scraper --rows=5 --offset=25 --limit=500
```

## Options

* `rows`: number of rows per page
* `offset`: the row number to start returning results
* `limit`: the total number of rows before stopping
* `raw`: will output the raw crossref data instead of bibjson

## JS

```
var scraper = require('crossref-metadata-scraper')
var opts = {
  offset: 5,
  limit: 1000,
  rows: 200
}
var readStream = scraper(opts)
readStream.on('data', function (page) {
  // a page of crossref results
  console.log(page)
})
```

