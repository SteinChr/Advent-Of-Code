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

for (let i = 0; i < nodeInput.length; i++) {
    nodes.set(nodeInput[i][0], { left: nodeInput[i][1], right: nodeInput[i][2] });
}

let currentNode: string = 'AAA';
let counter: number = 0;

while (currentNode != 'ZZZ') {
    if (instructions[counter] == 'L') currentNode = nodes.get(currentNode).left;
    if (instructions[counter] == 'R') currentNode = nodes.get(currentNode).right;

    result++;
    counter++;
    if (counter >= instructions.length) counter = 0;
}

console.log(result);
console.timeEnd('Time');