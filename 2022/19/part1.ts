import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/:\s|\s/));
const totalTimeLeft = 24;
let result = 0;

class Cost {
    ore: number;
    clay: number;
    obsidian: number;
}

class Blueprint {
    id: number;
    oreRobotCost: Cost;
    clayRobotCost: Cost;
    obsidianRobotCost: Cost;
    geodeRobotCost: Cost;
}

class Path {
    minutes: number;
    oreRobot: number;
    clayRobot: number;
    obsidianRobot: number;
    geodeRobot: number;
    ore: number;
    clay: number;
    obsidian: number;
    geode: number;
}

let blueprints: Blueprint[] = [];
for (let i = 0; i < input.length; i++) {
    blueprints.push({ id: parseInt(input[i][1]), oreRobotCost: { ore: parseInt(input[i][6]), clay: 0, obsidian: 0 }, clayRobotCost: { ore: parseInt(input[i][12]), clay: 0, obsidian: 0 }, obsidianRobotCost: { ore: parseInt(input[i][18]), clay: parseInt(input[i][21]), obsidian: 0 }, geodeRobotCost: { ore: parseInt(input[i][27]), clay: 0, obsidian: parseInt(input[i][30]) } });
}

for (const blueprint of blueprints) {
    let paths: Path[] = [{ minutes: 0, oreRobot: 1, clayRobot: 0, obsidianRobot: 0, geodeRobot: 0, ore: 0, clay: 0, obsidian: 0, geode: 0 }];
    let highestAmountOfGeodes: number = 0;
    let maximum: Cost = { ore: Math.max(blueprint.oreRobotCost.ore, blueprint.clayRobotCost.ore, blueprint.obsidianRobotCost.ore, blueprint.geodeRobotCost.ore), clay: Math.max(blueprint.oreRobotCost.clay, blueprint.clayRobotCost.clay, blueprint.obsidianRobotCost.clay, blueprint.geodeRobotCost.clay), obsidian: Math.max(blueprint.oreRobotCost.obsidian, blueprint.clayRobotCost.obsidian, blueprint.obsidianRobotCost.obsidian, blueprint.geodeRobotCost.obsidian) };
    let visited = new Set<string>();
    for (let i = 0; paths.length != 0; i++) {
        let currentPath = paths.shift();
        let oldPath: Path = { minutes: currentPath.minutes, oreRobot: currentPath.oreRobot, clayRobot: currentPath.clayRobot, obsidianRobot: currentPath.obsidianRobot, geodeRobot: currentPath.geodeRobot, ore: currentPath.ore, clay: currentPath.clay, obsidian: currentPath.obsidian, geode: currentPath.geode };

        currentPath.minutes++;
        currentPath.ore += currentPath.oreRobot;
        currentPath.clay += currentPath.clayRobot;
        currentPath.obsidian += currentPath.obsidianRobot;
        currentPath.geode += currentPath.geodeRobot;

        if (currentPath.minutes == totalTimeLeft) {
            if (currentPath.geode > highestAmountOfGeodes) highestAmountOfGeodes = currentPath.geode;
        } else {
            if (blueprint.geodeRobotCost.ore <= oldPath.ore && blueprint.geodeRobotCost.obsidian <= oldPath.obsidian && highestAmountOfGeodes < getMaximumGeodes(currentPath.minutes, currentPath.geodeRobot, currentPath.geode)) {
                let newPath: Path = { minutes: currentPath.minutes, oreRobot: currentPath.oreRobot, clayRobot: currentPath.clayRobot, obsidianRobot: currentPath.obsidianRobot, geodeRobot: currentPath.geodeRobot + 1, ore: currentPath.ore - blueprint.geodeRobotCost.ore, clay: currentPath.clay, obsidian: currentPath.obsidian - blueprint.geodeRobotCost.obsidian, geode: currentPath.geode };
                if (!visited.has(turnPathIntoString(newPath))) {
                    paths.push(newPath);
                    visited.add(turnPathIntoString(newPath));
                }
            } else if (currentPath.minutes < totalTimeLeft - 1) {
                if (blueprint.oreRobotCost.ore <= oldPath.ore && currentPath.oreRobot < maximum.ore && highestAmountOfGeodes < getMaximumGeodes(currentPath.minutes, currentPath.geodeRobot, currentPath.geode)) {
                    let newPath: Path = { minutes: currentPath.minutes, oreRobot: currentPath.oreRobot + 1, clayRobot: currentPath.clayRobot, obsidianRobot: currentPath.obsidianRobot, geodeRobot: currentPath.geodeRobot, ore: currentPath.ore - blueprint.oreRobotCost.ore, clay: currentPath.clay, obsidian: currentPath.obsidian, geode: currentPath.geode };
                    if (!visited.has(turnPathIntoString(newPath))) {
                        paths.push(newPath);
                        visited.add(turnPathIntoString(newPath));
                    }
                }
                if (blueprint.clayRobotCost.ore <= oldPath.ore && currentPath.clayRobot < maximum.clay && highestAmountOfGeodes < getMaximumGeodes(currentPath.minutes, currentPath.geodeRobot, currentPath.geode)) {
                    let newPath: Path = { minutes: currentPath.minutes, oreRobot: currentPath.oreRobot, clayRobot: currentPath.clayRobot + 1, obsidianRobot: currentPath.obsidianRobot, geodeRobot: currentPath.geodeRobot, ore: currentPath.ore - blueprint.clayRobotCost.ore, clay: currentPath.clay, obsidian: currentPath.obsidian, geode: currentPath.geode };
                    if (!visited.has(turnPathIntoString(newPath))) {
                        paths.push(newPath);
                        visited.add(turnPathIntoString(newPath));
                    }
                }
                if (blueprint.obsidianRobotCost.ore <= oldPath.ore && blueprint.obsidianRobotCost.clay <= oldPath.clay && currentPath.obsidianRobot < maximum.obsidian && highestAmountOfGeodes < getMaximumGeodes(currentPath.minutes, currentPath.geodeRobot, currentPath.geode)) {
                    let newPath: Path = { minutes: currentPath.minutes, oreRobot: currentPath.oreRobot, clayRobot: currentPath.clayRobot, obsidianRobot: currentPath.obsidianRobot + 1, geodeRobot: currentPath.geodeRobot, ore: currentPath.ore - blueprint.obsidianRobotCost.ore, clay: currentPath.clay - blueprint.obsidianRobotCost.clay, obsidian: currentPath.obsidian, geode: currentPath.geode };
                    if (!visited.has(turnPathIntoString(newPath))) {
                        paths.push(newPath);
                        visited.add(turnPathIntoString(newPath));
                    }
                }
            }
            if (highestAmountOfGeodes < getMaximumGeodes(currentPath.minutes, currentPath.geodeRobot, currentPath.geode) && !visited.has(turnPathIntoString(currentPath))) {
                paths.push(currentPath);
                visited.add(turnPathIntoString(currentPath));
            }
            paths.sort(sort);
        }
    }
    result += blueprint.id * highestAmountOfGeodes;
}

console.log(result);

function turnPathIntoString(path: Path): string {
    return path.minutes + '_' + path.oreRobot + '_' + path.clayRobot + '_' + path.obsidianRobot + '_' + path.geodeRobot + '_' + path.ore + '_' + path.clay + '_' + path.obsidian + '_' + path.geode;
}

function getMaximumGeodes(minutes: number, numberOfRobots: number, geodesAlreadyOpened: number): number {
    return geodesAlreadyOpened + numberOfRobots * (totalTimeLeft - minutes) + ((totalTimeLeft - minutes) * ((totalTimeLeft - minutes) + 1) / 2);
}

function sort(a: Path, b: Path) {
    if (b.geode > a.geode) {
        return 1;
    } else if (b.geode < a.geode) {
        return -1;
    } else {
        if (b.geodeRobot > a.geodeRobot) {
            return 1;
        } else if (b.geodeRobot < a.geodeRobot) {
            return -1;
        } else {
            if (b.obsidianRobot > a.obsidianRobot) {
                return 1;
            } else if (b.obsidianRobot < a.obsidianRobot) {
                return -1;
            } else {
                if (b.clayRobot > a.clayRobot) {
                    return 1;
                } else if (b.clayRobot < a.clayRobot) {
                    return -1;
                } else {
                    if (b.oreRobot > a.oreRobot) {
                        return 1;
                    } else if (b.oreRobot < a.oreRobot) {
                        return -1;
                    }
                }
            }
        }
    }
}

console.timeEnd('Time');