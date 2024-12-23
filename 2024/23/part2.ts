import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split('-'));
let result = '';

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
    let currentGroups: string[][] = [];
    for (let v = 0; v < value.length; v++) {
        currentGroups[v] = [key, value[v]];

        for (let v1 = 0; v1 < value.length; v1++) {
            if (v != v1) {
                let possible = true;

                for (let t = 0; t < currentGroups[v].length; t++) {
                    if (!(connections.get(value[v1]).includes(currentGroups[v][t]) || connections.get(currentGroups[v][t]).includes(value[v1]))) {
                        possible = false;
                    }
                }

                if (possible) {
                    currentGroups[v].push(value[v1]);
                }
            }
        }

        groups.push(...currentGroups);
    }
}

groups.sort((a, b) => b.length - a.length);
result = groups[0].sort().join(',');

console.log(result);
console.timeEnd('Time');