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
    currentHuman: string;
    currentElephant: string;
    totalFlowRate: number;
    opened: string[];
    minutesLeftHuman: number;
    mintesLeftElephant: number;
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

let paths: Path[] = [{ currentHuman: 'AA', currentElephant: 'AA', totalFlowRate: 0, opened: ['AA'], minutesLeftHuman: 26, mintesLeftElephant: 26 }];
while (paths.length != 0) {
    let currentPath = paths.shift();
    for (let [humanDestinationKey, humanDestinationValve] of valves) {
        if (!currentPath.opened.includes(humanDestinationKey) && currentPath.currentHuman != humanDestinationKey) {
            for (let [elephantDestinationKey, elephantDestinationValve] of valves) {
                if (!currentPath.opened.includes(elephantDestinationKey) && currentPath.currentElephant != elephantDestinationKey && humanDestinationKey != elephantDestinationKey) {
                    let minutesNeededHuman = shortestConnections.get(currentPath.currentHuman + '-' + humanDestinationKey) + 1;
                    let newFlowRateHuman = humanDestinationValve.flowRate * (currentPath.minutesLeftHuman - minutesNeededHuman);
                    let minutesNeededElephant = shortestConnections.get(currentPath.currentElephant + '-' + elephantDestinationKey) + 1;
                    let newFlowRateElephant = elephantDestinationValve.flowRate * (currentPath.mintesLeftElephant - minutesNeededElephant);

                    let timeToGetToNearestValveHuman: number = Number.MAX_VALUE;
                    for (let [key, value] of valves) {
                        if (key != currentPath.currentHuman && !currentPath.currentHuman.includes(key)) {
                            let connectionLength = shortestConnections.get(currentPath.currentHuman + '-' + key);
                            if (connectionLength < timeToGetToNearestValveHuman) timeToGetToNearestValveHuman = connectionLength;
                        }
                    }

                    let timeToGetToNearestValveElephant: number = Number.MAX_VALUE;
                    for (let [key, value] of valves) {
                        if (key != currentPath.currentElephant && !currentPath.currentElephant.includes(key)) {
                            let connectionLength = shortestConnections.get(currentPath.currentElephant + '-' + key);
                            if (connectionLength < timeToGetToNearestValveElephant) timeToGetToNearestValveElephant = connectionLength;
                        }
                    }


                    if (currentPath.minutesLeftHuman - minutesNeededHuman >= 0 && currentPath.mintesLeftElephant - minutesNeededElephant >= 0 && currentPath.totalFlowRate + getMaximumPossiblePressure(currentPath.opened, Math.max(timeToGetToNearestValveHuman, timeToGetToNearestValveElephant)) > result) {
                        paths.push({ currentHuman: humanDestinationKey, currentElephant: elephantDestinationKey, totalFlowRate: currentPath.totalFlowRate + newFlowRateHuman + newFlowRateElephant, opened: [...currentPath.opened, humanDestinationKey, elephantDestinationKey], minutesLeftHuman: currentPath.minutesLeftHuman - minutesNeededHuman, mintesLeftElephant: currentPath.mintesLeftElephant - minutesNeededElephant });
                    } else {
                        if (currentPath.minutesLeftHuman - minutesNeededHuman >= 0 && currentPath.totalFlowRate + getMaximumPossiblePressure(currentPath.opened, timeToGetToNearestValveHuman) > result) {
                            paths.push({ currentHuman: humanDestinationKey, currentElephant: currentPath.currentElephant, totalFlowRate: currentPath.totalFlowRate + newFlowRateHuman, opened: [...currentPath.opened, humanDestinationKey], minutesLeftHuman: currentPath.minutesLeftHuman - minutesNeededHuman, mintesLeftElephant: currentPath.mintesLeftElephant });
                        }
                        if (currentPath.mintesLeftElephant - minutesNeededElephant >= 0 && currentPath.totalFlowRate + getMaximumPossiblePressure(currentPath.opened, timeToGetToNearestValveElephant) > result) {
                            paths.push({ currentHuman: currentPath.currentHuman, currentElephant: elephantDestinationKey, totalFlowRate: currentPath.totalFlowRate + newFlowRateElephant, opened: [...currentPath.opened, elephantDestinationKey], minutesLeftHuman: currentPath.minutesLeftHuman, mintesLeftElephant: currentPath.mintesLeftElephant - minutesNeededElephant });
                        }
                    }
                }
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