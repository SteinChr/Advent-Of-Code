import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.toString());
let expected = [];
let result = 0;
for (let i = 0; i < input.length; i++) {
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
                if (input[i].charAt(l) == ')') {
                    result += 3;
                } else if (input[i].charAt(l) == ']') {
                    result += 57;
                } else if (input[i].charAt(l) == '}') {
                    result += 1197;
                } else if (input[i].charAt(l) == '>') {
                    result += 25137;
                }
                break;
            }
        }
    }
}
console.log(result);
console.timeEnd('Time');