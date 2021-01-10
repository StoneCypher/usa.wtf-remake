
const fs = require('fs');

const preface  = fs.readFileSync('./src/preface.html'),
      prologue = fs.readFileSync('./src/prologue.html'),
      postface = fs.readFileSync('./src/postface.html');

const data = require('../build/data.js');



const sen_header = '    <h1>These are the eight senators who participated in the coup</h1>\n\n',
      rep_header = '    <h1>These are the 139 members of the House of Representatives who participated in the coup</h1><p>Listed in alphabetical order</p>\n\n';  // todo fix explanation



const the_states = {};
data.representatives.forEach(rep => the_states[rep.state] = true);
data.senators.forEach(       sen => the_states[sen.state] = true);



const fname_state = (state) =>
  `index_${
    state.toLowerCase()
         .replace(' ', '_')
  }.html`;



const header = `
      <div id="header">
        <a href="index.html">All states</a> -
        ${
        Object.keys(the_states)
              .sort()
              .map(sn => `        <a href="${fname_state(sn)}">${sn}</a>\n`)
              .join(' ')
        }
      </div>
      <div id="main">
`;



function newsite() {

  return preface
       + header
       + prologue
       + sen_header
       + '<pre>' + JSON.stringify(data.senators, undefined, 2) + '</pre>'
       + rep_header
       + '<pre>' + JSON.stringify(data.representatives, undefined, 2) + '</pre>'
       + postface;

}



function newsite_state(which_state) {

  return preface
       + header
       + prologue
       + sen_header
       + '<pre>' + JSON.stringify(data.senators.filter(s => s.state === which_state), undefined, 2) + '</pre>'
       + '<pre>' + JSON.stringify(data.senators.filter(s => s.state !== which_state), undefined, 2) + '</pre>'
       + rep_header
       + '<pre>' + JSON.stringify(data.representatives.filter(r => r.state === which_state), undefined, 2) + '</pre>'
       + '<pre>' + JSON.stringify(data.representatives.filter(r => r.state !== which_state), undefined, 2) + '</pre>'
       + postface;

}



fs.writeFileSync('./docs/index.html', newsite());

Object.keys(the_states).forEach(
  state => fs.writeFileSync('./docs/' + fname_state(state), newsite_state(state))
);
