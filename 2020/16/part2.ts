import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n');

interface Range {
    from: number;
    to: number;
}

class Rule {
    name: string;
    ranges: Range[] = [];
    possiblePositions: number[] = [];

    constructor(rule: string) {
        let ruleParts = rule.split(':');
        this.name = ruleParts[0];
        for (let range of ruleParts[1].split(' or ')) {
            let rangeParts = range.split('-');
            this.ranges.push({ from: parseInt(rangeParts[0]), to: parseInt(rangeParts[1]) });
        }
    }
}

let rules = input[0].split('\r\n').map(r => new Rule(r));
let myTicket = input[1].split('\r\n')[1].split(',').map(r => parseInt(r));
let nearbyTickets = input[2].split('\r\n').slice(1).map(r => r.split(',').map(t => parseInt(t)));
let validTickets: number[][] = [];
let removedNumbers: number[] = [];
let result = 0;

for (let ticket of nearbyTickets) {
    let ticketIsValid = true;
    for (let value of ticket) {
        let valueIsValid = false;
        for (let rule of rules) {
            for (let range of rule.ranges) {
                valueIsValid = valueIsValid || (value >= range.from && value <= range.to);
                if (valueIsValid) break;
            }
        }
        if (!valueIsValid) {
            ticketIsValid = false;
            break;
        }
    }
    if (ticketIsValid) {
        validTickets.push(ticket);
    }
}

for (let rule of rules) {
    for (let position = 0; position < myTicket.length; position++) {
        let isPossible = true;
        for (let validTicket of validTickets) {
            let ticketIsValidForPosition = false;
            for (let range of rule.ranges) {
                if (validTicket[position] >= range.from && validTicket[position] <= range.to) {
                    ticketIsValidForPosition = true;
                    break;
                }
            }
            if (!ticketIsValidForPosition) {
                isPossible = false;
                break;
            }
        }
        if (isPossible) {
            rule.possiblePositions.push(position);
        }
    }
}

while (rules.filter(r => r.possiblePositions.length > 1).length > 0) {
    for (let rule of rules.filter(r => r.possiblePositions.length == 1)) {
        if (!removedNumbers.includes(rule.possiblePositions[0])) {
            for (let ruleToChange of rules.filter(r => r.possiblePositions.length > 1)) {
                let index = ruleToChange.possiblePositions.indexOf(rule.possiblePositions[0]);
                if (index >= 0) {
                    ruleToChange.possiblePositions.splice(index, 1);
                }
            }
            removedNumbers.push(rule.possiblePositions[0]);
        }
    }
}

let departurePosition = rules.filter(r => r.name.startsWith('departure')).map(r => r.possiblePositions[0]);

result = departurePosition.reduce((previousValue, currentValue) => previousValue * myTicket[currentValue], 1);

console.log(result);
console.timeEnd('Time');