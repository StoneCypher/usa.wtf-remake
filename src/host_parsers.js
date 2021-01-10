
const fs   = require('fs'),
      reps = `${fs.readFileSync('./src/representatives.html')}`,
      sens = `${fs.readFileSync('./src/senators.html')}`;

const peg_reps = require('../build/peg_representatives.js'),
      peg_sens = require('../build/peg_senators.js');

console.log( peg_sens.parse(sens) );
