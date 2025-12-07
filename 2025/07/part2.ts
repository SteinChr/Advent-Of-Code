import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

let tachyons = new Map<string, number>();

for (let x = 0; x < input[0].length; x++) {
    if (input[0][x] == 'S') tachyons.set(getStringFromCoords(x, 0), 1);
}

tachyons.forEach((numberOfTimelines, coords) => {   
    let x = parseInt(coords.split('_')[0]);
    let y = parseInt(coords.split('_')[1]);
    
    y++;
    
    if (y < input.length) {
        if (input[y][x] == '^') {
            if (tachyons.has(getStringFromCoords(x - 1, y))) {
                tachyons.set(getStringFromCoords(x - 1, y), tachyons.get(getStringFromCoords(x - 1, y)) + numberOfTimelines);
            } else {
                tachyons.set(getStringFromCoords(x - 1, y), numberOfTimelines);
            }

            if (tachyons.has(getStringFromCoords(x + 1, y))) {
                tachyons.set(getStringFromCoords(x + 1, y), tachyons.get(getStringFromCoords(x + 1, y)) + numberOfTimelines);
            } else {
                tachyons.set(getStringFromCoords(x + 1, y), numberOfTimelines);
            }
        } else {
            if (tachyons.has(getStringFromCoords(x, y))) {
                tachyons.set(getStringFromCoords(x, y), tachyons.get(getStringFromCoords(x, y)) + numberOfTimelines);
            } else {
                tachyons.set(getStringFromCoords(x, y), numberOfTimelines);
            }
        }
    } else {
        result += numberOfTimelines;
    }
});

console.log(result);

function getStringFromCoords(x: number, y: number): string {
    return x.toString() + '_' + y.toString();
}

console.timeEnd('Time');