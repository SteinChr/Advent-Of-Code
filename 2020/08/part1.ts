import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let splitted = input.split('\r\n');
let acc = 0;
let visitedLines = [];

for (let i = 0; i < splitted.length; i++) {
    let splittedLine = splitted[i].split(' ');
    let number = parseInt(splittedLine[1]);

    if (visitedLines.includes(i)) break;
    visitedLines.push(i);

    if (splittedLine[0] == 'acc') {
        acc += number;
    } else if (splittedLine[0] == 'jmp') {
        i += number - 1;
    }
}
console.log(acc);
console.timeEnd('Time');