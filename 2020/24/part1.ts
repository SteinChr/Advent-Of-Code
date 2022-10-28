import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let lines = input.split('\r\n');
let startPosition = 50;
let tiles: boolean[][] = new Array(startPosition * 2);
let result = 0;

for (let i = 0; i < tiles.length; i++) {
    tiles[i] = new Array(startPosition * 2);
    for (let l = 0; l < tiles[i].length; l++) {
        tiles[i][l] = false;
    }
}

for (let i = 0; i < lines.length; i++) {
    let x = startPosition;
    let y = startPosition;
    let currentPosition = 0;
    while (currentPosition < lines[i].length) {
        if (lines[i].charAt(currentPosition) == 'e') {
            x += 2;
            currentPosition++;
        } else if (lines[i].charAt(currentPosition) == 'w') {
            x -= 2;
            currentPosition++;
        } else if (lines[i].charAt(currentPosition) == 's') {
            if (lines[i].charAt(currentPosition + 1) == 'e') {
                x++;
                y++;
                currentPosition += 2;
            } else if (lines[i].charAt(currentPosition + 1) == 'w') {
                x--;
                y++;
                currentPosition += 2;
            }
        } else if (lines[i].charAt(currentPosition) == 'n') {
            if (lines[i].charAt(currentPosition + 1) == 'e') {
                x++;
                y--;
                currentPosition += 2;
            } else if (lines[i].charAt(currentPosition + 1) == 'w') {
                x--;
                y--;
                currentPosition += 2;
            }
        }
    }
    tiles[x][y] = !tiles[x][y];
}

for (let i = 0; i < tiles.length; i++) {
    for (let l = 0; l < tiles[i].length; l++) {
        if (tiles[i][l] == true) result++;
    }
}

console.log(result);
console.timeEnd('Time');