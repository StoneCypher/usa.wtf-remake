
const should_minify = true;



const fs   = require('fs'),
      reps = `${fs.readFileSync('./src/representatives.html')}`,
      sens = `${fs.readFileSync('./src/senators.html')}`;

const peg_reps = require('../build/peg_representatives.js'),
      peg_sens = require('../build/peg_senators.js');

const pegged_reps = peg_reps.parse(reps).filter(r => r.kind !== 'break'),
      pegged_sens = peg_sens.parse(sens).filter(s => s.kind !== 'break');



const state_forcings = {
  "Ted Cruz"         : "Texas",
  "Josh Hawley"      : "Missouri",
  "Cindy Hyde-smith" : "Mississippi",
  "John Kennedy"     : "Louisiana",
  "Cynthia Lummis"   : "Wyoming",
  "Roger Marshall"   : "Kansas",
  "Rick Scott"       : "Florida",
  "Tommy Tuberville" : "Alabama"
};

Object.keys(state_forcings).map(sf => {
  const idx = pegged_sens.findIndex(pg_sen => pg_sen.senator === sf);
  pegged_sens[idx].state = state_forcings[sf];
});



function scribe(should_minify, pegged_sens, pegged_reps) {

  const mnl   = should_minify ? '' : '\n',
        m1sp  = should_minify ? '' : ' ',
        m10sp = should_minify ? '' : '         ';

  const ps = should_minify
           ? JSON.stringify(pegged_sens)
           : JSON.stringify(pegged_sens, undefined, 2);

  const pr = should_minify
           ? JSON.stringify(pegged_reps)
           : JSON.stringify(pegged_reps, undefined, 2);

  const senator_export        = `${m1sp}senators${m1sp}:${m1sp}${ps}${m1sp}`,
        representative_export = `${m1sp}representatives${m1sp}:${m1sp}${pr}${m1sp}`,
        exported              = `senators:${ps},${m1sp}representatives:${pr}`,
        export_claim          = `module.exports${m1sp}=${m1sp}{${exported}};`;

  return `${mnl}${export_claim}${mnl}`;

}



fs.writeFileSync('./build/data.js', scribe(should_minify, pegged_sens, pegged_reps));


console.log(`Senator count        : ${pegged_sens.length}`);
console.log(`Representative count : ${pegged_reps.length}`);




// JSON.stringify( pegged_sens, undefined, 2 );
// JSON.stringify( pegged_reps, undefined, 2 );
