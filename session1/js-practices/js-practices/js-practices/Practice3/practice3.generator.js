/*
 * USAGE: node practice3.generator.js <output_array_length> <output_file>
 */
'use strict';

require('util');
const fs = require('fs');
const path = require('path');

const LENGTH_TO_GENERATE = parseInt(process.argv[2] || 300);
const OUTPUT_FILE_PATH = path.join(__dirname, process.argv[3] || 'practice3-test-data.json');

const MIN_NUMBER = 0;
const MAX_NUMBER = 500;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const tests = Array.from({length : LENGTH_TO_GENERATE}).map(item => randomInt(MIN_NUMBER, MAX_NUMBER));

fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(tests));