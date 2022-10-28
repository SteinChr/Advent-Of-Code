import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.toString());
let uniqueSignalPatterns = input.map(x => x.split(' | ')[0]).map(x => x.split(' '));
let outputValues = input.map(x => x.split(' | ')[1]).map(x => x.split(' '));
let result = 0;
for (let i = 0; i < uniqueSignalPatterns.length; i++) {
    let output = '';
    let numbersForPatterns = new Array(10);
    numbersForPatterns[1] = uniqueSignalPatterns[i].find(x => x.length == 2);
    numbersForPatterns[4] = uniqueSignalPatterns[i].find(x => x.length == 4);
    numbersForPatterns[7] = uniqueSignalPatterns[i].find(x => x.length == 3);
    numbersForPatterns[8] = uniqueSignalPatterns[i].find(x => x.length == 7);
    numbersForPatterns[9] = uniqueSignalPatterns[i].find(x => x.length == 6 && compareStrings(x, numbersForPatterns[4]) == 4);
    numbersForPatterns[0] = uniqueSignalPatterns[i].find(x => x.length == 6 && compareStrings(x, numbersForPatterns[7]) == 3 && x != numbersForPatterns[9]);
    numbersForPatterns[6] = uniqueSignalPatterns[i].find(x => x.length == 6 && x != numbersForPatterns[0] && x != numbersForPatterns[9]);
    numbersForPatterns[5] = uniqueSignalPatterns[i].find(x => x.length == 5 && compareStrings(x, numbersForPatterns[6]) == 5);
    numbersForPatterns[3] = uniqueSignalPatterns[i].find(x => x.length == 5 && compareStrings(x, numbersForPatterns[4]) == 3 && x != numbersForPatterns[5]);
    numbersForPatterns[2] = uniqueSignalPatterns[i].find(x => x.length == 5 && x != numbersForPatterns[3] && x != numbersForPatterns[5]);

    for (let l = 0; l < outputValues[i].length; l++) {
        for (let j = 0; j < numbersForPatterns.length; j++) {
            if (compareStrings(outputValues[i][l], numbersForPatterns[j]) == outputValues[i][l].length && outputValues[i][l].length == numbersForPatterns[j].length) {
                output += j.toString();
            }
        }
    }
    result += parseInt(output);
}
console.log(result);

function compareStrings(string1, string2) {
    let count = 0;
    for (let l = 0; l < string1.length; l++) {
        if (string2.includes(string1[l])) count++;
    }
    return count;
}

console.timeEnd('Time');