import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let drawnNumbers = input.substring(0, input.indexOf('\r\n')).split(',').map(x => parseInt(x));
let boards: any[] = input.substring(input.indexOf('\r\n')).trim().split('\r\n\r\n').map(x => x.split(/\s|\r\n/));
for (let i = 0; i < boards.length; i++) {
    for (let l = 0; l < boards[i].length; l++) {
        while (boards[i][l] == '') {
            boards[i].splice(l, 1);
        }
    }
    for (let l = 0; l < boards[i].length; l++) {
        boards[i][l] = parseInt(boards[i][l]);
    }
}
let checked = [];
for (let i = 0; i < boards.length; i++) {
    checked.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
}
let result = 0;
for (let i = 0; i < drawnNumbers.length; i++) {
    for (let b = 0; b < boards.length; b++) {
        if (boards[b].includes(drawnNumbers[i])) {
            checked[b][boards[b].indexOf(drawnNumbers[i])] = 1;
        }
    }

    //check if there is winner
    let winnerBoard = getWinningBoard();
    if (winnerBoard != -1) {
        for (let r = 0; r < 25; r++) {
            if (checked[winnerBoard][r] == 0) {
                result += boards[winnerBoard][r];
            }
        }
        result *= drawnNumbers[i];
        console.log(result);
        break;
    }
}
function getWinningBoard(): number {
    for (let b = 0; b < boards.length; b++) {
        if ((checked[b][0] == 1 && checked[b][1] == 1 && checked[b][2] == 1 && checked[b][3] == 1 && checked[b][4] == 1) ||
            (checked[b][5] == 1 && checked[b][6] == 1 && checked[b][7] == 1 && checked[b][8] == 1 && checked[b][9] == 1) ||
            (checked[b][10] == 1 && checked[b][11] == 1 && checked[b][12] == 1 && checked[b][13] == 1 && checked[b][14] == 1) ||
            (checked[b][15] == 1 && checked[b][16] == 1 && checked[b][17] == 1 && checked[b][18] == 1 && checked[b][19] == 1) ||
            (checked[b][20] == 1 && checked[b][21] == 1 && checked[b][22] == 1 && checked[b][23] == 1 && checked[b][24] == 1) ||
            (checked[b][0] == 1 && checked[b][5] == 1 && checked[b][10] == 1 && checked[b][15] == 1 && checked[b][20] == 1) ||
            (checked[b][1] == 1 && checked[b][6] == 1 && checked[b][11] == 1 && checked[b][16] == 1 && checked[b][21] == 1) ||
            (checked[b][2] == 1 && checked[b][7] == 1 && checked[b][12] == 1 && checked[b][17] == 1 && checked[b][22] == 1) ||
            (checked[b][3] == 1 && checked[b][8] == 1 && checked[b][13] == 1 && checked[b][18] == 1 && checked[b][23] == 1) ||
            (checked[b][4] == 1 && checked[b][9] == 1 && checked[b][14] == 1 && checked[b][19] == 1 && checked[b][24] == 1)) {
            return b;
        }
    }
    return -1;
}

console.timeEnd('Time');