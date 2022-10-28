import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(/\s|=/);
let xMin = parseInt(input[3].split('..')[0]);
let xMax = parseInt(input[3].split('..')[1]);
let yMin = parseInt(input[5].split('..')[1]);
let yMax = parseInt(input[5].split('..')[0]);
let xPosition = 0;
let yPosition = 0;
let possibleVelocities = [];
let result = 0;
for (let yVelocityStart = -400; yVelocityStart < 400; yVelocityStart++) {
    for (let xVelocityStart = 0; xVelocityStart < 400; xVelocityStart++) {
        let xVelocity = xVelocityStart;
        let yVelocity = yVelocityStart;
        while (xPosition < xMin || yPosition > yMin) {
            xPosition += xVelocity;
            yPosition += yVelocity;
            if (xVelocity > 0) {
                xVelocity--;
            } else if (xVelocity < 0) {
                xVelocity++;
            }
            yVelocity--;
            if (yPosition < yMax) break;
        }
        if (xPosition >= xMin && xPosition <= xMax && yPosition <= yMin && yPosition >= yMax) {
            possibleVelocities.push(xVelocityStart);
        }
        xPosition = 0;
        yPosition = 0;
    }
}
result = possibleVelocities.length;
console.log(result);
console.timeEnd('Time');