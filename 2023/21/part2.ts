import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Position {
    x: number;
    y: number;
}

class Calculation {
    steps: number;
    positions: number;
    difference: number;
    diffOfDiff: number;
}

let possiblePositions: Position[] = [];
let posChanges: Position[] = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }];
let calculations: Calculation[] = [{ steps: 0, positions: 1, difference: 1, diffOfDiff: 1 }];

const gridSize = input.length;
const extension = 20; // increase for test input

const necessarySteps = 26501365;

let even = 0;
let odd = 0;

outerLoop: for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == 'S') {
            possiblePositions.push({ x: x + gridSize * (extension / 2), y: y + gridSize * (extension / 2) });
            input[y][x] = '.';
            break outerLoop;
        }
    }
}

for (let y = 0; y < gridSize; y++) {
    let old = input[y].slice();
    for (let i = 0; i < extension; i++) {
        input[y].push(...old);
    }
}

for (let i = 0; i < extension; i++) {
    for (let y = 0; y < gridSize; y++) {
        let old = input[y].slice();
        input.push(old);
    }
}

outerLoop: for (let s = 0; s < necessarySteps; s++) {
    let roundType: string = (s % 2).toString();
    let newPositions = new Set<string>();

    while (possiblePositions.length != 0) {
        let currentPosition = possiblePositions.shift();
        for (let i = 0; i < posChanges.length; i++) {
            if (currentPosition.y + posChanges[i].y >= 0 && currentPosition.y + posChanges[i].y < input.length && currentPosition.x + posChanges[i].x >= 0 && currentPosition.x + posChanges[i].x < input[0].length) {
                if (input[currentPosition.y + posChanges[i].y][currentPosition.x + posChanges[i].x] == '.') {
                    newPositions.add(getStringFromPosition(currentPosition.x + posChanges[i].x, currentPosition.y + posChanges[i].y));
                }
            }
        }
    }

    newPositions.forEach(value => {
        let position: number[] = value.split('_').map(x => parseInt(x));
        possiblePositions.push({ x: position[0], y: position[1] });
        input[position[1]][position[0]] = roundType;
        if (roundType == '0') odd++;
        if (roundType == '1') even++;
    });

    let steps = s + 1;

    if (necessarySteps > 5000 && (steps - Math.floor(gridSize / 2)) % (gridSize * 2) == 0) {
        let positions = steps % 2 == 0 ? even : odd;

        if (steps > gridSize * 2) {
            let difference = positions - calculations[calculations.length - 1].positions;
            let diffOfDiff = difference - calculations[calculations.length - 1].difference;
            calculations.push({ steps: steps, positions: positions, difference: difference, diffOfDiff: diffOfDiff });

            if (calculations[calculations.length - 1].diffOfDiff == calculations[calculations.length - 2].diffOfDiff) {
                result = calculations[calculations.length - 1].positions + ((necessarySteps - Math.floor(gridSize / 2)) / (gridSize * 2) - (steps - Math.floor(gridSize / 2)) / (gridSize * 2)) * calculations[calculations.length - 1].difference + ((necessarySteps - Math.floor(gridSize / 2)) / (gridSize * 2) - (steps - Math.floor(gridSize / 2)) / (gridSize * 2)) * (((necessarySteps - Math.floor(gridSize / 2)) / (gridSize * 2) - (steps - Math.floor(gridSize / 2)) / (gridSize * 2)) + 1) / 2 * calculations[calculations.length - 1].diffOfDiff;
                break outerLoop;
            }
        }
    }
}

if (result == 0) result = necessarySteps % 2 == 0 ? even : odd; // only relevant for test input

console.log(result);

function getStringFromPosition(x: number, y: number): string {
    return x.toString() + '_' + y.toString();
}

console.timeEnd('Time');