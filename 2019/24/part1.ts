import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Pos {
    x: number;
    y: number;
}

let allLayouts: string[] = [input.map(x => x.join('')).join('')];

while (true) {
    let changeState: Pos[] = [];

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            let adjacent: number = 0;

            if (y > 0 && input[y - 1][x] == '#') adjacent++;
            if (x < input[y].length - 1 && input[y][x + 1] == '#') adjacent++;
            if (y < input.length - 1 && input[y + 1][x] == '#') adjacent++;
            if (x > 0 && input[y][x - 1] == '#') adjacent++;

            if ((input[y][x] == '.' && (adjacent == 1 || adjacent == 2)) || (input[y][x] == '#' && adjacent != 1)) changeState.push({ x: x, y: y });
        }
    }

    for (let i = 0; i < changeState.length; i++) {
        if (input[changeState[i].y][changeState[i].x] == '#') {
            input[changeState[i].y][changeState[i].x] = '.';
        } else {
            input[changeState[i].y][changeState[i].x] = '#';
        }
    }

    let gridAsString = input.map(x => x.join('')).join('');

    if (allLayouts.includes(gridAsString)) {
        break;
    } else {
        allLayouts.push(gridAsString);
    }
}

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == '#') result += Math.pow(2, x + y * input[y].length);
    }
}

console.log(result);
console.timeEnd('Time');