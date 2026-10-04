import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('');
let result = 0;

class Pos {
    x: number;
    y: number;
}

let grid: number[][] = [];

for (let x = 0; x <= 127; x++) {
    grid.push([]);

    let newListOfLengths: number[] = [];

    for (let i = 0; i < input.length; i++) {
        newListOfLengths.push(input[i].charCodeAt(0));
    }

    newListOfLengths.push(('-').charCodeAt(0));

    let xString = x.toString();
    newListOfLengths.push(xString.charCodeAt(0));
    if (x >= 10) newListOfLengths.push(xString.charCodeAt(1));
    if (x >= 100) newListOfLengths.push(xString.charCodeAt(2));

    newListOfLengths.push(...[17, 31, 73, 47, 23]);

    let currentPos = 0;
    let skipSize = 0;

    let list: number[] = [];
    const listSize = 256;

    for (let i = 0; i < listSize * 2; i++) {
        list.push(i % listSize);
    }

    for (let r = 0; r < 64; r++) {
        for (let i = 0; i < newListOfLengths.length; i++) {
            list = [...list.slice(0, currentPos), ...list.slice(currentPos, currentPos + newListOfLengths[i]).reverse(), ...list.slice(currentPos + newListOfLengths[i])];

            for (let l = 0; l < listSize; l++) {
                if (l < currentPos) list[l] = list[l + listSize];
                if (l >= currentPos) list[l + listSize] = list[l];
            }

            currentPos += newListOfLengths[i] + skipSize;
            currentPos %= listSize;

            skipSize++;
        }
    }

    let denseHash: number[] = [];

    for (let i = 0; i < list.length / 2; i += 16) {
        denseHash.push(list[i] ^ list[i + 1] ^ list[i + 2] ^ list[i + 3] ^ list[i + 4] ^ list[i + 5] ^ list[i + 6] ^ list[i + 7] ^ list[i + 8] ^ list[i + 9] ^ list[i + 10] ^ list[i + 11] ^ list[i + 12] ^ list[i + 13] ^ list[i + 14] ^ list[i + 15]);
    }

    let finalHash = '';

    for (let i = 0; i < denseHash.length; i++) {
        finalHash += denseHash[i].toString(16).padStart(2, '0');
    }

    let binary = '';

    for (let i = 0; i < finalHash.length; i++) {
        binary += parseInt(finalHash[i], 16).toString(2).padStart(4, '0');
    }

    grid[x] = binary.split('').map(x => parseInt(x));
}

let dirs: Pos[] = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] == 1) {
            result++;
            grid[y][x] = 2;

            let toCheck: Pos[] = [{ x: x, y: y }];

            while (toCheck.length != 0) {
                let currentToCheck = toCheck.shift();

                for (let dir of dirs) {
                    if (currentToCheck.x + dir.x < grid[0].length && currentToCheck.y + dir.y < grid.length && currentToCheck.x + dir.x >= 0 && currentToCheck.y + dir.y >= 0 && grid[currentToCheck.y + dir.y][currentToCheck.x + dir.x] == 1) {
                        grid[currentToCheck.y + dir.y][currentToCheck.x + dir.x] = 2;
                        toCheck.push({ x: currentToCheck.x + dir.x, y: currentToCheck.y + dir.y });
                    }
                }
            }
        }
    }
}

console.log(result);
console.timeEnd('Time');