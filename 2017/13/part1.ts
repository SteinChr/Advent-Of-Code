import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(': ').map(y => parseInt(y)));
let result = 0;

class Scanner {
    range: number;
    dir: number;
    pos: number;
}

const maxDepth = input[input.length - 1][0];

let scanners = new Map<number, Scanner>();

for (let i = 0; i < input.length; i++) {
    scanners.set(input[i][0], { range: input[i][1], dir: 1, pos: 1 }); // uppmost position is 1 not 0!
}

for (let ps = 0; ps <= maxDepth; ps++) {
    if (scanners.has(ps) && scanners.get(ps).pos == 1) result += ps * scanners.get(ps).range;

    for (let s = 0; s <= maxDepth; s++) {
        if (scanners.has(s)) {
            let currentScanner = scanners.get(s);
            let newDir = currentScanner.pos + currentScanner.dir == currentScanner.range ? -1 : (currentScanner.pos + currentScanner.dir == 1 ? 1 : currentScanner.dir);
            scanners.set(s, { range: currentScanner.range, dir: newDir, pos: currentScanner.pos + currentScanner.dir });
        }
    }
}

console.log(result);
console.timeEnd('Time');