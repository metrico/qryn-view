
export function vectorToArray(v) {
    const arr = Array(v.length);
    for (let i = 0; i < v.length; i++) {
      arr[i] = v.get(i);
    }
    return arr;
  }
  