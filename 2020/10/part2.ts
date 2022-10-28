import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split('\r\n').map(line => parseInt(line));
numbers = numbers.sort((a, b) => a - b);
numbers.push(numbers[numbers.length - 1] + 3);
let possiblePaths = [{ adapter: 0, counter: 1 }];
const max = Math.max(...numbers);
let result = 0;

while (possiblePaths.length != 0) {
    let path = possiblePaths.shift();
    if (path.adapter < max) {
        for (let i = 1; i <= 3; i++) {
            if (numbers.includes(path.adapter + i)) {
                let existingPath = possiblePaths.find(p => p.adapter == path.adapter + i);
                if (existingPath != null) {
                    existingPath.counter += path.counter;
                } else {
                    possiblePaths.push({ adapter: path.adapter + i, counter: path.counter });
                }
            }
        }
    } else {
        result += path.counter;
    }
}

console.log(result);
console.timeEnd('Time');