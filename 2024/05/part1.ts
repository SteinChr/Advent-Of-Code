import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n'));
let result = 0;

let rules: number[][] = input[0].map(x => x.split('|').map(y => parseInt(y)));
let pages: number[][] = input[1].map(x => x.split(',').map(y => parseInt(y)));

for (let u = 0; u < pages.length; u++) {
    let correctOrder: boolean = true;

    for (let r = 0; r < rules.length && correctOrder; r++) {
        if (pages[u].includes(rules[r][0]) && pages[u].includes(rules[r][1])) {
            if (pages[u].indexOf(rules[r][0]) > pages[u].indexOf(rules[r][1])) {
                correctOrder = false;
            }
        }
    }

    if (correctOrder) result += pages[u][Math.floor(pages[u].length / 2)];
}

console.log(result);
console.timeEnd('Time');