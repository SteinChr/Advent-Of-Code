import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n'));
let result: string = '';

class Movement {
    quantity: number;
    from: number;
    to: number;
}

const numberOfStacks = parseInt(input[0][input[0].length - 1].replace(/\s/g, '').slice(-1));

let stacks: string[][] = new Array(numberOfStacks);
for (let i = 0; i < stacks.length; i++) {
    stacks[i] = [];
}

for (let i = input[0].length - 2; i >= 0; i--) {
    let currentCrates = input[0][i].split(/\s\s\s\s|\s/);
    for (let l = 0; l < numberOfStacks; l++) {
        if (currentCrates[l] != '') stacks[l].push(currentCrates[l]);
    }
}
stacks.unshift([]);

let movements: Movement[] = [];
for (let i = 0; i < input[1].length; i++) {
    let currentMovement = input[1][i].split(/\s/);
    movements.push({ quantity: parseInt(currentMovement[1]), from: parseInt(currentMovement[3]), to: parseInt(currentMovement[5]) });
}

for (let i = 0; i < movements.length; i++) {
    let movingCrates: string[] = []
    for (let q = 0; q < movements[i].quantity; q++) {
        movingCrates.push(stacks[movements[i].from].pop());
    }
    
    for (let l = movingCrates.length - 1; l >= 0; l--) {
        stacks[movements[i].to].push(movingCrates[l]);
    }
}

stacks.shift();
for (let i = 0; i < stacks.length; i++) {
    result += stacks[i][stacks[i].length - 1].slice(1, 2);
}

console.log(result);
console.timeEnd('Time');