import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.toString());
let template = input[0].split('');
let pairs = input[1].split('\r\n').map(x => x.split(' -> '));
let result = 0;
let pairsCount = new Array(pairs.length).fill(0);
for (let i = 1; i < template.length; i++) {
    let index = pairs.findIndex(p => p[0] == template[i - 1] + template[i]);
    pairsCount[index] = (pairsCount[index] ?? 0) + 1;
}
let lettersCount = new Map<string, number>();
for (let i = 0; i < template.length; i++) {
    lettersCount.set(template[i], (lettersCount.get(template[i]) ?? 0) + 1);
}
for (let step = 0; step < 40; step++) {
    let newPairsCount = pairsCount.slice();
    for (let i = 0; i < pairs.length; i++) {
        if (pairsCount[i] != 0) {
            newPairsCount[i] -= pairsCount[i];
            lettersCount.set(pairs[i][1], (lettersCount.get(pairs[i][1]) ?? 0) + pairsCount[i]);
            for (let l = 0; l < pairs.length; l++) {
                if (pairs[l][0] == pairs[i][0].charAt(0) + pairs[i][1] || pairs[l][0] == pairs[i][1] + pairs[i][0].charAt(1)) {
                    newPairsCount[l] += pairsCount[i];
                }
            }
        }
    }
    pairsCount = newPairsCount.slice();
}
result = Math.max(...Array.from(lettersCount.values())) - Math.min(...Array.from(lettersCount.values()))
console.log(result);
console.timeEnd('Time');