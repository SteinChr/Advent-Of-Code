import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/:\s|\s/));
let result = 0;

class Connection {
    components: string;
    counter: number;
}

class Pair {
    start: string;
    destination: string;
}

class Path {
    position: string;
    visitedConnections: string[];
}

let components: string[] = [];
let connections: Connection[] = [];
for (let i = 0; i < input.length; i++) {
    for (let l = 0; l < input[i].length; l++) {
        if (!components.includes(input[i][l])) components.push(input[i][l]);
        if (l != 0) connections.push({ components: input[i][0] + '-' + input[i][l], counter: 0 });
    }
}

let pairs: Pair[] = [];
if (components.length < 200) {
    for (let i = 0; i < components.length; i++) {
        for (let l = i + 1; l < components.length; l++) {
            pairs.push({ start: components[i], destination: components[l] });
        }
    }
} else {
    for (let i = 0; i < 200; i++) {
        pairs.push({ start: components[i], destination: components[Math.floor(components.length / 2) + i] });
    }
}

for (let i = 0; i < pairs.length; i++) {
    getPath(pairs[i].start, pairs[i].destination);
}

connections.sort(compare);

for (let i = 0; i < 3; i++) {
    connections.shift();
}

let checkComponents: string[] = [...connections[0].components.split('-')];

let groupComponents = new Set<string>();
groupComponents.add(connections[0].components.split('-')[0]);
groupComponents.add(connections[0].components.split('-')[1]);

while (checkComponents.length != 0) {
    let currentComponent = checkComponents.shift();
    for (let i = 0; i < connections.length; i++) {
        let currentConnection = connections[i].components.split('-');
        for (let l = 0; l < currentConnection.length; l++) {
            if (currentComponent == currentConnection[1 - l] && !groupComponents.has(currentConnection[l])) {
                groupComponents.add(currentConnection[l]);
                checkComponents.push(currentConnection[l]);
            }
        }
    }
}

result = (components.length - groupComponents.size) * groupComponents.size;
console.log(result);

function getPath(start: string, destination: string) {
    let paths: Path[] = [{ position: start, visitedConnections: [] }];
    let visitedComponents: string[] = [start];

    while (true) {
        let currentPath = paths.shift();

        if (currentPath.position == destination) {
            for (let i = 0; i < currentPath.visitedConnections.length; i++) {
                connections.find(x => x.components == currentPath.visitedConnections[i]).counter++;
            }

            break;
        }

        for (let c = 0; c < connections.length; c++) {
            if (!currentPath.visitedConnections.includes(connections[c].components)) {
                let currentConnection = connections[c].components.split('-');
                
                for (let i = 0; i < 2; i++) {
                    if (currentPath.position == currentConnection[i] && !visitedComponents.includes(currentConnection[1 - i])) {
                        paths.push({ position: currentConnection[1 - i], visitedConnections: [...currentPath.visitedConnections, connections[c].components] });
                        visitedComponents.push(currentConnection[1 - i]);
                    }
                }
            }
        }
    }
}

function compare(a: Connection, b: Connection): number {
    if (a.counter < b.counter) {
        return 1;
    } else if (a.counter > b.counter) {
        return -1;
    }

    return 0;
}

console.timeEnd('Time');