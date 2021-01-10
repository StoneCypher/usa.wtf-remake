
const fs = require('fs');

const preface  = fs.readFileSync('./src/preface.html'),
      prologue = fs.readFileSync('./src/prologue.html'),
      postface = fs.readFileSync('./src/postface.html');

const data   = require('../build/data.js'),
      photos = require('./photos.js');



const sen_header = '    <h1><a name="senators"></a>These are the eight senators who participated in the coup</h1>\n\n',
      rep_header = '    <h1><a name="representatives"></a>These are the 139 members of the House of Representatives who participated in the coup</h1><p>Listed in alphabetical order</p>\n\n';  // todo fix explanation



const the_states   = {},
      the_states_r = {},
      the_states_s = {};

data.representatives.forEach(rep => the_states[rep.state] = (the_states[rep.state] || 0) + 1);
data.senators.forEach(       sen => the_states[sen.state] = (the_states[sen.state] || 0) + 1);

data.representatives.forEach(rep => the_states_r[rep.state] = (the_states_r[rep.state] || 0) + 1);
data.senators.forEach(       sen => the_states_s[sen.state] = (the_states_s[sen.state] || 0) + 1);



const state_header = state =>
  `<h1>${
    state === 'all'
      ? 'All states'
      : `State page for ${state}`
  }</h1>`;



const fname_state = state =>
  `index_${
    state.toLowerCase()
         .replace(' ', '_')
  }.html`;



const header = for_state => {

  const subrow = `
        <ul class="subrow">
          <li><a href="#senators">Senators</a></li>
          <li><a href="#representatives">Representatives</a></li>
        </ul>
  `;

  const maybe_all_current_class  =       for_state === 'all'? ' current' : '',
        maybe_all_subrow         =       for_state === 'all'? subrow     : '',
        maybe_each_current_class = sn => for_state === sn   ? ' current' : '',
        maybe_each_subrow        = sn => for_state === sn   ? subrow     : '';

  return `
      <div id="statelist">
        <div class="statebox all${maybe_all_current_class}">
          <a href="index.html" class="all${maybe_all_current_class}">All states</a> (8s, 139r)
        </div>
        ${ maybe_all_subrow }
        ${
        Object.keys(the_states)
              .sort()
              .map(sn =>
                `        <div class="statebox${maybe_each_current_class(sn)}"><a class="${sn.replace(' ', '_')}${
                  maybe_each_current_class(sn)
                }" href="${
                  fname_state(sn)
                }">${
                  sn
                }</a> (${[
                  the_states_s[sn]? `${the_states_s[sn]}s`:'',
                  the_states_r[sn]? `${the_states_r[sn]}r`:''
                ].filter(Boolean)
                 .join(', ')})${
                  maybe_each_subrow(sn)
                }</div>\n`)
              .join(' ')
        }
      </div>
      <div id="main"><div id="mainbox">
`;
}



function billboard_senator(this_senator) {
  return `
<div class="billboard">
  <img class="selfie" src="${photos.photos[this_senator.senator] || 'no-photo.png'}" />
  <h2>Senator <span class="name">${this_senator.senator}</span> of ${this_senator.state}</h2>
  <h3>Offices:</h3>
  <ol>
    ${this_senator.office.map(single_office => `
    <li>
      <div>
        ${single_office.addr.map( (a, i) => `<div class="addr addr_${i}">${a}</div>`).join('')}
      </div>${single_office.phone
        ? single_office.phone.map(p => `<div class="phone">Phone: <a href="tel:${p}">${p}</a></div>`).join('')
        : ''
      }${single_office.fax
        ? single_office.fax.map(f => `<div class="fax">Fax: <a href="${f}">${f}</a></div>`).join('')
        : ''
      }
    </li>`
    ).join('')}
  </ol>
</div>`.trim();
}



function summarize_senator(this_senator) {
  return `<div>
  <span class="name senator">${this_senator.senator}</span> of <a href="${
    fname_state(this_senator.state)
  }">${
    this_senator.state
  }</a>
</div>`;
}



function billboard_representative(this_representative) {
  return `
<div class="billboard">
  <img class="selfie" src="${photos.photos[this_representative.representative] || 'no-photo.png'}" />
  <h2>Representative <span class="name">${
    this_representative.representative
  }</span> of ${ this_representative.state }</h2>
  <h3>Offices:</h3>
  <ol>
    ${this_representative.office.map(single_office => `
    <li>
      <div>
        ${single_office.addr.map( (a, i) =>
          `<div class="addr addr_${i}">${a}</div>`).join('') }
      </div>${single_office.phone
        ? single_office.phone.map(p => `<div class="phone">Phone: <a href="tel:${p}">${p}</a></div>`).join('')
        : ''
      }${single_office.fax
        ? single_office.fax.map(f => `<div class="fax">Fax: <a href="fax:${f}">${f}</a></div>`).join('')
        : ''
      }
    </li>`
    ).join('')}
  </ol>
</div>`.trim();
}



function summarize_representative(this_representative) {
  return `<div>${this_representative.representative} of <a href="${
    fname_state(this_representative.state)
  }">${
    this_representative.state
  }</a></div>`;
}



function newsite() {

  return preface
       + header('all')
       + state_header('all')
       + prologue
       + sen_header
       + data.senators
             .map(this_sen => billboard_senator(this_sen))
             .join('')
       + rep_header
       + data.representatives
             .map(this_rep => billboard_representative(this_rep))
             .join('')
       + postface;

}



function newsite_state(which_state) {

  let prev_state = null,
      these_senator_results;

  const these_senators = data.senators.filter(s => s.state === which_state);

  these_senator_results = (these_senators.length)
    ? these_senators
        .map(this_sen => billboard_senator(this_sen))
        .join('')
    : `<h3 class="clean_senators">🎉 No ${which_state} senators were involved.</h3>`;


  const these_representatives = data.representatives.filter(r => r.state === which_state);

  these_representative_results = (these_representatives.length)
    ? these_representatives
        .map(this_rep => billboard_representative(this_rep))
        .join('')
    : `<h3 class="clean_representatives">🎉 No ${which_state} representatives were involved.</h3>`;


  return preface
       + header(which_state)
       + state_header(which_state)
       + prologue
       + sen_header
       + '<div class="this_state">'
       + these_senator_results
       + `</div><div class="other_state"><h2>Senators from outside ${which_state}</h2>`
       + data.senators
             .filter(s => s.state !== which_state)
             .map(this_sen => summarize_senator(this_sen))
             .join('')
       + '</div>'
       + rep_header
       + '<div class="this_state">'
       + these_representative_results
       + `</div><div class="other_state"><h2>Representatives from outside ${which_state}</h2>`
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
