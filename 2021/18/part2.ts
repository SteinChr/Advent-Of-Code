import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.toString());
let addend1 = input[0];
let addend2 = input[1];
let sum = addend1;
let result = 0;
let magnitudes = [];
for (let i = 0; i < input.length; i++) {
    for (let l = 0; l < input.length; l++) {
        if (i != l) {
            sum = '[' + input[i] + ',' + input[l] + ']';
            sum = reduceNumber(sum);
            magnitudes.push(calculateMagnitude(sum));
        }
    }
}
result = Math.max(...magnitudes);
console.log(result);

function calculateMagnitude(num: string): number {
    return eval(num.replace(/,/g, '*3+2*').replace(/\[/g, '(').replace(/\]/g, ')'));
}

function readPair(num: string, ix: number): { leftIx: number, rightIx: number, endIx: number } {
    let leftIx = ix + 1;
    let rightIx = 0;
    let brackets = 0;
    while (true) {
        ix++;
        switch (num.charAt(ix)) {
            case ',':
                if (brackets == 0) {
                    rightIx = ix + 1;
                }
                break;
            case '[':
                brackets++;
                break;
            case ']':
                if (brackets == 0) {
                    return { leftIx, rightIx, endIx: ix - 1 };
                }
                brackets--;
                break;
            default:
                break;
        }
    }
}

function readValue(num: string, ix: number): { value: number, startIx: number, endIx: number } {
    let startIx = -1;
    let endIx = -1;
    let value = 0;
    for (let i = ix; startIx == -1; i--) {
        if (!(num.charAt(i) >= '0' && num.charAt(i) <= '9')) {
            startIx = i + 1;
        } else if (i == 0) {
            startIx = i;
        }
    }
    for (let i = ix; endIx == -1; i++) {
        if (!(num.charAt(i) >= '0' && num.charAt(i) <= '9')) {
            endIx = i - 1;
        } else if (i == num.length - 1) {
            endIx = i;
        }
    }
    value = parseInt(num.substring(startIx, endIx + 1));
    return { startIx, endIx, value };
}

function reduceNumber(num: string): string {
    let reducedPair = num;

    let repeat = true;
    while (repeat) {
        num = reducedPair;
        repeat = false;

        // find exploding pair
        let bracketCount = 0;
        let lastNumberIndex = -1;
        let nextNumberIndex = -1;
        let bracketIndex = -1;
        let pairIx;
        for (let i = 0; i < num.length; i++) {
            if (num.charAt(i) == '[') bracketCount++;
            if (num.charAt(i) == ']') bracketCount--;
            if (bracketCount == 5) {
                bracketIndex = i;
                pairIx = readPair(num, i);
                for (let l = pairIx.endIx + 1; nextNumberIndex == -1; l++) {
                    if (l >= num.length) break;
                    if (num.charAt(l) != '[' && num.charAt(l) != ']' && num.charAt(l) != ',') {
                        nextNumberIndex = l;
                    }
                }
                break;
            }
            if (num.charAt(i) != '[' && num.charAt(i) != ']' && num.charAt(i) != ',') {
                lastNumberIndex = i;
            }
        }

        //explode Pair
        if (bracketIndex != -1) {
            repeat = true;

            let leftExplodeValue = readValue(num, pairIx.leftIx);
            let rightExplodeValue = readValue(num, pairIx.rightIx);
            if (lastNumberIndex != -1 && nextNumberIndex != -1) {
                let shiftLeft = readValue(num, lastNumberIndex);
                let shiftRight = readValue(num, nextNumberIndex);
                reducedPair =
                    num.substring(0, shiftLeft.startIx) +
                    (shiftLeft.value + leftExplodeValue.value).toString() +
                    num.substring(shiftLeft.endIx + 1, bracketIndex) +
                    '0' +
                    num.substring(pairIx.endIx + 2, shiftRight.startIx) +
                    (shiftRight.value + rightExplodeValue.value).toString() +
                    num.substring(shiftRight.endIx + 1);
            } else if (lastNumberIndex == -1 && nextNumberIndex != -1) {
                let shiftRight = readValue(num, nextNumberIndex);
                reducedPair =
                    num.substring(0, bracketIndex) +
                    '0' +
                    num.substring(pairIx.endIx + 2, shiftRight.startIx) +
                    (shiftRight.value + rightExplodeValue.value).toString() +
                    num.substring(shiftRight.endIx + 1);
            } else if (nextNumberIndex == -1 && lastNumberIndex != -1) {
                let shiftLeft = readValue(num, lastNumberIndex);
                reducedPair =
                    num.substring(0, shiftLeft.startIx) +
                    (shiftLeft.value + leftExplodeValue.value).toString() +
                    num.substring(shiftLeft.endIx + 1, bracketIndex) +
                    '0' +
                    num.substring(pairIx.endIx + 2);
            }
        }

        //split Pair
        if (repeat == false) {
            for (let i = 0; i < num.length - 1; i++) {
                if (num.charAt(i) != '[' && num.charAt(i) != ']' && num.charAt(i) != ',') {
                    if (num.charAt(i + 1) != '[' && num.charAt(i + 1) != ']' && num.charAt(i + 1) != ',') {
                        repeat = true;
                        let splitNumber = parseInt(num.charAt(i) + num.charAt(i + 1));
                        let newPair = '[' + Math.floor(splitNumber / 2) + ',' + Math.ceil(splitNumber / 2) + ']';
                        reducedPair =
                            num.substring(0, i) +
                            newPair +
                            num.substring(i + 2);
                        break;
                    }
                }
            }
        }
    }
    return reducedPair;
}

console.timeEnd('Time');