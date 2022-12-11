import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n'));
let result = 0;

class Monkey {
    items: number[];
    operation: string;
    test: number;
    ifTrue: number;
    ifFalse: number;
    itemCount: number;
}

let monkeys: Monkey[] = [];
for (let i = 0; i < input.length; i++) {
    let startingItems = input[i][1].split(/:\s|,\s/).slice(1).map(x => parseInt(x));
    let operation = input[i][2].split(/:\s|\s=\s/)[2];
    let test = parseInt(input[i][3].split(' ')[5]);
    let ifTrue = parseInt(input[i][4].split(' ')[9]);
    let ifFalse = parseInt(input[i][5].split(' ')[9]);
    monkeys.push({ items: startingItems, operation: operation, test: test, ifTrue: ifTrue, ifFalse: ifFalse, itemCount: 0 });
}

for (let r = 0; r < 20; r++) {
    for (let m = 0; m < monkeys.length; m++) {
        for (let i = 0; i < monkeys[m].items.length; i++) {
            monkeys[m].itemCount++;
            let oldWorryLevel = monkeys[m].items[i];
            let newWorryLevel = Math.floor(eval(monkeys[m].operation.replace(/old/g, oldWorryLevel.toString())) / 3);
            if (newWorryLevel % monkeys[m].test == 0) {
                monkeys[monkeys[m].ifTrue].items.push(newWorryLevel);
            } else {
                monkeys[monkeys[m].ifFalse].items.push(newWorryLevel);
            }
        }
        monkeys[m].items = [];
    }
}

monkeys.sort((a, b) => b.itemCount - a.itemCount);
result = monkeys[0].itemCount * monkeys[1].itemCount;
console.log(result);
console.timeEnd('Time');