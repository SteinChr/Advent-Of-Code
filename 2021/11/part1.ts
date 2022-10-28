import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split('')).map(x => x.map(y => parseInt(y)));
let result = 0;
for (let n = 0; n < 100; n++) {
    for (let i = 0; i < input.length; i++) {
        for (let l = 0; l < input[i].length; l++) {
            input[i][l]++;
        }
    }
    while (checkArrayForFlashes() == true) {
        for (let i = 0; i < input.length; i++) {
            for (let l = 0; l < input[i].length; l++) {
                if (input[i][l] > 9) {
                    increaseNeighbours(i, l);
                    input[i][l] = -1;
                }
            }
        }
    }
    for (let i = 0; i < input.length; i++) {
        for (let l = 0; l < input[i].length; l++) {
            if (input[i][l] == -1) {
                input[i][l]++;
                result++;
            }
        }
    }
}
console.log(result);

function checkArrayForFlashes() {
    for (let a = 0; a < input.length; a++) {
        if (input[a].filter(x => x > 9).length > 0) return true;
    }
    return false;
}
function increaseNeighbours(i, l) {
    if (i != 0 && input[i - 1][l] != -1) input[i - 1][l]++;
    if (i != 0 && l != 0 && input[i - 1][l - 1] != -1) input[i - 1][l - 1]++;
    if (l != 0 && input[i][l - 1] != -1) input[i][l - 1]++;
    if (l != 0 && i != input.length - 1 && input[i + 1][l - 1] != -1) input[i + 1][l - 1]++;
    if (i != input.length - 1 && input[i + 1][l] != -1) input[i + 1][l]++;
    if (i != input.length - 1 && l != input[0].length - 1 && input[i + 1][l + 1] != -1) input[i + 1][l + 1]++;
    if (l != input[0].length - 1 && input[i][l + 1] != -1) input[i][l + 1]++;
    if (i != 0 && l != input[0].length - 1 && input[i - 1][l + 1] != -1) input[i - 1][l + 1]++;
}

console.timeEnd('Time');