
const fs = require('fs');

const preface  = fs.readFileSync('./src/preface.html'),
      postface = fs.readFileSync('./src/postface.html');

const data = require('../build/data.js');



const sen_header = '    <h1>These are the eight senators who participated in the coup</h1>\n\n',
      rep_header = '    <h1>These are the 139 members of the House of Representatives who participated in the coup</h1><p>Listed in alphabetical order</p>\n\n';  // todo fix explanation





function newsite() {

  return preface
       + sen_header
       + '<pre>' + JSON.stringify(data.senators, undefined, 2) + '</pre>'
       + rep_header
       + '<pre>' + JSON.stringify(data.representatives, undefined, 2) + '</pre>'
       + postface;

}

fs.writeFileSync('./docs/index.html', newsite());
