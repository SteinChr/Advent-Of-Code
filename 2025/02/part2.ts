import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(/,|-/).map(x => parseInt(x));
let result = 0;

let idRanges: number[][] = [];

for (let i = 0; i < input.length; i += 2) {
    idRanges.push([input[i], input[i + 1]]);
}

for (let i = 0; i < idRanges.length; i++) {
    ranges: for (let n = idRanges[i][0]; n <= idRanges[i][1]; n++) {
        let lengthOfNum = n.toString().length;
        let numAsString = n.toString();

        for (let groupSize = 1; groupSize <= 6; groupSize++) {
            let repetition = true;
            if (lengthOfNum < groupSize * 2) repetition = false;

            for (let x = groupSize; x < lengthOfNum && repetition; x += groupSize) {
                if (numAsString[x] != numAsString[0]) repetition = false;
                if (groupSize >= 2 && numAsString[x + 1] != numAsString[1]) repetition = false;
                if (groupSize >= 3 && numAsString[x + 2] != numAsString[2]) repetition = false;
                if (groupSize >= 4 && numAsString[x + 3] != numAsString[3]) repetition = false;
                if (groupSize >= 5 && numAsString[x + 4] != numAsString[4]) repetition = false;
                if (groupSize >= 6 && numAsString[x + 5] != numAsString[5]) repetition = false;
            }

            if (repetition) {
                result += n;
                continue ranges;
            }
        }
    }
}

console.log(result);
console.timeEnd('Time');