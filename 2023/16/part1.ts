import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));

class Beam {
    x: number;
    y: number;
    dirX: number;
    dirY: number;
}

for (let i = 0; i < input.length; i++) {
    for (let l = 0; l < input[i].length; l++) {
        if (input[i][l] == '\\') input[i][l] = '+';
    }
}

let beams: Beam[] = [{ x: -1, y: 0, dirX: 1, dirY: 0 }];
let oldBeams: string[] = [];
let energizedTiles = new Set<string>();

while (beams.length != 0) {
    let currentBeam = beams.shift();
    if (currentBeam.x >= 0) energizedTiles.add(currentBeam.x.toString() + '_' + currentBeam.y.toString());
    if (currentBeam.x + currentBeam.dirX >= 0 && currentBeam.x + currentBeam.dirX < input[0].length && currentBeam.y + currentBeam.dirY >= 0 && currentBeam.y + currentBeam.dirY < input.length) {
        let newBeam: Beam = { x: -1, y: -1, dirX: 0, dirY: 0 };
        if (input[currentBeam.y + currentBeam.dirY][currentBeam.x + currentBeam.dirX] == '.') {
            currentBeam.x += currentBeam.dirX;
            currentBeam.y += currentBeam.dirY;
        } else if (input[currentBeam.y + currentBeam.dirY][currentBeam.x + currentBeam.dirX] == '/') {
            currentBeam.x += currentBeam.dirX;
            currentBeam.y += currentBeam.dirY;

            if (currentBeam.dirX == 1) {
                currentBeam.dirX = 0;
                currentBeam.dirY = -1;
            } else if (currentBeam.dirY == 1) {
                currentBeam.dirX = -1;
                currentBeam.dirY = 0;
            } else if (currentBeam.dirX == -1) {
                currentBeam.dirX = 0;
                currentBeam.dirY = 1;
            } else if (currentBeam.dirY == -1) {
                currentBeam.dirX = 1;
                currentBeam.dirY = 0;
            }
        } else if (input[currentBeam.y + currentBeam.dirY][currentBeam.x + currentBeam.dirX] == '+') {
            currentBeam.x += currentBeam.dirX;
            currentBeam.y += currentBeam.dirY;

            if (currentBeam.dirX == 1) {
                currentBeam.dirX = 0;
                currentBeam.dirY = 1;
            } else if (currentBeam.dirY == 1) {
                currentBeam.dirX = 1;
                currentBeam.dirY = 0;
            } else if (currentBeam.dirX == -1) {
                currentBeam.dirX = 0;
                currentBeam.dirY = -1;
            } else if (currentBeam.dirY == -1) {
                currentBeam.dirX = -1;
                currentBeam.dirY = 0;
            }
        } else if (input[currentBeam.y + currentBeam.dirY][currentBeam.x + currentBeam.dirX] == '-') {
            currentBeam.x += currentBeam.dirX;
            currentBeam.y += currentBeam.dirY;

            if (currentBeam.dirY == -1 || currentBeam.dirY == 1) {
                currentBeam.dirX = -1;
                currentBeam.dirY = 0;

                newBeam.x = currentBeam.x;
                newBeam.y = currentBeam.y;
                newBeam.dirX = 1;
                newBeam.dirY = 0;
            }
        } else if (input[currentBeam.y + currentBeam.dirY][currentBeam.x + currentBeam.dirX] == '|') {
            currentBeam.x += currentBeam.dirX;
            currentBeam.y += currentBeam.dirY;

            if (currentBeam.dirX == -1 || currentBeam.dirX == 1) {
                currentBeam.dirX = 0;
                currentBeam.dirY = -1;

                newBeam.x = currentBeam.x;
                newBeam.y = currentBeam.y;
                newBeam.dirX = 0;
                newBeam.dirY = 1;
            }
        }

        let currentBeamString = currentBeam.x.toString() + '_' + currentBeam.y.toString() + '_' + currentBeam.dirX.toString() + '_' + currentBeam.dirY.toString();
        let newBeamString = newBeam.x.toString() + '_' + newBeam.y.toString() + '_' + newBeam.dirX.toString() + '_' + newBeam.dirY.toString();

        if (!oldBeams.includes(currentBeamString)) {
            beams.push(currentBeam);
            oldBeams.push(currentBeamString);
        }
        if ((newBeam.dirX != 0 || newBeam.dirY != 0) && !oldBeams.includes(newBeamString)) {
            beams.push(newBeam);
            oldBeams.push(newBeamString);
        }
    }
}

console.log(energizedTiles.size);
console.timeEnd('Time');