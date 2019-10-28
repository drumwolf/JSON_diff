const getDiffScope = require('./json_diff.js')

// first test
const left  = {
  'a': 1,
  'b': 'foo',
  'c': { 'c1': true, 'c2': { 'cc': 5, 'cd': 'foo' } }, 
  'd' : { 'd1': 5, 'd2': 5 }, 
  'e': { 'e1': 0 }, 
  'g': 15,
  'h': [3, 5, 7, null],
  'i': [10, 20]
};
const right = {
  'a': 1,
  'b': { 'b1': true },
  'c': { 'c1': false, 'c2': { 'cc': 5 } },
  'd' : { 'd3': 12 },
  'e':'bar',
  'f': null,
  'i': [10, 30]
};
const getDiffFunction1 = getDiffScope();
let diffs = getDiffFunction1(left, right);
diffs.forEach( obj => console.log(obj) );

// second test
const iggypop1  = {
  'name': 'James Newell Osterberg',
  'birthplace': 'Muskegon, MI',
  'personal': { 'birthdate': 'April 21, 1947' },
  'marriages' : { 'Wendy Weissberg': '1968', 'Suchi Asano': '1984-1999' },
  'bands': ['Stooges'],
  'genre': ['proto-punk', 'punk rock', 'glam rock', 'hard rock']
};
const iggypop2 = {
  'name': 'Iggy Pop',
  'personal': { 'birthdate': '1947-04-21', 'birthplace': 'Muskegon, MI' },
  'marriages' : { 'Wendy Weissberg': '1968', 'Suchi Asano': '1984-1999', 'Nina Alu': '2008-present' },
  'bands': ['Stooges', 'Iggy and the Stooges'],
  'genre': ['proto-punk', 'punk rock', 'glam rock', 'hard rock']
};
const getDiffFunction2 = getDiffScope();
diffs = getDiffFunction2(iggypop1, iggypop2);
diffs.forEach( obj => console.log(obj) );