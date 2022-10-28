import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
input.sort();
let data = input.map(x => x.split(/\[1518-|-|:|\]\sGuard\s#|\sbegins\sshift|\]\sfalls\s|\]\swakes\s|\s/));
data.forEach(x => x.shift());
data.filter(x => x[4] != 'up' && x[4] != 'asleep').forEach(x => x.pop());
let minutesAsleep = new Map<number, number>();
let currentGuard = 0;
let guardWithMostSleep = 0;
let bestMinute = 0;
let result = 0;
for (let i = 0; i < data.length; i++) {
    if (data[i][4] == 'asleep') {
        if (minutesAsleep.has(currentGuard)) {
            minutesAsleep.set(currentGuard, minutesAsleep.get(currentGuard) + parseInt(data[i + 1][3]) - parseInt(data[i][3]));
        } else {
            minutesAsleep.set(currentGuard, parseInt(data[i + 1][3]) - parseInt(data[i][3]));
        }
    } else if (data[i][4] != 'up') {
        currentGuard = parseInt(data[i][4]);
    }
}
guardWithMostSleep = [...minutesAsleep.entries()].reduce((a, b) => b[1] > a[1] ? b : a)[0];
minutesAsleep.clear();
currentGuard = 0;
for (let i = 0; i < data.length; i++) {
    if (data[i][4] == 'asleep' && currentGuard == guardWithMostSleep) {
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
bestMinute = [...minutesAsleep.entries()].reduce((a, b) => b[1] > a[1] ? b : a)[0];
result = bestMinute * guardWithMostSleep;
console.log(result);
console.timeEnd('Time');