import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

let tachyons: { x: number, y: number }[] = [];

for (let x = 0; x < input[0].length; x++) {
    if (input[0][x] == 'S') tachyons.push({ x: x, y: 0 });
}

let done = new Set<string>();

while (tachyons.length != 0) {
    let currentTachyon = tachyons.shift();

    currentTachyon.y++;

    if (currentTachyon.y < input.length) {
        if (input[currentTachyon.y][currentTachyon.x] == '^') {
            if (!done.has(getStringFromCoords(currentTachyon.x - 1, currentTachyon.y))) tachyons.push({ x: currentTachyon.x - 1, y: currentTachyon.y });
            if (!done.has(getStringFromCoords(currentTachyon.x + 1, currentTachyon.y))) tachyons.push({ x: currentTachyon.x + 1, y: currentTachyon.y });

            done.add(getStringFromCoords(currentTachyon.x - 1, currentTachyon.y));
            done.add(getStringFromCoords(currentTachyon.x + 1, currentTachyon.y));

            result++;
        } else {
            if (!done.has(getStringFromCoords(currentTachyon.x, currentTachyon.y))) tachyons.push({ x: currentTachyon.x, y: currentTachyon.y });
            
            done.add(getStringFromCoords(currentTachyon.x, currentTachyon.y));
        }
    }
}

console.log(result);

function getStringFromCoords(x: number, y: number): string {
    return x.toString() + '_' + y.toString();
}

console.timeEnd('Time');