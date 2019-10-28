/***** helper function: filter out all unique keys in "left" and "right" objects *****/
function getKeys(left, right) {
  // if left or right is a string, convert to empty object
  left = (typeof left !== 'string') ? left : {};
  right = (typeof right !== 'string') ? right : {};

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
  for (let j = 0, key; j < rightKeys.length; j++) {
    key = rightKeys[j];
    if (!leftKeyMap[key]) {
      keys.push(key)
    }
  }

  return keys;
}

/***** helper function: determine if an argument 'obj' is an object *****/
function isObject(obj) {
  return (obj && typeof obj === 'object'); // note: 'typeof obj' returns true if obj === null
}

/***** module to be exported ***/
function getDiffScope() {
  const cachedArgs = {};  // since 'getDiff' is a recursive function that calls certain left/right argument pairs multiple times, let's cache those argument pairs
  const diffs = [];       // array containing all of the 'diff' entries

  /* recursive closure function */
  const getDiff = function(left = {}, right = {}, parentKeys = []) {
    // stringify JSON objects so they can be stored as keys in 'cachedArgs'
    const l_str = JSON.stringify(left);
    const r_str = JSON.stringify(right);

    // execute only if "cachedArgs[l_str][r_str]" does not already exist
    if (!cachedArgs[l_str] || !cachedArgs[l_str][r_str]) {

      /* get all keys in left and right objects */
      const allKeys = getKeys(left, right);
      const parentKeyString = (parentKeys.length) ? parentKeys.join('.') + "." : "";

      /* loop through all left and right keys */
      for (let i = 0; i < allKeys.length; i++) {
        const key = allKeys[i];

        // when left key and right key are different, start comparison
        if (left[key] !== right[key]) {
          const lk_str = JSON.stringify(left[key]);
          const rk_str = JSON.stringify(right[key]);

          // output subtraction from left key
          if (left.hasOwnProperty(key)) {
            if ( isObject(left[key]) ) {
              // invoke "getDiff" recursively
              getDiff(left[key], right[key], [...parentKeys, key]);
              // cache left/right arg pairs
              cachedArgs[lk_str] = cachedArgs[lk_str] || {};
              cachedArgs[lk_str][rk_str] = true;
            } else {
              const leftKey = (typeof left[key] === 'string') ? `'${left[key]}'` : left[key];
              diffs.push(`-${parentKeyString}${key}:${leftKey}`);
            }
          }
          // output addition to right key
          if (right.hasOwnProperty(key)) {
            if ( isObject(right[key]) ) {
              // invoke "getDiff" recursively
              getDiff(left[key], right[key], [...parentKeys, key]);
              // cache left/right arg pairs
              cachedArgs[lk_str] = cachedArgs[lk_str] || {};
              cachedArgs[lk_str][rk_str] = true;
            } else {
              const rightKey = (typeof right[key] === 'string') ? `'${right[key]}'` : right[key];
              diffs.push(`+${parentKeyString}${key}:${rightKey}`);
            } 
          }

        }    
        // end of block dealing with left and right key difference
      }
      // end of primary code (which executes only if left/right argument pair is not cached)
    }
    // recursive function returns "Set" object containing all unique diffs
    return diffs;
  }
  /* return recursive closure function */
  return getDiff;
}

module.exports = getDiffScope;