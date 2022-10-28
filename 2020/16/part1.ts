import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let clases = input.split('\r\n\r\n')[0].split('\r\n');
let myTicket = input.split('\r\n\r\n')[1].split('\r\n');
let nearbyTickets = input.split('\r\n\r\n')[2].split('\r\n');
let allTickets = [];
myTicket.shift();
myTicket = myTicket[0].split(',');
nearbyTickets.shift();
let possibleNumberClases = [];
let validNumbers = [];
let result = 0;

for (let i = 0; i < clases.length; i++) {
    possibleNumberClases.push(clases[i].split(': ')[1].split(' or')[0]);
    possibleNumberClases.push(clases[i].split('or ')[1]);
}
for (let i = 0; i < possibleNumberClases.length; i++) {
    let min = parseInt(possibleNumberClases[i].split('-')[0]);
    let max = parseInt(possibleNumberClases[i].split('-')[1]);
    for (let l = min; l <= max; l++) {
        validNumbers.push(l);
    }
}
for (let i = 0; i < myTicket.length; i++) {
    allTickets.push(parseInt(myTicket[i]));
}
for (let i = 0; i < nearbyTickets.length; i++) {
    let currentNearbyTicket = nearbyTickets[i].split(',');
    for (let l = 0; l < currentNearbyTicket.length; l++) {
        allTickets.push(parseInt(currentNearbyTicket[l]));
    }
}
for (let i = 0; i < allTickets.length; i++) {
    if (!validNumbers.includes(allTickets[i])) {
        result += allTickets[i];
    }
}
console.log(result);
console.timeEnd('Time');