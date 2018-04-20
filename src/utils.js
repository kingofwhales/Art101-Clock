function degToRad(deg) {
  return deg * Math.PI / 180;
}

function radToDeg(rad) {
  return rad * 180 / Math.PI;
}

function combine(red, black) {
  if (red.length !== black.length) {
    throw "two arrays have different length";
  }
  let newArray = [];
  let counter = 0;
  for (let i of red) {
    newArray.push(i);
    newArray.push(black[counter]);
    counter++;
  }
  return newArray;
}


export {
  degToRad,
  radToDeg,
  combine
}
