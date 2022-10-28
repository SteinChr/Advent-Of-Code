import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let lines = input.split('\r\n');
let startPosition = 220;
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

for (let i = 0; i < 100; i++) {
    const newTiles = JSON.parse(JSON.stringify(tiles));
    for (let x = 2; x < tiles.length - 2; x++) {
        for (let y = 2; y < tiles[x].length - 2; y++) {
            let blackAdjacentTiles = 0;
            if (tiles[x][y] == true) {
                if (tiles[x + 2][y] == true) blackAdjacentTiles++;
                if (tiles[x - 2][y] == true) blackAdjacentTiles++;
                if (tiles[x + 1][y + 1] == true) blackAdjacentTiles++;
                if (tiles[x + 1][y - 1] == true) blackAdjacentTiles++;
                if (tiles[x - 1][y + 1] == true) blackAdjacentTiles++;
                if (tiles[x - 1][y - 1] == true) blackAdjacentTiles++;
                if (blackAdjacentTiles == 0 || blackAdjacentTiles > 2) newTiles[x][y] = false;
            } else if (tiles[x][y] == false) {
                if (tiles[x + 2][y] == true) blackAdjacentTiles++;
                if (tiles[x - 2][y] == true) blackAdjacentTiles++;
                if (tiles[x + 1][y + 1] == true) blackAdjacentTiles++;
                if (tiles[x + 1][y - 1] == true) blackAdjacentTiles++;
                if (tiles[x - 1][y + 1] == true) blackAdjacentTiles++;
                if (tiles[x - 1][y - 1] == true) blackAdjacentTiles++;
                if (blackAdjacentTiles == 2) newTiles[x][y] = true;
            }
        }
    }
    tiles = JSON.parse(JSON.stringify(newTiles));
}

for (let j = 0; j < tiles.length; j++) {
    for (let l = 0; l < tiles[j].length; l++) {
        if (tiles[j][l] == true) result++;
    }
}

console.log(result);
console.timeEnd('Time');