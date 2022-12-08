import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split('').map(x => parseInt(x)));
let views: number[] = [];
let result = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        let viewLeft: number = 0;
        let viewRight: number = 0;
        let viewUp: number = 0;
        let viewDown: number = 0;
        for (let currentX = x - 1; currentX >= 0; currentX--) {
            viewLeft++;
            if (input[y][currentX] >= input[y][x]) break;
        }
        for (let currentX = x + 1; currentX < input[y].length; currentX++) {
            viewRight++;
            if (input[y][currentX] >= input[y][x]) break;
        }
        for (let currentY = y - 1; currentY >= 0; currentY--) {
            viewUp++;
            if (input[currentY][x] >= input[y][x]) break;
        }
        for (let currentY = y + 1; currentY < input.length; currentY++) {
            viewDown++;
            if (input[currentY][x] >= input[y][x]) break;
        }
        if (viewLeft || viewRight || viewUp || viewDown) {
            result++;
        }
        views.push(viewLeft * viewRight * viewUp * viewDown);
    }
}

result = Math.max(...views);
console.log(result);
console.timeEnd('Time');