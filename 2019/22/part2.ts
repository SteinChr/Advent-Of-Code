import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result: string = '';

const deckSize: string = '119315717514047';
const shuffleProcesses: string = '101741582076661';

let a: string = '1';
let b: string = '0';

for (let i = 0; i < input.length; i++) {
    if (input[i] == 'deal into new stack') {
        a = (BigInt(a) * BigInt(-1)).toString();
        b = (BigInt(b) * BigInt(-1) - BigInt(1)).toString();
    } else if (input[i].startsWith('cut')) {
        let cutIndex = parseInt(input[i].split(' ')[1]);
        b = (BigInt(b) - BigInt(cutIndex)).toString();
    } else if (input[i].startsWith('deal with increment')) {
        let incrementIndex = parseInt(input[i].split(' ')[3]);
        a = (BigInt(a) * BigInt(incrementIndex)).toString();
        b = (BigInt(b) * BigInt(incrementIndex)).toString();
    }

    a = mod(a);
    b = mod(b);
}

let shuffle: string[][] = [[a, b]];

for (let i = 2; i < BigInt(shuffleProcesses); i *= 2) {
    b = (BigInt(b) * (BigInt(a) + BigInt(1))).toString();
    a = (BigInt(a) * BigInt(a)).toString();

    a = mod(a);
    b = mod(b);

    shuffle.push([a, b]);
}

a = '1';
b = '0';

let deckSizeBinary = (BigInt(shuffleProcesses)).toString(2).split('').map(x => parseInt(x));
let shuffleIndex = 0;

for (let i = deckSizeBinary.length - 1; i >= 0; i--) {
    if (deckSizeBinary[i] == 1) {
        a = (BigInt(a) * BigInt(shuffle[shuffleIndex][0])).toString();
        b = (BigInt(shuffle[shuffleIndex][0]) * BigInt(b) + BigInt(shuffle[shuffleIndex][1])).toString();

        a = mod(a);
        b = mod(b);
    }

    shuffleIndex++;
}

result = mod((BigInt(mod((BigInt(2020) - BigInt(b)).toString())) * BigInt(mod(modInverse(BigInt(a), BigInt(deckSize)).toString()))).toString());
console.log(result);

function mod(x: string): string {
    if (BigInt(x) >= BigInt(0)) return (BigInt(x) % BigInt(deckSize)).toString();

    while (BigInt(x) < BigInt(0)) {
        x = (BigInt(x) + BigInt(deckSize)).toString();
    }

    return x;
}

function modInverse(r: bigint, oldR: bigint): bigint {
    let oldT = BigInt(0);
    let t = BigInt(1);

    while (r != BigInt(0)) {
        let q = oldR / r;

        let newR = oldR - q * r;
        oldR = r;
        r = newR;

        let newT = oldT - q * t;
        oldT = t;
        t = newT;
    }

    if (oldT < BigInt(0)) {
        oldT += BigInt(deckSize);
    }

    return oldT;
}

console.timeEnd('Time');