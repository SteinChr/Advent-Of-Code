import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Position {
    x: number;
    y: number;
}

let antennas = new Map<string, Position[]>();

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] != '.') {
            if (antennas.has(input[y][x])) {
                let currentAntennas = antennas.get(input[y][x]);
                antennas.set(input[y][x], [...currentAntennas, { x: x, y: y }]);
            } else {
                antennas.set(input[y][x], [{ x: x, y: y }]);
            }
        }
    }
}

for (let [key, currentAntennas] of antennas) {
    for (let i = 0; i < currentAntennas.length; i++) {
        for (let l = i + 1; l < currentAntennas.length; l++) {
            let antinode: Position = { x: currentAntennas[i].x - (currentAntennas[l].x - currentAntennas[i].x), y: currentAntennas[i].y - (currentAntennas[l].y - currentAntennas[i].y) };
            if (antinode.y >= 0 && antinode.y < input.length && antinode.x >= 0 && antinode.x < input[0].length) input[antinode.y][antinode.x] = '#';

            antinode = { x: currentAntennas[l].x + (currentAntennas[l].x - currentAntennas[i].x), y: currentAntennas[l].y + (currentAntennas[l].y - currentAntennas[i].y) };
            if (antinode.y >= 0 && antinode.y < input.length && antinode.x >= 0 && antinode.x < input[0].length) input[antinode.y][antinode.x] = '#';
        }
    }
}

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == '#') result++;
    }
}

console.log(result);
console.timeEnd('Time');