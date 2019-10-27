const left = { 'a':1, 'b':2, 'c':3 };
const right = { 'a':1, 'b':2, 'c': { 'c1': 1} };

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


function getDiff(left, right, parentKey) {
  
  const allKeys = getKeys(left, right);

  for (let i = 0; i < allKeys.length; i++) {
    const key = allKeys[i];
    if (left[key] !== right[key]) {
      if (left[key]) {
        console.log(`-${parentKey}.${key}:${left[key]}`);
      }
      if (right[key]) {

        if (typeof right[key] !== 'object') {
           console.log(`+${parentKey}.${key}:${right[key]}`);
        } else {
          getDiff(left[key], right[key], key);
        }
      }
    }    
  }
}
