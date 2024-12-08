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
            input[currentAntennas[i].y][currentAntennas[i].x] = '#';
            input[currentAntennas[l].y][currentAntennas[l].x] = '#';
            
            let newPosition: Position = { x: currentAntennas[i].x, y: currentAntennas[i].y };

            while (true) {
                newPosition.x -= (currentAntennas[l].x - currentAntennas[i].x);
                newPosition.y -= (currentAntennas[l].y - currentAntennas[i].y);

                if (newPosition.y >= 0 && newPosition.y < input.length && newPosition.x >= 0 && newPosition.x < input[0].length) {
                    input[newPosition.y][newPosition.x] = '#';
                } else {
                    break;
                }
            }


            newPosition = { x: currentAntennas[l].x, y: currentAntennas[l].y };

            while (true) {
                newPosition.x += (currentAntennas[l].x - currentAntennas[i].x);
                newPosition.y += (currentAntennas[l].y - currentAntennas[i].y);

                if (newPosition.y >= 0 && newPosition.y < input.length && newPosition.x >= 0 && newPosition.x < input[0].length) {
                    input[newPosition.y][newPosition.x] = '#';
                } else {
                    break;
                }
            }
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