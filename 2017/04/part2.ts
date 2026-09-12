import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' '));
let result = 0;

outerLoop: for (let i = 0; i < input.length; i++) {
    let words = new Set<string>();

    for (let w = 0; w < input[i].length; w++) {
        let currentWord = input[i][w].split('').sort().join('');

        if (words.has(currentWord)) continue outerLoop;
        
        words.add(currentWord);
    }

    result++;
}

console.log(result);
console.timeEnd('Time');