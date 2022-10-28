import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',').map(x => parseInt(x));
for (let i = 0; i < 80; i++) {
    for (let fish = 0; fish < input.length; fish++) {
        if (input[fish] > 0) {
            input[fish]--;
        } else {
            input[fish] = 6;
            input.push(9);
        }
    }
}
let result = input.length;
console.log(result);
console.timeEnd('Time');