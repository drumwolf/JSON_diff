const getDiff = require('./json_diff.js')

const left  = {
  'a': 1, 
  'b': 'fooe', 
  'c': { 'c1': true, 'c2': { 'cc': 5, 'cd': 'foo' } }, 
  'd' : { 'd1': 5, 'd2': 5 }, 
  'e': { 'e1': 0 }, 
  'g': 15,
  'h': [3, 5, 7],
  'i': [10, 20]
};
const right = {
  'a': 1,
  'b': { 'b1': true },
  'c': { 'c1': false, 'c2': { 'cc': 5 } },
  'd' : { 'd3': 12 },
  'e':'bar',
  'f': 15,
  'i': [30, 20]
};
getDiff(left, right);