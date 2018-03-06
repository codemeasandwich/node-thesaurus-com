"use strict";
const http = require('http');
const cheerio = require("cheerio")

const cachedResults = {}

function search(query) { 
 
 if(cachedResults[query]){
 return cachedResults[query];
 }

 const wordsPromise = new Promise((resolve, reject) => {
 
    const url = 'http://www.thesaurus.com/browse/' + encodeURIComponent(query);
    
    http.get(url, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {

      $ = cheerio.load(data, { ignoreWhitespace: true });

        let synonyms = $('div.relevancy-list ul li a span.text');
            synonyms = synonyms.map(function() {
                return $(this).text();
            }).get()//.sort();
        
        resolve(synonyms);
      }); // END on end

    }).on("error", err=> {
      // removed so can retry
     delete cachedResults[query]
     reject(err);
    });

}) // END Promise

return cachedResults[query] = wordsPromise 

} // END search

exports.search = search;
