import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\s->\s|,\s/));
let result = 0;

class Module {
    type: string;
    name: string;
    destination: string[];
    inputPulses: Map<string, string>;
    state: string;
}

class Pulse {
    type: string;
    moduleName: string;
    origin: string;
}

let modules = new Map<string, Module>();

for (let i = 0; i < input.length; i++) {
    let name = input[i][0];
    let type = '-';

    if (name.startsWith('%') || name.startsWith('&')) {
        type = name.slice(0, 1);
        name = name.substring(1);
    }

    let destination: string[] = [];

    for (let l = 1; l < input[i].length; l++) {
        destination.push(input[i][l]);
    }

    modules.set(name, { type: type, name: name, destination: destination, inputPulses: new Map<string, string>(), state: 'off' });
}

for (let i = 0; i < input.length; i++) {
    let name = input[i][0];
    if (name.startsWith('%') || name.startsWith('&')) name = name.substring(1);
    let currentModule = modules.get(name);

    if (currentModule.type == '&') {
        for (let l = 0; l < input.length; l++) {
            let currentName = input[l][0];
            if (currentName.startsWith('%') || currentName.startsWith('&')) currentName = currentName.substring(1);
            for (let j = 1; j < input[l].length; j++) {
                if (input[l][j] == name) {
                    currentModule.inputPulses.set(currentName, 'low');
                }
            }
        }
    }
}

let moduleToRx: string = '';
let essentialModules = new Map<string, number>();

modules.forEach((value, key) => {
    if (value.destination.includes('rx')) moduleToRx = key;
});

modules.forEach((value, key) => {
    if (value.destination.includes(moduleToRx)) essentialModules.set(key, 0);
});

let pulses: Pulse[] = [];

outerLoop: for (let b = 0; true; b++) {
    pulses.push({ type: 'low', moduleName: 'broadcaster', origin: '' });

    for (let a = 0; pulses.length != 0; a++) {
        let currentPulse: Pulse = pulses.shift();
        let currentModule: Module = modules.get(currentPulse.moduleName);
        
        if (currentModule) {
            if (currentModule.type == '-') {
                for (let i = 0; i < currentModule.destination.length; i++) {
                    pulses.push({ type: currentPulse.type, moduleName: currentModule.destination[i], origin: currentModule.name });
                }
            } else if (currentModule.type == '%') {
                if (currentPulse.type == 'low') {
                    if (currentModule.state == 'off') {
                        currentModule.state = 'on';
                        for (let i = 0; i < currentModule.destination.length; i++) {
                            pulses.push({ type: 'high', moduleName: currentModule.destination[i], origin: currentModule.name });
                        }
                    } else if (currentModule.state == 'on') {
                        currentModule.state = 'off';
                        for (let i = 0; i < currentModule.destination.length; i++) {
                            pulses.push({ type: 'low', moduleName: currentModule.destination[i], origin: currentModule.name });
                        }
                    }
                }
            } else if (currentModule.type == '&') {
                currentModule.inputPulses.set(currentPulse.origin, currentPulse.type);

                if (essentialModules.has(currentModule.name) && currentPulse.type == 'low' && essentialModules.get(currentPulse.moduleName) == 0) {
                    essentialModules.set(currentPulse.moduleName, b + 1);
                    if (Array.from(essentialModules.values()).every(value => value != 0)) break outerLoop;
                }

                if (checkForAllPulsesHigh(currentModule.inputPulses)) {
                    for (let i = 0; i < currentModule.destination.length; i++) {
                        pulses.push({ type: 'low', moduleName: currentModule.destination[i], origin: currentModule.name });
                    }
                } else {
                    for (let i = 0; i < currentModule.destination.length; i++) {
                        pulses.push({ type: 'high', moduleName: currentModule.destination[i], origin: currentModule.name });
                    }
                }
            }
        }
    }
}

result = lcm(Array.from(essentialModules.values()));
console.log(result);

function lcm(numbers: number[]): number {
    let currentLcm = 1;

    for (let i = 0; i < numbers.length; i++) {
        let n1 = Math.max(numbers[i], currentLcm);
        let n2 = Math.min (numbers[i], currentLcm);

        let x = n1;
        while (x % n2 != 0) {
            x += n1;
        }

        currentLcm = x;
    }

    return currentLcm;
}

function checkForAllPulsesHigh(pulses: Map<string, string>): boolean {
    let allHigh: boolean = true;

    pulses.forEach((value, key) => {
        if (value == 'low') allHigh = false;
    });

    return allHigh;
}

console.timeEnd('Time');