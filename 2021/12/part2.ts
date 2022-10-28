import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.toString()).map(x => x.split('-'));
let result = 0;
let visited = [];
for (let i = 0; i < input.length; i++) {
    if (input[i][0] == 'start') {
        followPath(input[i][1], visited, false);
    } else if (input[i][1] == 'start') {
        followPath(input[i][0], visited, false);
    }
}

function followPath(value, visited, usedTwice) {
    let newVisited = [...visited];
    if (value.toLowerCase() == value) newVisited.push(value);
    for (let j = 0; j < input.length; j++) {
        if (input[j][0] == value) {
            if (input[j][1] == 'end') {
                result++;
            } else if ((input[j][1].toUpperCase() == input[j][1] || !visited.includes(input[j][1]) || !usedTwice) && input[j][1] != 'start') {
                if (visited.includes(input[j][1]) || usedTwice) {
                    followPath(input[j][1], newVisited, true);
                } else {
                    followPath(input[j][1], newVisited, false);
                }
            }
        }
        if (input[j][1] == value) {
            if (input[j][0] == 'end') {
                result++;
            } else if ((input[j][0].toUpperCase() == input[j][0] || !visited.includes(input[j][0]) || !usedTwice) && input[j][0] != 'start') {
                if (visited.includes(input[j][0]) || usedTwice) {
                    followPath(input[j][0], newVisited, true);
                } else {
                    followPath(input[j][0], newVisited, false);
                }
            }
        }
    }
}
console.log(result);
console.timeEnd('Time');