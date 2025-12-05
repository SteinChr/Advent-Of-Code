import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n');
let result = 0;

let ranges = input[0].split('\r\n').map(x => x.split('-').map(y => parseInt(y)));

for (let c = 0; c < ranges.length; c++) {
    let overlapFound: boolean = false;

    for (let i = c + 1; i < ranges.length && !overlapFound; i++) {
        if (ranges[c][0] <= ranges[i][0] && ranges[c][1] >= ranges[i][0] && ranges[c][1] <= ranges[i][1]) {
            ranges[i][0] = ranges[c][0];
            overlapFound = true;
        } else if (ranges[c][0] >= ranges[i][0] && ranges[c][0] <= ranges[i][1] && ranges[c][1] >= ranges[i][1]) {
            ranges[i][1] = ranges[c][1];
            overlapFound = true;
        } else if (ranges[c][0] <= ranges[i][0] && ranges[c][1] >= ranges[i][1]) {
            ranges[i][0] = ranges[c][0];
            ranges[i][1] = ranges[c][1];
            overlapFound = true;
        } else if (ranges[c][0] >= ranges[i][0] && ranges[c][0] <= ranges[i][1] && ranges[c][1] >= ranges[i][0] && ranges[c][1] <= ranges[i][1]) {
            overlapFound = true;
        }
    }

    if (!overlapFound) result += ranges[c][1] - ranges[c][0] + 1;
}

console.log(result);
console.timeEnd('Time');