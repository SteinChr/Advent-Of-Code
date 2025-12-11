import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/:\s|\s/));
let result = 0;

let devices = new Map<string, string[]>();

for (let i = 0; i < input.length; i++) {
    devices.set(input[i][0], input[i].slice(1));
}

let toCheck: string[] = ['you'];

while (toCheck.length != 0) {
    let currentToCheck = toCheck.shift();

    let outputs = devices.get(currentToCheck);

    for (let i = 0; i < outputs.length; i++) {
        if (outputs[i] == 'out') {
            result++;
        } else {
            toCheck.push(outputs[i]);
        }
    }
}

console.log(result);
console.timeEnd('Time');