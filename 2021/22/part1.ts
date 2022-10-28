import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\sx=|\..|y=|z=/));
let result = 0;
let cubes = new Array(101);
for (let i = 0; i < cubes.length; i++) {
    cubes[i] = new Array(101);
    for (let l = 0; l < cubes[i].length; l++) {
        cubes[i][l] = new Array(101);
        for (let j = 0; j < cubes[i][l].length; j++) {
            cubes[i][l][j] = 0;
        }
    }
}
for (let i = 0; i < input.length; i++) {
    if (parseInt(input[i][1]) >= -50 && parseInt(input[i][2]) <= 50 &&
        parseInt(input[i][3]) >= -50 && parseInt(input[i][4]) <= 50 &&
        parseInt(input[i][5]) >= -50 && parseInt(input[i][6]) <= 50) {
        for (let x = parseInt(input[i][1]) + 50; x <= parseInt(input[i][2]) + 50; x++) {
            for (let y = parseInt(input[i][3]) + 50; y <= parseInt(input[i][4]) + 50; y++) {
                for (let z = parseInt(input[i][5]) + 50; z <= parseInt(input[i][6]) + 50; z++) {
                    let replaceValue = -1;
                    if (input[i][0] == 'on') replaceValue = 1;
                    if (input[i][0] == 'off') replaceValue = 0;
                    cubes[x][y][z] = replaceValue;
                }
            }
        }
    }
}
for (let x = 0; x < cubes.length; x++) {
    for (let y = 0; y < cubes[x].length; y++) {
        for (let z = 0; z < cubes[x][y].length; z++) {
            if (cubes[x][y][z] == 1) result++;
        }
    }
}
console.log(result);
console.timeEnd('Time');