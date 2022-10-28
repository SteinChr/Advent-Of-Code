import {readFileSync} from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let lines = input.split('\r\n');
let earliestTime = parseInt(lines[0]);
let busIds = lines[1].split(',');
let buses = [];
let bestBus = 0;
let result = 0;
let bestBusId = 0;

for (let i = 0; i < busIds.length; i++) {
    if (busIds[i] != 'x') {
        buses.push(parseInt(busIds[i]));
    }
}

for (let i = 0; i < buses.length; i++) {
    let currentBus = 0;
    while (currentBus < earliestTime) {
        currentBus += buses[i];
    }
    if (currentBus < bestBus || bestBus == 0) {
        bestBus = currentBus;
        bestBusId = buses [i];
    }
}
result = (bestBus - earliestTime) * bestBusId;
console.log(result);
console.timeEnd('Time');