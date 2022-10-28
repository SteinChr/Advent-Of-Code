import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let splitted = input.split('\r\n');
let acc = 0;
let visitedLines = [];

for (let j = 0; j < splitted.length; j++) {
    splitted = input.split('\r\n');
    if (splitted[j].split(' ')[0] != 'acc') {
        visitedLines = [];
        let splittedLine = splitted[j].split(' ');
        if (splittedLine[0] == 'nop') splitted[j] = ['jmp', splittedLine[1]].join(' ');
        if (splittedLine[0] == 'jmp') splitted[j] = ['nop', splittedLine[1]].join(' ');

        for (let i = 0; i < splitted.length; i++) {
            let splittedLine = splitted[i].split(' ');
            let number = parseInt(splittedLine[1]);

            if (visitedLines.includes(i)) {
                acc = 0;
                break;
            }
            visitedLines.push(i);

            if (splittedLine[0] == 'acc') {
                acc += number;
            } else if (splittedLine[0] == 'jmp') {
                i += number - 1;
            }
        }
        if (acc != 0) break;
    }
}
console.log(acc);
console.timeEnd('Time');