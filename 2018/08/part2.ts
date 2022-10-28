import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(' ').map(x => parseInt(x));
let result = 0;

result = getValueOfNode();

function getValueOfNode() {
    let childNodes = input.shift();
    let metaData = input.shift();

    if (childNodes != 0) {
        let valuesOfChilds = [];
        for (let c = 0; c < childNodes; c++) {
            valuesOfChilds.push(getValueOfNode());
        }
        let metaDatas = [];
        for (let m = 0; m < metaData; m++) {
            metaDatas.push(input.shift());
        }

        let valueOfCurrentNode = 0;
        for (let m = 0; m < metaDatas.length; m++) {
            let index = metaDatas[m] - 1;
            if (index >= 0 && index < valuesOfChilds.length) valueOfCurrentNode += valuesOfChilds[index];
        }
        return valueOfCurrentNode;
    } else {
        let valueOfCurrentNode = 0;
        for (let m = 0; m < metaData; m++) {
            valueOfCurrentNode += input.shift();
        }
        return valueOfCurrentNode;
    }
}

console.log(result);
console.timeEnd('Time');