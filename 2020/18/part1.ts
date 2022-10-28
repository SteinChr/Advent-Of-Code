import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let lines = input.split('\r\n');
let result = 0;

interface Expression {
    expression1: string;
    expression2: string;
    operator: string;
}

for (let i = 0; i < lines.length; i++) {
    result += calculate(lines[i]);
}

console.log(result);

function splitExpressions(expression: string): Expression {
    let startMultiplication = -1;
    let startAddition = -1;
    let bracketCounter = 0;

    for (let i = expression.length; i > 0 && startAddition == -1 && startMultiplication == -1; i--) {
        if (expression.charAt(i) == '(') {
            bracketCounter--;
        } else if (expression.charAt(i) == ')') {
            bracketCounter++;
        } else if (expression.charAt(i) == '+' && bracketCounter == 0) {
            startAddition = i;
        } else if (expression.charAt(i) == '*' && bracketCounter == 0) {
            startMultiplication = i;
        }
    }

    if (startAddition == -1 && startMultiplication == -1) {
        return null;
    }

    let splitPosition = 0;
    let operator = '';

    if (startAddition > -1) {
        splitPosition = startAddition;
        operator = '+';
    } else if (startMultiplication > -1) {
        splitPosition = startMultiplication;
        operator = '*';
    }

    let expression1 = expression.slice(0, splitPosition - 1);
    let expression2 = expression.slice(splitPosition + 2, expression.length);

    return {'expression1': expression1, 'expression2': expression2, 'operator': operator};

}

function calculate(term: string): number {
    let expression: Expression = splitExpressions(term);
    if (expression == null) {
        if (term.charAt(0) == '(') {
            term = term.slice(1, term.length - 1);
            return calculate(term);
        } else {
            return parseInt(term);
        }
    } else {
        if (expression.operator == '+') return calculate(expression.expression1) + calculate(expression.expression2);
        if (expression.operator == '*') return calculate(expression.expression1) * calculate(expression.expression2);
    }
}


console.timeEnd('Time');