import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let splittedInput = input.split('\r\n\r\n');
let tiles = splittedInput.map(t => t.split('\r\n'));
let tilesWithVersion: { id: number, edges: string[][] }[] = [];
const length = Math.sqrt(tiles.length);
let resultGrid = new Array(length);
let tilesWithoutEdges = new Array(tiles.length);
let picture = new Array(length);
let numberOfMonsters = 0;
let result = 0;

for (let i = 0; i < tiles.length; i++) {
    tilesWithVersion.push({
        id: parseInt(tiles[i][0].split(' ')[1].split(':')[0]), edges: [
            [tiles[i][1], tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).join(''), tiles[i][tiles[i].length - 1], tiles[i].slice(1).map(x => x.charAt(0)).join('')],
            [tiles[i].slice(1).map(x => x.charAt(0)).reverse().join(''), tiles[i][1], tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).reverse().join(''), tiles[i][tiles[i].length - 1].split('').join('')],
            [tiles[i][tiles[i].length - 1].split('').reverse().join(''), tiles[i].slice(1).map(x => x.charAt(0)).reverse().join(''), tiles[i][1].split('').reverse().join(''), tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).reverse().join('')],
            [tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).join(''), tiles[i][tiles[i].length - 1].split('').reverse().join(''), tiles[i].slice(1).map(x => x.charAt(0)).join(''), tiles[i][1].split('').reverse().join('')],
            [tiles[i][1].split('').reverse().join(''), tiles[i].slice(1).map(x => x.charAt(0)).join(''), tiles[i][tiles[i].length - 1].split('').reverse().join(''), tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).join('')],
            [tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).reverse().join(''), tiles[i][1].split('').reverse().join(''), tiles[i].slice(1).map(x => x.charAt(0)).reverse().join(''), tiles[i][tiles[i].length - 1].split('').reverse().join('')],
            [tiles[i][tiles[i].length - 1], tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).reverse().join(''), tiles[i][1], tiles[i].slice(1).map(x => x.charAt(0)).reverse().join('')],
            [tiles[i].slice(1).map(x => x.charAt(0)).join(''), tiles[i][tiles[i].length - 1], tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).join(''), tiles[i][1]]
        ]
    });
}

//Find corners
let corners: number[] = [];
for (let i = 0; i < tilesWithVersion.length; i++) {
    for (let l = 0; l < tilesWithVersion[i].edges.length; l++) {
        let matches = 0;
        for (let j = 0; j < tilesWithVersion[i].edges[l].length; j++) {
            let currentEdge = tilesWithVersion[i].edges[l][j];
            if (tilesWithVersion.filter(t => t.id != tilesWithVersion[i].id).find(t => t.edges[0].includes(currentEdge) || t.edges[1].includes(currentEdge) || t.edges[2].includes(currentEdge) || t.edges[3].includes(currentEdge) || t.edges[4].includes(currentEdge) || t.edges[5].includes(currentEdge) || t.edges[6].includes(currentEdge) || t.edges[7].includes(currentEdge))) {
                matches++;
            }
        }
        if (matches == 2 && !corners.includes(tilesWithVersion[i].id)) {
            corners.push(tilesWithVersion[i].id);
        }
    }
}

//Find start version
let startVersion = 0;
let startCorner = tilesWithVersion.find(t => corners[0] == t.id);

for (let i = 0; i < startCorner.edges.length; i++) {
    let currentEdge = startCorner.edges[i][1];
    if (tilesWithVersion.filter(t => t.id != startCorner.id)
        .find(t => t.edges[0].includes(currentEdge) || t.edges[1].includes(currentEdge) || t.edges[2].includes(currentEdge) || t.edges[3].includes(currentEdge) || t.edges[4].includes(currentEdge) || t.edges[5].includes(currentEdge) || t.edges[6].includes(currentEdge) || t.edges[7].includes(currentEdge))) {
        currentEdge = startCorner.edges[i][2];
        if (tilesWithVersion.filter(t => t.id != startCorner.id)
            .find(t => t.edges[0].includes(currentEdge) || t.edges[1].includes(currentEdge) || t.edges[2].includes(currentEdge) || t.edges[3].includes(currentEdge) || t.edges[4].includes(currentEdge) || t.edges[5].includes(currentEdge) || t.edges[6].includes(currentEdge) || t.edges[7].includes(currentEdge))) {
            startVersion = i;
            break;
        }
    }
}

//Arrange tiles
let currentTile: TileVersion = { id: startCorner.id, edges: startCorner.edges, version: startVersion };
for (let y = 0; y < length; y++) {
    resultGrid[y] = new Array<TileVersion>(length);
    for (let x = 0; x < length; x++) {
        resultGrid[y][x] = currentTile;
        let nextTile: TileVersion = null;
        if (x < length - 1) {
            let currentRightEdge = currentTile.edges[currentTile.version][1];
            let filteredTiles = tilesWithVersion.filter(t => t.id != currentTile.id);
            for (let i = 0; i < filteredTiles.length && !nextTile; i++) {
                for (let l = 0; l < filteredTiles[i].edges.length && !nextTile; l++) {
                    if (currentRightEdge == filteredTiles[i].edges[l][3]) {
                        nextTile = { id: filteredTiles[i].id, edges: filteredTiles[i].edges, version: l };
                    }
                }
            }
        } else if (y < length - 1) { //#..##.#...
            let currentBottomEdge = resultGrid[y][0].edges[resultGrid[y][0].version][2];
            let filteredTiles = tilesWithVersion.filter(t => t.id != resultGrid[y][0].id);
            for (let i = 0; i < filteredTiles.length && !nextTile; i++) {
                for (let l = 0; l < filteredTiles[i].edges.length && !nextTile; l++) {
                    if (currentBottomEdge == filteredTiles[i].edges[l][0]) {
                        nextTile = { id: filteredTiles[i].id, edges: filteredTiles[i].edges, version: l };
                    }
                }
            }
        }
        currentTile = nextTile;
    }
}

//Remove edges from tiles
for (let x = 0; x < length; x++) {
    for (let y = 0; y < length; y++) {
        let currentIndex = tiles.indexOf(tiles.find(t => t[0].includes(resultGrid[x][y].id)));
        tilesWithoutEdges[currentIndex] = new Array(tiles[currentIndex].length - 3);
        for (let l = 2; l < tiles[currentIndex].length - 1; l++) {
            tilesWithoutEdges[currentIndex][l - 2] = tiles[currentIndex][l].slice(1, tiles[currentIndex][l].length - 1);
        }
        tilesWithoutEdges[currentIndex] = getVersion(tilesWithoutEdges[currentIndex], resultGrid[x][y].version);
    }
}

//Create Picture
for (let x = 0; x < length; x++) {
    for (let y = 0; y < length; y++) {
        let currentIndex = tiles.indexOf(tiles.find(t => t[0].includes(resultGrid[x][y].id)));
        for (let i = 0; i < tilesWithoutEdges[currentIndex].length; i++) {
            if (picture[x * tilesWithoutEdges[currentIndex].length + i] == null) {
                picture[x * tilesWithoutEdges[currentIndex].length + i] = tilesWithoutEdges[currentIndex][i];
            } else {
                picture[x * tilesWithoutEdges[currentIndex].length + i] += tilesWithoutEdges[currentIndex][i];
            }
        }
    }
}

//Find monsters
for (let i = 0; i < 8; i++) {
    let newPicture = getVersion(picture, i);

    for (let y = 0; y <= newPicture.length - 3; y++) {
        for (let x = 18; x <= newPicture[y].length - 2; x++) {
            if (newPicture[y][x] == '#') {
                if (newPicture[y + 1][x - 18] == '#' && newPicture[y + 1][x - 13] == '#' && newPicture[y + 1][x - 12] == '#' && newPicture[y + 1][x - 7] == '#' && newPicture[y + 1][x - 6] == '#' && newPicture[y + 1][x - 1] == '#' && newPicture[y + 1][x] == '#' && newPicture[y + 1][x + 1] == '#') {
                    if (newPicture[y + 2][x - 17] == '#' && newPicture[y + 2][x - 14] == '#' && newPicture[y + 2][x - 11] == '#' && newPicture[y + 2][x - 8] == '#' && newPicture[y + 2][x - 5] == '#' && newPicture[y + 2][x - 2] == '#') {
                        numberOfMonsters++;
                    }
                }
            }
        }
    }

    if (numberOfMonsters != 0) {
        for (let l = 0; l < newPicture.length; l++) {
            for (let j = 0; j < newPicture[l].length; j++) {
                if (newPicture[l][j] == '#') {
                    result++;
                }
            }
        }
        result -= numberOfMonsters * 15;
        break;
    }
}

console.log(result);

interface TileVersion {
    id: number;
    edges: string[][];
    version: number;
}

function getVersion(input: string[], version: number): string[] {
    if (version >= 4) {
        input = flip(input);
    }
    if (version % 4 >= 1) {
        input = rotate(input);
    }
    if (version % 4 >= 2) {
        input = rotate(input);
    }
    if (version % 4 >= 3) {
        input = rotate(input);
    }
    return input;
}

function rotate(input: string[]): string[] {
    let output = new Array(input.length).fill('');

    for (let i = 0; i < input.length; i++) {
        for (let l = 0; l < input[i].length; l++) {
            output[l] = input[i][l] + output[l];
        }
    }

    return output;
}

function flip(input: string[]): string[] {
    let output = new Array(input.length);

    for (let i = 0; i < input.length; i++) {
        output[i] = '';
        for (let l = 0; l < input[i].length; l++) {
            output[i] += input[i][input[i].length - l - 1];
        }
    }

    return output;
}

console.timeEnd('Time');