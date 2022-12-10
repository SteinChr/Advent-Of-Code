import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let cycle = 0;
let register = 1;
let secondCycle: boolean = false;
let result = 0;

for (let i = 0; i < input.length; i++) {
    do {
        cycle++;

        if ((cycle - 20) % 40 == 0) {
            result += register * cycle;
        }

        let instruction = input[i].split(' ')[0];
        if (instruction == 'addx') {
            let currentRegister = parseInt(input[i].split(' ')[1]);
            if (secondCycle) {
                register += currentRegister;
                secondCycle = false;
            } else {
                secondCycle = true;
            }
        }
    } while (secondCycle);
}

console.log(result);
console.timeEnd('Time');