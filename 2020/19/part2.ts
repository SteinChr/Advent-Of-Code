import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let partsOfInput = input.split('\r\n\r\n');
let rules = partsOfInput[0].split('\r\n');
let receivedMessages = partsOfInput[1].split('\r\n');
let result = 0;

let max = Math.max(...rules.map(r => parseInt(r.split(':')[0])));
let rulesArray = new Array(max);

for (let i = 0; i < rules.length; i++) {
    let ruleNumber = parseInt(rules[i].split(':')[0]);
    rulesArray[ruleNumber] = [];
    for (let part of rules[i].split(': ')[1].split(' | ')) {
        rulesArray[ruleNumber].push(part.replace(/"/g, ''));
    }
}

let expression = rulesArray[0][0];
let includedNumber = expression.match(/(\d)+/);
while (includedNumber != null) {
    let currentRule = rulesArray[parseInt(includedNumber[0])];
    if (currentRule.length == 1) {
        if (includedNumber[0] == '8') {
            expression = expression.replace(/(\d)+/, "(42)+");
        } else if (includedNumber[0] == '11') {
            expression = expression.replace(/(\d)+/, "(42 31 | 42 42 31 31 | 42 42 42 31 31 31 | 42 42 42 42 31 31 31 31 | 42 42 42 42 42 31 31 31 31 31)");
        } else {
            expression = expression.replace(/(\d)+/, currentRule[0]);
        }
    } else {
        expression = expression.replace(/(\d)+/, "(" + currentRule.join('|') + ")");
    }
    includedNumber = expression.match(/(\d)+/);
}

expression = expression.replace(/ /g, '');
let regexp = new RegExp("^" + expression + "$");

for (let i = 0; i < receivedMessages.length; i++) {
    if (receivedMessages[i].match(regexp)) result++;
}

console.log(result);
console.timeEnd('Time');