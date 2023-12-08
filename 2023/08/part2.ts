import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n');
let result = 0;

let instructions = input[0];
let nodeInput = input[1].split('\r\n').map(x => x.split(/\s=\s\(|,\s|\)/).filter(y => y != ''));

class Node {
    left: string;
    right: string;
}

let nodes = new Map<string, Node>();
let currentNodes: string[] = [];

for (let i = 0; i < nodeInput.length; i++) {
    nodes.set(nodeInput[i][0], { left: nodeInput[i][1], right: nodeInput[i][2] });
    if (nodeInput[i][0][2] == 'A') currentNodes.push(nodeInput[i][0]);
}

let counter: number = 0;
let pathLengths: number[] = [];

for (let i = 0; i < currentNodes.length; i++) {
    let currentPathLength = 0;
    counter = 0;

    while (currentNodes[i][2] != 'Z') {
        if (instructions[counter] == 'L') currentNodes[i] = nodes.get(currentNodes[i]).left;
        if (instructions[counter] == 'R') currentNodes[i] = nodes.get(currentNodes[i]).right;

        currentPathLength++;
        counter++;
        if (counter >= instructions.length) counter = 0;
    }

    pathLengths.push(currentPathLength);
}

result = lcm(pathLengths);
console.log(result);

function lcm(numbers: number[]): number {
    let currentLcm = 1;

    for (let i = 0; i < numbers.length; i++) {
        let n1 = Math.max(numbers[i], currentLcm);
        let n2 = Math.min (numbers[i], currentLcm);

        let x = n1;
        while (x % n2 != 0) {
            x += n1;
        }

        currentLcm = x;
    }

    return currentLcm;
}

console.timeEnd('Time');