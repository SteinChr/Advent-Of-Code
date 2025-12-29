import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\s\(#|\)|\s/).filter(y => y != ''));
let result = 0;

class Position {
    x: number;
    y: number;
}

class Instruction {
    direction: string;
    distance: number;
    x: number;
    y: number;
}

let newInstructions: Instruction[] = [];

const gridSize = 1000000;

for (let i = 0; i < input.length; i++) {
    let newInstruction: Instruction = { direction: '', distance: 0, x: 0, y: 0 };
    let hex: string = input[i][2].slice(0, 5);
    let newDirection: string = input[i][2].slice(5);
    
    newInstruction.distance = parseInt(hex, 16);

    if (newDirection == '0') newInstruction.direction = 'R';
    if (newDirection == '1') newInstruction.direction = 'D';
    if (newDirection == '2') newInstruction.direction = 'L';
    if (newDirection == '3') newInstruction.direction = 'U';

    newInstructions.push(newInstruction);
}

let currentPosition: Position = { x: gridSize, y: gridSize };

for (let i = 0; i < newInstructions.length; i++) {
    if (newInstructions[i].direction == 'R') currentPosition.x += newInstructions[i].distance;
    if (newInstructions[i].direction == 'L') currentPosition.x -= newInstructions[i].distance;
    if (newInstructions[i].direction == 'D') currentPosition.y += newInstructions[i].distance;
    if (newInstructions[i].direction == 'U') currentPosition.y -= newInstructions[i].distance;

    newInstructions[i].x = currentPosition.x;
    newInstructions[i].y = currentPosition.y;
}

newInstructions.push(newInstructions[0]);
newInstructions.push(newInstructions[1]);

for (let i = 1; i < newInstructions.length - 1; i++) {
    result += newInstructions[i].distance;
    result += newInstructions[i].x * (newInstructions[i + 1].y - newInstructions[i - 1].y);
}

result = result / 2 + 1;
console.log(result);
console.timeEnd('Time');