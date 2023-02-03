import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(': '));
let result: number;

let monkeys = new Map<string, string>();
for (let i = 0; i < input.length; i++) {
    monkeys.set(input[i][0], input[i][1]);
}

monkeys.delete('humn');

let changed: boolean = true;
for (let monkey of monkeys.get('root').split(' ')) {
    if (monkey.length == 1) continue;
    changed = true;
    while (changed) {
        changed = false;
        let currentExpression = monkeys.get(monkey).split(' ');
        for (let i = 0; i < currentExpression.length; i++) {
            if (monkeys.has(currentExpression[i])) {
                currentExpression[i] = '( ' + monkeys.get(currentExpression[i]) + ' )';
                changed = true;
            }
        }
        monkeys.set(monkey, currentExpression.join(' '));
    }
}

let equationPart1 = monkeys.get(monkeys.get('root').split(' ')[0]);
let equationPart2 = monkeys.get(monkeys.get('root').split(' ')[2]);

let formula: string;

if (equationPart1.includes('humn')) {
    formula = equationPart1;
    result = eval(equationPart2);
} else {
    formula = equationPart2;
    result = eval(equationPart1);
}

while (formula.includes('(')) {
    let foundOperatorWithoutBracket: boolean = false;
    let level = 0;
    for (let i = 0; i < formula.length; i++) {
        if (formula[i] == '(') level++;
        if (formula[i] == ')') level--;
        if ('+-*/'.includes(formula[i]) && level == 0) {
            foundOperatorWithoutBracket = true;
            let formula1 = formula.substring(0, i);
            let formula2 = formula.substring(i + 1);
            let operator = formula[i];
            if (formula1.includes('humn')) {
                formula = formula1.trim();
                if (operator == '+') {
                    result -= eval(formula2);
                } else if (operator == '-') {
                    result += eval(formula2);
                } else if (operator == '*') {
                    result /= eval(formula2);
                } else if (operator == '/') {
                    result *= eval(formula2);
                }
            } else {
                formula = formula2.trim();
                if (operator == '+') {
                    result -= eval(formula1);
                } else if (operator == '-') {
                    result = eval(formula1) - result;
                } else if (operator == '*') {
                    result /= eval(formula1);
                } else if (operator == '/') {
                    result = eval(formula1) / result;
                }
            }
            break;
        }
    }
    if (!foundOperatorWithoutBracket) {
        formula = formula.substring(1, formula.length - 1);
    }
}

console.log(result);
console.timeEnd('Time');