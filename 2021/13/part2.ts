import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n'));
let points = input[0].map(x => x.split(',')).map(x => x.map(y => parseInt(y)));
let folds = input[1].map(x => x.split(' ')[2]).map(x => x.split('='));
let grid = new Array(2000);
for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(2000).fill('.');
}
for (let i = 0; i < points.length; i++) {
    grid[points[i][1]][points[i][0]] = '#';
}
for (let i = 0; i < folds.length; i++) {
    let splitPoint = parseInt(folds[i][1]);
    if (folds[i][0] == 'y') {
        for (let l = 0; l < splitPoint; l++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[splitPoint + 1 + l][j] == '#') {
                    grid[splitPoint - 1 - l][j] = '#';
                }
            }
        }
        grid.splice(splitPoint);
    } else if (folds[i][0] == 'x') {
        for (let l = 0; l < splitPoint; l++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[j][splitPoint + 1 + l] == '#') {
                    grid[j][splitPoint - 1 - l] = '#';
                }
            }
        }
        grid.forEach(x => x.splice(splitPoint));
    }
}
for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join());
}
console.timeEnd('Time');