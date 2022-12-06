import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('');
let currentChars: string[] = [...input.slice(0, 3)];
let result = 0;

for (let i = 3; i < input.length; i++) {
    currentChars.push(input[i]);
    if (!currentChars.find((a, b) => currentChars.indexOf(a) != b)) {
        result = i + 1;
        break;
    }
    currentChars.shift();
}

console.log(result);
console.timeEnd('Time');