import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split('').map(x => parseInt(x)));
let visited = new Array(input.length);
let result = 0;
for (let i = 0; i < input.length; i++) {
    visited[i] = [];
    for (let l = 0; l < input[i].length; l++) {
        visited[i][l] = 0;
    }
}
let nodesToVisit: { x: number, y: number, score: number }[] = [{ x: 0, y: 0, score: 0 }];
while (nodesToVisit.length > 0) {
    nodesToVisit = nodesToVisit.sort((a, b) => a.score - b.score);
    let { x, y, score } = nodesToVisit.shift();
    if (score < visited[y][x] || visited[y][x] == 0) {
        visited[y][x] = score;
        if (x != input[0].length - 1 || y != input.length - 1) {
            if (y > 0 && (visited[y - 1][x] > score + input[y - 1][x] || visited[y - 1][x] == 0)) {
                nodesToVisit.push({ x: x, y: y - 1, score: score + input[y - 1][x] });
            }
            if (x > 0 && (visited[y][x - 1]  > score + input[y][x - 1] || visited[y][x - 1] == 0)) {
                nodesToVisit.push({ x: x - 1, y: y, score: score + input[y][x - 1] });
            }
            if (x < input[0].length - 1 && (visited[y][x + 1]  > score + input[y][x + 1] || visited[y][x + 1] == 0)) {
                nodesToVisit.push({ x: x + 1, y: y, score: score + input[y][x + 1] });
            }
            if (y < input.length - 1 && (visited[y + 1][x] > score + input[y + 1][x] || visited[y + 1][x] == 0)) {
                nodesToVisit.push({ x: x, y: y + 1, score: score + input[y + 1][x] });
            }
        }
    }
}
result = visited[visited.length - 1][visited[0].length - 1];
console.log(result);
console.timeEnd('Time');