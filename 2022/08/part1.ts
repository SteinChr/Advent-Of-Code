import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split('').map(x => parseInt(x)));
let result = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (x == 0 || y == 0 || x == input[y].length - 1 || y == input.length - 1) {
            result++;
        } else {
            let visible: boolean = false;
            for (let currentX = 0; currentX < x; currentX++) {
                if (input[y][currentX] >= input[y][x]) break;
                if (currentX + 1 == x) visible = true;
            }
            for (let currentX = input[y].length - 1; currentX > x && !visible; currentX--) {
                if (input[y][currentX] >= input[y][x]) break;
                if (currentX - 1 == x) visible = true;
            }
            for (let currentY = 0; currentY < y && !visible; currentY++) {
                if (input[currentY][x] >= input[y][x]) break;
                if (currentY + 1 == y) visible = true;
            }
            for (let currentY = input.length - 1; currentY > y && !visible; currentY--) {
                if (input[currentY][x] >= input[y][x]) break;
                if (currentY - 1 == y) visible = true;
            }
            if (visible) result++;
        }
    }
}

console.log(result);
console.timeEnd('Time');