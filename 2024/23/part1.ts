import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split('-'));
let result = 0;

let connections = new Map<string, string[]>();

for (let i = 0; i < input.length; i++) {
    if (connections.has(input[i][0])) {
        connections.set(input[i][0], [...connections.get(input[i][0]), input[i][1]]);
    } else {
        connections.set(input[i][0], [input[i][1]]);
    }

    if (connections.has(input[i][1])) {
        connections.set(input[i][1], [...connections.get(input[i][1]), input[i][0]]);
    } else {
        connections.set(input[i][1], [input[i][0]]);
    }
}

let groups: string[][] = [];

for (let [key, value] of connections) {
    for (let v = 0; v < value.length - 1; v++) {
        for (let v1 = v + 1; v1 < value.length; v1++) {
            if (connections.get(value[v]).includes(value[v1])) {
                groups.push([key, value[v], value[v1]]);
            }
        }
    }
}

for (let g = 0; g < groups.length; g++) {
    if (groups[g][0].startsWith('t') || groups[g][1].startsWith('t') || groups[g][2].startsWith('t')) {
        result++;
    }
}

result /= 3;

console.log(result);
console.timeEnd('Time');