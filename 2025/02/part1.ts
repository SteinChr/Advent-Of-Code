import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(/,|-/).map(x => parseInt(x));
let result = 0;

let idRanges: number[][] = [];

for (let i = 0; i < input.length; i += 2) {
    idRanges.push([input[i], input[i + 1]]);
}

for (let i = 0; i < idRanges.length; i++) {
    for (let n = idRanges[i][0]; n <= idRanges[i][1]; n++) {
        let lengthOfNum = n.toString().length;
        let numAsString = n.toString();

        let p1 = numAsString.slice(0, lengthOfNum / 2);
        let p2 = numAsString.slice(lengthOfNum / 2);
        
        if (p1 == p2) {
            result += n;
        }
    }
}

console.log(result);
console.timeEnd('Time');