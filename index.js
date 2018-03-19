
"use strict";
var http = require('http');
const cheerio = require("cheerio")

const cachedSearchResults = {}

function search(query) {

 if(cachedSearchResults[query]){
 return cachedSearchResults[query];
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

return cachedSearchResults[query] = wordsPromise

} // END search

exports.search = search;

var options = {
  hostname: 'api.cortical.io',
  port: 80,
  path: '/rest/terms/similar_terms?retina_name=en_',
  method: 'GET',
};

function read(text,retina_type){
  return new Promise((resolve, reject) => {

    const myoptions = Object.assign({},options)

    myoptions.path += retina_type +"&term=" + encodeURI(text) + "&start_index=0&max_results=15&get_fingerprint=false"

    var req = http.request(myoptions, function(res) {

      res.setEncoding('utf8');
      let data = ""
      res.on('data', (x) => { data += x });
      res.on('end', () => { resolve(JSON.parse(data))   })
    });
    req.on('error', reject);
    // write data to request body

    req.write(text);

    req.end();
  })
}

const cachedSimilarResults = {}

function similar(txt,threshold=0,retinaName="synonymous"){
  
   const query = txt + threshold + retinaName
  
 if(cachedSimilarResults[query]){
 return cachedSimilarResults[query];
 }
 
  
  return cachedSimilarResults[query] = read(txt,retinaName).then(result=>{
      if (!Array.isArray(result)){
        return [] // result.error_description
      }
      
      return result.filter(({term,score})=>term !== txt && score >= threshold)
                   .map(({term})=>term)

    })
}

exports.similar = similar
