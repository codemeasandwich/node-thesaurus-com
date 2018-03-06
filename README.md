[![npm](https://img.shields.io/npm/v/thesaurus-synonyms.svg)](https://www.npmjs.com/package/thesaurus-synonyms)

## Description

Use [thesaurus.com](http://www.thesaurus.com/) to look up synonyms.


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
var search = require('thesaurus-synonyms');

search('never').then(console.log);


//   [ 'at no time',
//     'don\'t hold your breath',
//     'forget it',
//     'nevermore',
//     'no way',
//     'not at all',
//     'not ever',
//     'not in any way',
//     'not in the least',
//     'not on your life',
//     'not under any condition' ]
```
