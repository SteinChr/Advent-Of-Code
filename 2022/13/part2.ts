import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(/\r\n\r\n|\r\n/);
input.push(...['[[2]]', '[[6]]']);
let result = 0;

input.sort((a, b) => checkPair(a, b) == 'Yes' ? -1 : 1);

result = (input.indexOf('[[2]]') + 1) * (input.indexOf('[[6]]') + 1);
console.log(result);

function checkPair(l, r): string {
    let left = eval(l);
    let right = eval(r);
    let status = 'Processing';
    if (typeof(left) == 'number' && typeof(right) == 'number') {
        status = left < right ? 'Yes' : left > right ? 'No' : 'Processing';
    } else if (Array.isArray(left) && Array.isArray(right) && left.length == 0 && right.length == 0) {
        status = 'Processing';
    } else if (Array.isArray(left) && left.length == 0) {
        status = 'Yes';
    } else if (Array.isArray(right) && right.length == 0) {
        status = 'No';
    } else {
        let leftArray = left;
        let rightArray = right;

        if (typeof(left) == 'number') leftArray = [left];
        if (typeof(right) == 'number') rightArray = [right];

        for (let i = 0; i < leftArray.length && status == 'Processing'; i++) {
            if (i > rightArray.length - 1) {
                status = 'No';
            } else {
                status = checkPair(leftArray[i], rightArray[i]);
            }
        }
        if (status == 'Processing' && leftArray.length < rightArray.length) status = 'Yes';
    }
    return status;
}

console.timeEnd('Time');