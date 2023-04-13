class Helper {
  constructor() {}

  //pass a value between 0 and 1, and get a mapped value back between low and high args
  map1(value, low, high) {
    const newval = value * (high - low) + high;
    return newval;
  }

  //map function logic from processing <3
  map(n, start1, stop1, start2, stop2) {
    const newval =
      ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    return newval;
  }

  //wrapped array index
  wrapArrayIndex(arr, index) {
    return arr[((index % arr.length) + arr.length) % arr.length];
  }
}

export { Helper };
