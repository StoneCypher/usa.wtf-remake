
const fs   = require('fs'),
      reps = `${fs.readFileSync('./src/representatives.html')}`,
      sens = `${fs.readFileSync('./src/senators.html')}`;

const peg_reps = require('../build/peg_representatives.js'),
      peg_sens = require('../build/peg_senators.js');

const pegged_reps = peg_reps.parse(reps).filter(r => r.kind !== 'break'),
      pegged_sens = peg_sens.parse(sens).filter(s => s.kind !== 'break');

console.log( pegged_reps );

console.log('\n\n');

console.log(JSON.stringify( pegged_sens, undefined, 2 ) );
