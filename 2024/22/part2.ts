import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => parseInt(x));
let result = 0;

let prices: number[][] = [];
let changes: number[][] = [];

for (let i = 0; i < input.length; i++) {
    prices[i] = [input[i] % 10];
    changes[i] = [];

    for (let l = 0; l < 2000; l++) {
        let secretNumber = input[i];

        let tempResult = secretNumber * 64;
        secretNumber = (secretNumber ^ tempResult) >>> 0;
        secretNumber %= 16777216;

        tempResult = Math.floor(secretNumber / 32);
        secretNumber = (secretNumber ^ tempResult) >>> 0;
        secretNumber %= 16777216;

        tempResult = secretNumber * 2048;
        secretNumber = (secretNumber ^ tempResult) >>> 0;
        secretNumber %= 16777216;

        input[i] = secretNumber;
        prices[i].push(input[i] % 10);
        changes[i].push(prices[i][prices[i].length - 1] - prices[i][prices[i].length - 2]);
    }
}

let sequences = new Map<string, number>();
let sequencesChangeConnection = new Map<string, number[]>();

for (let c = 0; c < changes.length; c++) {
    for (let i = 0; i < changes[c].length - 3; i++) {
        let sequenceString = getStringFromSequence([...changes[c].slice(i, i + 4)]);

        if (sequences.has(sequenceString)) {
            if (!sequencesChangeConnection.get(sequenceString).includes(c)) {
                sequences.set(sequenceString, sequences.get(sequenceString) + prices[c][i + 4]);
                sequencesChangeConnection.set(sequenceString, [...sequencesChangeConnection.get(sequenceString), c]);
            }
        } else {
            sequences.set(sequenceString, prices[c][i + 4]);
            sequencesChangeConnection.set(sequenceString, [c]);
        }
    }
}

for (let [key, value] of sequences) {
    if (value > result) result = value;
}

console.log(result);

function getStringFromSequence(sequence: number[]): string {
    return '_' + sequence[0].toString() + '.' + sequence[1].toString() + '.' + sequence[2].toString() + '.' + sequence[3].toString() + '_';
}

console.timeEnd('Time');