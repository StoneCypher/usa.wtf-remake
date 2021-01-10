
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
      <div id="statelist">
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



function billboard_senator(this_senator) {
  return `
<div>
  <h1>${this_senator.senator} of ${this_senator.state}</h1>
  <h2>Offices:</h2>
  <ol>
    ${this_senator.office.map(single_office => `
    <li>
      <div>
        ${single_office.addr.map(a => `<div>${a}</div>`).join('')}
      </div>${single_office.phone
        ? single_office.phone.map(p => `<div>Phone: ${p}</div>`).join('')
        : ''
      }${single_office.fax
        ? single_office.fax.map(f => `<div>Fax: ${f}</div>`).join('')
        : ''
      }
    </li>`
    ).join('')}
  </ol>
</div>`.trim();
}



function summarize_senator(this_senator) {
  return `<div>${this_senator.senator} of ${this_senator.state}</div>`
}



function newsite_state(which_state) {

  return preface
       + header
       + prologue
       + sen_header
       + data.senators
             .filter(s => s.state === which_state)
             .map(this_sen => billboard_senator(this_sen))
             .join('')
       + '<div class="other_state">'
       + data.senators
             .filter(s => s.state !== which_state)
             .map(this_sen => summarize_senator(this_sen))
             .join('')
       + '</div>'
       + rep_header
       + '<pre>' + JSON.stringify(data.representatives.filter(r => r.state === which_state), undefined, 2) + '</pre>'
       + '<pre>' + JSON.stringify(data.representatives.filter(r => r.state !== which_state), undefined, 2) + '</pre>'
       + postface;

}



fs.writeFileSync('./docs/index.html', newsite());

Object.keys(the_states).forEach(
  state => fs.writeFileSync('./docs/' + fname_state(state), newsite_state(state))
);
