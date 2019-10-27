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

function getDiff(left = {}, right = {}, parentKeys = []) {
  
  /* get all keys in left and right objects */
  const allKeys = getKeys(left, right);
  const parentKeyString = (parentKeys.length) ? parentKeys.join('.') + "." : "";

  /* loop through all left and right keys */
  for (let i = 0; i < allKeys.length; i++) {
    const key = allKeys[i];

    // when left key and right key are different, start comparison
    if (left[key] !== right[key]) {

      // output subtraction from left key
      if (left.hasOwnProperty(key)) {
        if (typeof left[key] !== 'object') {
          const leftKey = (typeof left[key] === 'string') ? `'${left[key]}'` : left[key];
          console.log(`-${parentKeyString}${key}:${leftKey}`);
        } else {
          getDiff(left[key], {}, [...parentKeys, key]);
        }
      }

      // output addition to right key
      if (right.hasOwnProperty(key)) {
        if (typeof right[key] !== 'object') {
          const rightKey = (typeof right[key] === 'string') ? `'${right[key]}'` : right[key];
          console.log(`+${parentKeyString}${key}:${rightKey}`);
        } else {
          getDiff({}, right[key], [...parentKeys, key]);
        }
      }

    }    
    // end of block dealing with left and right key difference
  }
}

module.exports = getDiff;