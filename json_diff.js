function getKeys(left, right) {
  // if left or right is a string, convert to empty object
  left = (typeof left === 'object' && left) ? left : {};
  right = (typeof right === 'object' && right) ? right : {};

  // declare vars
  const keys = [...Object.keys(left)];
  const rightKeys = Object.keys(right);
  const leftKeyMap = {};

  // map out which keys in left object exist
  for (let i = 0, key; i < keys.length; i++) {
    key = keys[i];
    if (!leftKeyMap[key]) {
      leftKeyMap[key] = true;
    }
  }

  // filter out keys which are unique to right objects
  for (let j = 0; j < rightKeys.length; j++) {
    key = rightKeys[j];
    if (!leftKeyMap[key]) {
      keys.push(key)
    }
  }

  return keys;
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
          getDiff(left[key], right[key], [...parentKeys, key]);
        }
      }

      // output addition to right key
      if (right.hasOwnProperty(key)) {
        if (typeof right[key] !== 'object') {
          const rightKey = (typeof right[key] === 'string') ? `'${right[key]}'` : right[key];
          console.log(`+${parentKeyString}${key}:${rightKey}`);
        } else {
          getDiff(left[key], right[key], [...parentKeys, key]);
        }
      }

    }    
    // end of block dealing with left and right key difference
  }
}

module.exports = getDiff;