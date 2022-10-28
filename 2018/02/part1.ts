import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(r => r.split(''));
let checkTwo = true;
let checkThree = true;
let twiceCounter = 0;
let threeCounter = 0;
let result = 0;
for (let i = 0; i < input.length; i++) {
    for (let l = 0; l < input[i].length; l++) {
        if (input[i].filter(x => x == input[i][l]).length == 2 && checkTwo) {
            checkTwo = false;
            twiceCounter++;
        } else if (input[i].filter(x => x == input[i][l]).length == 3 && checkThree) {
            checkThree = false;
            threeCounter++;
        }
    }
    checkTwo = true;
    checkThree = true;
}
result = twiceCounter * threeCounter;
console.log(result);
console.timeEnd('Time');