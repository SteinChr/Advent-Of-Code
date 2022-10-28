import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('');
let repeat = true;
let result = 0;
while (repeat) {
    repeat = false;
    for (let i = 0; i < input.length - 1; i++) {
        if (input[i].toLowerCase() == input[i + 1].toLowerCase()) {
            if (input[i] != input[i + 1]) {
                input.splice(i, 2);
                repeat = true;
            }
        }
    }
}
result = input.length;
console.log(result);
console.timeEnd('Time');