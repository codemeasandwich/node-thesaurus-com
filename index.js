
const http = require('http');
var cheerio = require("cheerio")

function search(query) { 

 const wordsPromise = new Promise((resolve, reject) => {
 
    var url = 'http://www.thesaurus.com/browse/' + encodeURIComponent(query);
    
    http.get(url, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {

      $ = cheerio.load(data, { ignoreWhitespace: true });

        var synonyms = $('div.relevancy-list ul li a span.text');
            synonyms = synonyms.map(function() {
                return $(this).text();
            }).get()//.sort();
        
        resolve(synonyms);
      }); // END on end

    }).on("error", reject);

}) // END Promise

return wordsPromise

} // END search

exports.search = search;
