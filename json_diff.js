const left  = { 'a': 1, 'b': 2, 'c': 3 };
const right = { 'a': 1, 'b': 2, 'c': { 'c1': 1 } };
getDiff(left, right);

function getKeys(left, right) {
  const keys = [...Object.keys(left), ...Object.keys(right)];
  const allKeys = [];
  const hash = {};
  for (let i = 0; i < keys.length; i++) {
    const char = keys[i];
    if (!hash[char]) {
      allKeys.push(char);
    }
    hash[char] = true;
  }
  return allKeys;
}


function getDiff(left, right, parentKeys = []) {
  
  /* get all keys in left and right objects */
  const allKeys = getKeys(left, right);
  const parentKeyString = (parentKeys.length) ? parentKeys.join('.') + "." : "";

  /* loop through all left and right keys */
  for (let i = 0; i < allKeys.length; i++) {
    const key = allKeys[i];

    // when left key and right key are different, start comparison
    if (left[key] !== right[key]) {

      // output subtraction from left key
      if (left[key]) {
        if (typeof left[key] !== 'object') {
          console.log(`-${parentKeyString}${key}:${left[key]}`);
        } else {
          getDiff(left[key], right[key], [key]);
        }
      }

      // output addition to right key
      if (right[key]) {
        if (typeof right[key] !== 'object') {
           console.log(`+${parentKeyString}${key}:${right[key]}`);
        } else {
          getDiff(left[key], right[key], [key]);
        }
      }

    }    
    // end of block dealing with left and right key difference
  }
}
