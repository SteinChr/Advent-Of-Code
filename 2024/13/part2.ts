import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n').map(y => y.split(/X\+|,\s|Y\+|=/)));
let result = 0;

class Claw {
    ax: number;
    ay: number;
    bx: number;
    by: number;
    prizeX: number;
    prizeY: number
}

class Pos {
    x: number;
    y: number;
}

let claws: Claw[] = [];

for (let i = 0; i < input.length; i++) {
    claws.push({ ax: parseInt(input[i][0][1]), ay: parseInt(input[i][0][3]), bx: parseInt(input[i][1][1]), by: parseInt(input[i][1][3]), prizeX: parseInt(input[i][2][1]) + 10000000000000, prizeY: parseInt(input[i][2][3]) + 10000000000000 });
}

for (let c = 0; c < claws.length; c++) {
    let d = claws[c].ax * claws[c].by - claws[c].bx * claws[c].ay;
    let d1 = claws[c].prizeX * claws[c].by - claws[c].bx * claws[c].prizeY;
    let d2 = claws[c].ax * claws[c].prizeY - claws[c].prizeX * claws[c].ay;

    let a = d1 / d;
    let b = d2 / d;
    
    if (a % 1 == 0 && b % 1 == 0) result += a * 3 + b;
}

console.log(result);
console.timeEnd('Time');