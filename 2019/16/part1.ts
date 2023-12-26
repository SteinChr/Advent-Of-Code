import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('').map(x => parseInt(x));
let result = 0;

let pattern = [0, 1, 0, -1];

for (let p = 0; p < 100; p++) {
    let output = new Array(input.length);

    for (let o = 0; o < output.length; o++) {
        let currentOutput = 0;

        for (let i = 0; i < input.length; i++) {
            currentOutput += input[i] * pattern[Math.floor((i % (pattern.length * (o + 1)) + 1) / (o + 1)) % pattern.length];
        }

        output[o] = Math.abs(currentOutput) % 10;
    }
    
    input = output.slice();
}

result = input[0] * 10000000 + input[1] * 1000000 + input[2] * 100000 + input[3] * 10000 + input[4] * 1000 + input[5] * 100 + input[6] * 10 + input[7];
console.log(result);
console.timeEnd('Time');