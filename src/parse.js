import {
  degToRad
} from './utils.js'

function parseData (currentNumber, originalData) {
  let data
  data = extractNumberAllData(currentNumber, originalData);
  data = flattenData(data);
  data = convertToRad(data);
  data = roundToFourDecimals(data);
  return data
}

// unit cheked R-3
function extractNumberAllData(array, data) {
  return [
    data[array[0]].all,
    data[array[1]].all,
    data[array[2]].all,
    data[array[3]].all
  ];
}

// unit cheked R-3
function flattenData(data) {
  return data.reduce((accu, value) => {
    return accu.concat(value)
  }, [])
}

// unit cheked R-3
function convertToRad(data) {
  return data.map(element => {
    return degToRad(element);
  });
}
// unit cheked R-3
function roundToFourDecimals(data) {
  return data.map(element => {
    return Math.round(element * 10000) / 10000;
  });
}

export {
  parseData
}
