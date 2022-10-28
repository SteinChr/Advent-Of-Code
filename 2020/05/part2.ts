import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let seatKeys = input.split('\r\n');
const totalRows = 128;
const totalCols = 8;
let possibleRows = [...Array(totalRows).keys()];
let possibleCols = [...Array(totalCols).keys()];
let seatID = 0;
let possibleSeatIDs = [...Array(1000).keys()];
let allSeatIDs = [];
let missingSeatID;

for (let i = 0; i < seatKeys.length; i++) {
    possibleRows = [...Array(totalRows).keys()];
    possibleCols = [...Array(totalCols).keys()];
    for (let l = 0; l < seatKeys[i].length; l++) {
        let row = 0;
        let col = 0;
        if (seatKeys[i].charAt(l) == 'F') {
            possibleRows = possibleRows.splice(0, Math.ceil(possibleRows.length / 2));
        } else if (seatKeys[i].charAt(l) == 'B') {
            possibleRows = possibleRows.splice(Math.ceil(possibleRows.length / 2), possibleRows.length);
        } else if (seatKeys[i].charAt(l) == 'L') {
            possibleCols = possibleCols.splice(0, Math.ceil(possibleCols.length / 2));
        } else if (seatKeys[i].charAt(l) == 'R') {
            possibleCols = possibleCols.splice(Math.ceil(possibleCols.length / 2), possibleCols.length);
        }
    }
    seatID = possibleRows[0] * 8 + possibleCols[0];
    allSeatIDs.push(seatID);
}

for (let g = 0; g < possibleSeatIDs.length; g++) {
    if(!allSeatIDs.includes(possibleSeatIDs[g]) && allSeatIDs.includes(possibleSeatIDs[g+1]) && allSeatIDs.includes(possibleSeatIDs[g-1])) {
        missingSeatID = possibleSeatIDs[g];
    }
}
console.log(missingSeatID);
console.timeEnd('Time');