import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/,\s|;\s|\s|=/));
let result = 0;

class Valve {
    name: string;
    flowRate: number;
    leadsTo: string[];
    lengthOfConnections: number[];
}

class Connection {
    current: string;
    length: number;
    visited: string[];
}

class Path {
    current: string;
    totalFlowRate: number;
    opened: string[];
    minutesLeft: number;
}

let valves = new Map<string, Valve>();
for (let i = 0; i < input.length; i++) {
    let currentLeadsTo: string[] = [];
    let currentLengthOfConnections: number[] = [];
    for (let l = 10; l < input[i].length; l++) {
        currentLeadsTo.push(input[i][l]);
        currentLengthOfConnections.push(1);
    }
    valves.set(input[i][1], { name: input[i][1], flowRate: parseInt(input[i][5]), leadsTo: currentLeadsTo, lengthOfConnections: currentLengthOfConnections });
}

let found: boolean = true;
while (found) {
    found = false;
    for (let [sourceKey, sourceValue] of valves) {
        if (sourceValue.flowRate == 0 && sourceKey != 'AA') {
            found = true;
            for (let [targetKey, targetValue] of valves) {
                let index = targetValue.leadsTo.indexOf(sourceKey);
                if (index != -1 && targetKey != sourceKey) {
                    targetValue.leadsTo.splice(index, 1);
                    let newLength = targetValue.lengthOfConnections.splice(index, 1)[0];
                    for (let i = 0; i < sourceValue.leadsTo.length; i++) {
                        if (sourceValue.leadsTo[i] != targetKey) {
                            targetValue.leadsTo.push(sourceValue.leadsTo[i]);
                            targetValue.lengthOfConnections.push(sourceValue.lengthOfConnections[i] + newLength);
                        }
                    }
                }
            }
            valves.delete(sourceKey);
        }
    }
}

let shortestConnections = new Map<string, number>();
for (let [startKey, startValve] of valves) {
    for (let [destinationKey, destinationValve] of valves) {
        if (startKey != destinationKey) {
            let possibleConnections: Connection[] = [];
            let currentShortestConnection: number = Number.MAX_VALUE;
            for (let i = 0; i < startValve.leadsTo.length; i++) {
                possibleConnections.push({ current: startValve.leadsTo[i], length: startValve.lengthOfConnections[i], visited: [] });
            }
            while (possibleConnections.length != 0) {
                let currentConnection = possibleConnections.shift();
                if (currentConnection.current == destinationKey && currentShortestConnection > currentConnection.length) {
                    currentShortestConnection = currentConnection.length;
                } else {
                    for (let i = 0; i < valves.get(currentConnection.current).leadsTo.length; i++) {
                        if (!currentConnection.visited.includes(valves.get(currentConnection.current).leadsTo[i])) possibleConnections.push({ current: valves.get(currentConnection.current).leadsTo[i], length: currentConnection.length + valves.get(currentConnection.current).lengthOfConnections[i], visited: [...currentConnection.visited, currentConnection.current] });
                    }
                }
            }
            shortestConnections.set(startKey + '-' + destinationKey, currentShortestConnection);
        }
    }
}

let paths: Path[] = [{ current: 'AA', totalFlowRate: 0, opened: ['AA'], minutesLeft: 30 }];
while (paths.length != 0) {
    let currentPath = paths.shift();
    for (let [destinationKey, destinationValve] of valves) {
        if (!currentPath.opened.includes(destinationKey) && currentPath.current != destinationKey) {
            let minutesNeeded = shortestConnections.get(currentPath.current + '-' + destinationKey) + 1;
            let newFlowRate = destinationValve.flowRate * (currentPath.minutesLeft - minutesNeeded);

            let timeToGetToNearestValve: number = Number.MAX_VALUE;
            for (let [key, value] of valves) {
                if (key != currentPath.current && !currentPath.current.includes(key)) {
                    let connectionLength = shortestConnections.get(currentPath.current + '-' + key);
                    if (connectionLength < timeToGetToNearestValve) timeToGetToNearestValve = connectionLength;
                }
            }

            if (currentPath.minutesLeft - minutesNeeded >= 0 && currentPath.totalFlowRate + getMaximumPossiblePressure(currentPath.opened, timeToGetToNearestValve) > result) {
                paths.push({ current: destinationKey, totalFlowRate: currentPath.totalFlowRate + newFlowRate, opened: [...currentPath.opened, destinationKey], minutesLeft: currentPath.minutesLeft - minutesNeeded });
            }
        }
        if (currentPath.totalFlowRate > result) {
            result = currentPath.totalFlowRate;
        }
    }
}

function getMaximumPossiblePressure(opened: string[], minutes: number): number {
    let maximumPossiblePressure = 0;
    for (let [key, valve] of valves) {
        if (!opened.includes(key)) {
            maximumPossiblePressure += valve.flowRate * minutes;
        }
    }
    return maximumPossiblePressure;
}

console.log(result);
console.timeEnd('Time');