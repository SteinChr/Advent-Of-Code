import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/:\s|\s/));
let result = 0;

let devices = new Map<string, string[]>();

for (let i = 0; i < input.length; i++) {
    devices.set(input[i][0], input[i].slice(1));
}

let checked = new Map<string, number>();

result = followPath('svr_0_0');
console.log(result);

function followPath(current: string): number {
    let name = current.split('_')[0];
    let dac = current.split('_')[1];
    let fft = current.split('_')[2];

    if (name == 'out') {
        if (dac == '1' && fft == '1') {
            return 1;
        } else {
            return 0;
        }
    }

    if (name == 'dac') dac = '1';
    if (name == 'fft') fft = '1';

    if (checked.has(combine(name, dac, fft))) return checked.get(combine(name, dac, fft));
    
    let newPaths = 0;
    let nextDevices = devices.get(name);

    for (let i = 0; i < nextDevices.length; i++) {
        newPaths += followPath(combine(nextDevices[i], dac, fft));
    }

    checked.set(combine(name, dac, fft), newPaths);
    return newPaths;
}

function combine(name: string, dac: string, fft: string): string {
    return name + '_' + dac + '_' + fft;
}

console.timeEnd('Time');