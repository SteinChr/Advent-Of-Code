import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('').map(x => parseInt(x));
let result = 0;

let disk: number[] = [];
let counter = 0;

for (let i = 0; i < input.length; i++) {
    if (i % 2 == 0) {
        for (let l = 0; l < input[i]; l++) {
            disk.push(counter);
        }
        
        counter++;
    } else {
        for (let l = 0; l < input[i]; l++) {
            disk.push(Math.floor(input.length / 2));
            input[input.length - 1]--;

            if (input[input.length - 1] == 0) {
                input.pop();
                input.pop();
            }
        }
    }
}

for (let i = 0; i < disk.length; i++) {
    result += i * disk[i];
}

console.log(result);
console.timeEnd('Time');