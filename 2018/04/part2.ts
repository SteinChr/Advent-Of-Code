import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
input.sort();
let data = input.map(x => x.split(/\[1518-|-|:|\]\sGuard\s#|\sbegins\sshift|\]\sfalls\s|\]\swakes\s|\s/));
data.forEach(x => x.shift());
data.filter(x => x[4] != 'up' && x[4] != 'asleep').forEach(x => x.pop());
let minutesAsleep = new Map<number, number>();
let bestMinutes = new Map<number, string>();
let guards = [];
let currentGuard = 0;
let result = 0;
for (let i = 0; i < data.length; i++) {
    if (data[i][4] != 'asleep' && data[i][4] != 'up') {
        if (!guards.includes(parseInt(data[i][4]))) guards.push(parseInt(data[i][4]));
    }
}
for (let g = 0; g < guards.length; g++) {
    for (let i = 0; i < data.length; i++) {
        if (data[i][4] == 'asleep' && currentGuard == guards[g]) {
            for (let t = parseInt(data[i][3]); t < parseInt(data[i + 1][3]); t++) {
                if (minutesAsleep.has(t)) {
                    minutesAsleep.set(t, minutesAsleep.get(t) + 1);
                } else {
                    minutesAsleep.set(t, 1);
                }
            }
        } else if (data[i][4] != 'asleep' && data[i][4] != 'up') {
            currentGuard = parseInt(data[i][4]);
        }
    }
    if (minutesAsleep.size != 0) bestMinutes.set(guards[g], [...minutesAsleep.entries()].reduce((a, b) => b[1] > a[1] ? b : a)[0].toString() + '-' + [...minutesAsleep.entries()].reduce((a, b) => b[1] > a[1] ? b : a)[1].toString());
    minutesAsleep.clear();
}
let resultSearchFor = Math.max(...[...bestMinutes.values()].map(x => x.split('-')[1]).map(x => parseInt(x)));
for (let i of bestMinutes) {
    let current = [i[0], ...i[1].split('-').map(x => parseInt(x))];
    if (current[2] == resultSearchFor) result = current[0] * current[1];
}
console.log(result);
console.timeEnd('Time');