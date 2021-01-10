
const should_minify = true;



const fs   = require('fs'),
      reps = `${fs.readFileSync('./src/representatives.html')}`,
      sens = `${fs.readFileSync('./src/senators.html')}`;

const peg_reps = require('../build/peg_representatives.js'),
      peg_sens = require('../build/peg_senators.js');

const pegged_reps = peg_reps.parse(reps).filter(r => r.kind !== 'break'),
      pegged_sens = peg_sens.parse(sens).filter(s => s.kind !== 'break');



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

  const senator_claim        = `const pegged_sens${m10sp}=${m1sp}${ps};`,
        representative_claim = `const pegged_reps${m1sp}=${m1sp}${pr};`;

  return `${mnl}${senator_claim}${mnl}${mnl}${representative_claim}${mnl}${mnl}`;

}



fs.writeFileSync('./build/data.js', scribe(should_minify, pegged_sens, pegged_reps));


console.log(`Senator count        : ${pegged_sens.length}`);
console.log(`Representative count : ${pegged_reps.length}`);


// JSON.stringify( pegged_sens, undefined, 2 );
// JSON.stringify( pegged_reps, undefined, 2 );
