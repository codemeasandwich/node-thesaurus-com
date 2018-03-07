[![npm](https://img.shields.io/npm/v/thesaurus-synonyms.svg)](https://www.npmjs.com/package/thesaurus-synonyms)

## Description

Use [cortical.io](http://www.cortical.io/) and [thesaurus.com](http://www.thesaurus.com/) to look up synonyms.

[cortical.io](http://www.cortical.io/) a is a sparse distributed semantic space (also referred to as Distributional Memory) for natural language processing

 [thesaurus.com](http://www.thesaurus.com/) is the world's largest and most trusted free online thesaurus brought to you by Dictionary.com.

## Installation

```
$ npm install -g thesaurus-synonyms
```

Or install it into the current directory, so you can play around with it:

```
$ npm install --save thesaurus-synonyms
```

## Usage

```javascript
var thesaurus = require('thesaurus-synonyms');

// get results from cortical.io
thesaurus.similar('never').then(console.log);

// get results from thesaurus.com
thesaurus.search('never').then(console.log);
```

### output

```javascript
   [ 'at no time',
     'don\'t hold your breath',
     'forget it',
     'nevermore',
     'no way',
     'not at all',
     'not ever',
     'not in any way',
     'not in the least',
     'not on your life',
     'not under any condition' ]
```


## .similar - cortical.io

### parameters

1. **txt**: the word to search against
2. **threshold**: a numeric score to indicate how similar the word is to the target. **Defaults 0**
3. **retinaName**: to indicate if the search should be for similar("**synonymous**") or associated("**associative**") words. **Defaults "synonymous"**
