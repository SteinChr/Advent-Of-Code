import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(': '));

let monkeys = new Map<string, string>();
for (let i = 0; i < input.length; i++) {
    monkeys.set(input[i][0], input[i][1]);
}

console.log(getValue('root'));

function getValue(monkeyName: string): number {
    let currentMonkey = monkeys.get(monkeyName);
    if (currentMonkey.split(' ').length == 1) {
        return parseInt(currentMonkey);
    } else {
        let equation = currentMonkey.split(' ');
        let value1 = getValue(equation[0]);
        let value2 = getValue(equation[2]);
        return eval(value1 + equation[1] + value2);
    }
}

console.timeEnd('Time');