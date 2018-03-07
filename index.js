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

     const $ = cheerio.load(data, { ignoreWhitespace: true });

        let synonyms = [];
	let mostRelevantVal = 1
        const relevants = $('div.relevancy-list ul li a').map((i,elem)=>{
           const relevantVal = +JSON.parse(elem.attribs["data-category"]).name.split("-").pop()
           mostRelevantVal = relevantVal > mostRelevantVal ? relevantVal : mostRelevantVal;
           return relevantVal
        })
    
        $('div.relevancy-list ul li a span.text').map((i,elem)=>synonyms.push({word:elem.children[0].data, relevant:relevants[i]}))
        
       resolve(synonyms.filter(word => word.relevant === mostRelevantVal).map(word=>word.word).sort());
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
