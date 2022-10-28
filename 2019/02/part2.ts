import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split(',').map(n => parseInt(n));
let counter = 0;
const wantedOutput = 19690720;
let result = 0;

for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
        numbers = input.split(',').map(n => parseInt(n));
        numbers[1] = noun;
        numbers[2] = verb;

        counter = 0;

        while(true) {
            if (numbers[counter * 4] == 1) {
                numbers[numbers[counter * 4 + 3]] = numbers[numbers[counter * 4 + 1]] + numbers[numbers[counter * 4 + 2]];
            } else if (numbers[counter * 4] == 2) {
                numbers[numbers[counter * 4 + 3]] = numbers[numbers[counter * 4 + 1]] * numbers[numbers[counter * 4 + 2]];
            } else if (numbers[counter * 4] == 99) {
                break;
            }
            counter++;
        }
        if (numbers[0] == wantedOutput) {
            result = 100 * noun + verb;
        }
    }
}

console.log(result);
console.timeEnd('Time');