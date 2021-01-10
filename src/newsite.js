
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
        ${single_office.addr.map( (a, i) => `<div class="addr addr_${i}">${a}</div>`).join('')}
      </div>${single_office.phone
        ? single_office.phone.map(p => `<div class="phone">Phone: ${p}</div>`).join('')
        : ''
      }${single_office.fax
        ? single_office.fax.map(f => `<div class="fax">Fax: ${f}</div>`).join('')
        : ''
      }
    </li>`
    ).join('')}
  </ol>
</div>`.trim();
}



function summarize_senator(this_senator) {
  return `<div>
  <span class="name senator">${this_senator.senator}</span>
  of
  <span class="${this_senator.state}">${this_senator.state}</span>
  </div>`;
}



function billboard_representative(this_representative) {
  return `
<div>
  <h1>${this_representative.representative} of ${this_representative.state}</h1>
  <h2>Offices:</h2>
  <ol>
    ${this_representative.office.map(single_office => `
    <li>
      <div>
        ${single_office.addr.map( (a, i) => `<div class="addr addr_${i}">${a}</div>`).join('')}
      </div>${single_office.phone
        ? single_office.phone.map(p => `<div class="phone">Phone: ${p}</div>`).join('')
        : ''
      }${single_office.fax
        ? single_office.fax.map(f => `<div class="fax">Fax: ${f}</div>`).join('')
        : ''
      }
    </li>`
    ).join('')}
  </ol>
</div>`.trim();
}



function summarize_representative(this_representative) {
  return `<div>${this_representative.representative} of ${this_representative.state}</div>`;
}



function newsite_state(which_state) {

  let prev_state = null;

  return preface
       + header
       + prologue
       + sen_header
       + '<div class="this_state">'
       + data.senators
             .filter(s => s.state === which_state)
             .map(this_sen => billboard_senator(this_sen))
             .join('')
       + '</div><div class="other_state">'
       + data.senators
             .filter(s => s.state !== which_state)
             .map(this_sen => summarize_senator(this_sen))
             .join('')
       + '</div>'
       + rep_header
       + '<div class="this_state">'
       + data.representatives
             .filter(r => r.state === which_state)
             .map(this_rep => billboard_representative(this_rep))
             .join('')
       + '</div><div class="other_state">'
       + data.representatives
             .filter(r => r.state !== which_state)
             .map(this_rep => {
               let maybe_header = '';
               if (this_rep.state !== prev_state) {
                 maybe_header = `<h1>${this_rep.state}</h1>`;
                 prev_state   = this_rep.state;
               }
               return maybe_header + summarize_representative(this_rep);
             })
             .join('')
       + '</div>'
       + postface;

}



fs.writeFileSync('./docs/index.html', newsite());

Object.keys(the_states).forEach(
  state => fs.writeFileSync('./docs/' + fname_state(state), newsite_state(state))
);
