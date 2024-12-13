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
    claws.push({ ax: parseInt(input[i][0][1]), ay: parseInt(input[i][0][3]), bx: parseInt(input[i][1][1]), by: parseInt(input[i][1][3]), prizeX: parseInt(input[i][2][1]), prizeY: parseInt(input[i][2][3]) });
}

for (let c = 0; c < claws.length; c++) {
    let possible: boolean = false;
    let minTokens: number = Number.MAX_VALUE;

    for (let a = 1; a <= 100; a++) {
        for (let b = 1; b <= 100; b++) {
            let pos: Pos = { x: a * claws[c].ax + b * claws[c].bx, y: a * claws[c].ay + b * claws[c].by };
            
            if (pos.x == claws[c].prizeX && pos.y == claws[c].prizeY) {
                let tokens: number = a * 3 + b;
                possible = true;
                if (tokens < minTokens) minTokens = tokens;
            }
        }
    }

    if (possible) {
        result += minTokens;
    }
}

console.log(result);
console.timeEnd('Time');