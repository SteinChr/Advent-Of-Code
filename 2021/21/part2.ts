import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(/\s|\r\n/);
let positionPlayer1 = parseInt(input[4]);
let positionPlayer2 = parseInt(input[10]);
let winCount = [0, 0];
let result = 0;
class Game {
    positions: number[]
    scores: number[]
    count: number
    constructor(positions: number[], scores: number[], count: number) {
        this.positions = positions;
        this.scores = scores;
        this.count = count;
    }
    toString(): string {
        return this.positions.toString() + this.scores.toString();
    }
    copy(): Game {
        return new Game(this.positions.slice(), this.scores.slice(), this.count);
    }
}
let game = new Game([positionPlayer1, positionPlayer2], [0, 0], 1);
let games = new Map<string, Game>();
games.set(game.toString(), game);
let distribution = [[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]];
for (let i = 0; games.size != 0; i++) {
    for (let p = 0; p < 2; p++) {
        let newGames = new Map<string, Game>();
        for (let oldGame of Array.from(games.values())) {
            if (oldGame.scores[1 - p] >= 21) {
                winCount[1 - p] += oldGame.count;
            } else {
                for (let [move, count] of distribution) {
                    let newGame = oldGame.copy();
                    newGame.positions[p] = (newGame.positions[p] - 1 + move) % 10 + 1;
                    newGame.scores[p] += newGame.positions[p];
                    let corrector = newGames.get(newGame.toString())?.count || 0;
                    newGame.count = oldGame.count * count + corrector;
                    newGames.set(newGame.toString(), newGame);
                }
            }
        }
        games = newGames;
        if (games.size == 0) {
            result = Math.max(...winCount);
            break;
        }
    }
}
console.log(result);
console.timeEnd('Time');