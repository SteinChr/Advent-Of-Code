import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.toString());
let expected = [];
let incomplete = true;
let score = 0;
let scores = [];
let result = 0;
for (let i = 0; i < input.length; i++) {
    expected = [];
    incomplete = true;
    score = 0;
    for (let l = 0; l < input[i].length; l++) {
        if (input[i].charAt(l) == '(') {
            expected.push(')');
        } else if (input[i].charAt(l) == '{') {
            expected.push('}');
        } else if (input[i].charAt(l) == '[') {
            expected.push(']');
        } else if (input[i].charAt(l) == '<') {
            expected.push('>');
        } else if (input[i].charAt(l) == ')' ||
            input[i].charAt(l) == '}' ||
            input[i].charAt(l) == ']' ||
            input[i].charAt(l) == '>') {
            if (expected[expected.length - 1] == input[i].charAt(l)) {
                expected.splice(expected.length - 1);
            } else {
                input.splice(i, 1);
                i--;
                incomplete = false;
                break;
            }
        }
    }
    if (incomplete) {
        expected.reverse();
        for (let l = 0; l < expected.length; l++) {
            score *= 5;
            if (expected[l] == ')') {
                score++;
            } else if (expected[l] == ']') {
                score += 2;
            } else if (expected[l] == '}') {
                score += 3;
            } else if (expected[l] == '>') {
                score += 4;
            }
        }
        scores.push(score);
    }
}
scores.sort((a, b) => a - b);
result = scores[Math.floor(scores.length / 2)];
console.log(result);
console.timeEnd('Time');