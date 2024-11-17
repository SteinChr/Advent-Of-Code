import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));

class Position {
    x: number;
    y: number;
}

let possiblePositions: Position[] = [];
let posChanges: Position[] = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 } ];

outerLoop: for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == 'S') {
            possiblePositions.push({ x: x, y: y });
            input[y][x] = '.';
            break outerLoop;
        }
    }
}

for (let s = 0; s < 64; s++) {
    let newPositions = new Set<string>();
    while (possiblePositions.length != 0) {
        let currentPosition = possiblePositions.shift();
        for (let i = 0; i < posChanges.length; i++) {
            if (currentPosition.y + posChanges[i].y >= 0 && currentPosition.y + posChanges[i].y < input.length && currentPosition.x + posChanges[i].x >= 0 && currentPosition.x + posChanges[i].x < input[0].length && input[currentPosition.y + posChanges[i].y][currentPosition.x + posChanges[i].x] == '.') {
                newPositions.add(getStringFromPosition(currentPosition.x + posChanges[i].x, currentPosition.y + posChanges[i].y));
            }
        }
    }

    newPositions.forEach(value => {
        let position: number[] = value.split('_').map(x => parseInt(x));
        possiblePositions.push({ x: position[0], y: position[1] });
    });
}

console.log(possiblePositions.length);

function getStringFromPosition(x: number, y: number): string {
    return x.toString() + '_' + y.toString();
}

console.timeEnd('Time');