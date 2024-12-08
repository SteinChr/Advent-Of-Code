import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/:\s|\s/).map(y => parseInt(y)));
let result = 0;

let counter = 0;

for (let i = 0; i < input.length; i++) {
    let possibilities = new Map<number, number[]>();
    possibilities.set(counter, [input[i][1] + input[i][2], ...input[i].slice(3)]);
    counter++;
    possibilities.set(counter, [input[i][1] * input[i][2], ...input[i].slice(3)]);
    counter++;
    possibilities.set(counter, [parseInt(input[i][1].toString() + input[i][2].toString()), ...input[i].slice(3)]);
    counter++;

    for (let [key, currentPossibility] of possibilities) {
        possibilities.delete(key);

        if (currentPossibility.length == 1) {
            if (currentPossibility[0] == input[i][0]) {
                result += input[i][0];
                break;
            }
        } else if (currentPossibility[0] <= input[i][0]) {
            if (currentPossibility[0] + currentPossibility[1] <= input[i][0]) {
                possibilities.set(counter, [currentPossibility[0] + currentPossibility[1], ...currentPossibility.slice(2)]);
                counter++;
            }
            
            if (currentPossibility[0] * currentPossibility[1] <= input[i][0]) {
                possibilities.set(counter, [currentPossibility[0] * currentPossibility[1], ...currentPossibility.slice(2)]);
                counter++;
            }

            if (parseInt(currentPossibility[0].toString() + currentPossibility[1].toString()) <= input[i][0]) {
                possibilities.set(counter, [parseInt(currentPossibility[0].toString() + currentPossibility[1].toString()), ...currentPossibility.slice(2)]);
                counter++;
            }
        }
    }
}

console.log(result);
console.timeEnd('Time');