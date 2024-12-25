import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n').map(y => y.split('')));
let result = 0;

let keys: number[][] = [];
let locks: number[][] = [];

for (let i = 0; i < input.length; i++) {
    let pinHeights: number[] = [0, 0, 0, 0, 0];

    if (input[i][0].join('') == '#####') {
        for (let y = 1; y < input[i].length; y++) {
            for (let x = 0; x < input[i][y].length; x++) {
                if (input[i][y][x] == '#') pinHeights[x]++;
            }
        }

        locks.push(pinHeights);
    } else {
        for (let y = input[i].length - 2; y >= 0; y--) {
            for (let x = 0; x < input[i][y].length; x++) {
                if (input[i][y][x] == '#') pinHeights[x]++;
            }
        }

        keys.push(pinHeights);
    }
}

for (let lock of locks) {
    for (let key of keys) {
        let possible = true;

        for (let x = 0; x < key.length && possible; x++) {
            if (lock[x] + key[x] >= 6) possible = false;
        }

        if (possible) result++;
    }
}

console.log(result);
console.timeEnd('Time');