class Player {
    name: string;
    score: number;

    constructor(name:string) {
        this.name = name;
        this.score = 0;
    }

    changeScore(change: number) {
        this.score = this.score + change;
    }

    retrieveScore() {
        return this.score;
    }
}

class Round { // Stores information about each round played
    // Amount of points each win is worth
    base: number;
    // How much each point is worth in terms of real money
    cardCost: number;
    // Number of player cards remaining
    playerCard = [0,0,0,0];
    // Amount of points gained/lost
    pointArray = [0,0,0,0];

    constructor(p1: number, p2: number, p3: number, p4: number, base: number, cardCost: number) {
        this.playerCard[0] = p1;
        this.playerCard[1] = p2;
        this.playerCard[2] = p3;
        this.playerCard[3] = p4;
        this.base = base;
        this.cardCost = cardCost;
        this.calculatePoints();
    }

    calculatePoints() {
        for (let p1 = 0; p1 < 3; p1++) {
            for (let p2 = p1 + 1; p2 < 4; p2++) {
                const c1 = this.playerCard[p1];
                const c2 = this.playerCard[p2];
                if (c2 > c1) { // P1 wins
                    const diff = c2 - c1;
                    let total = 0;
                    if (c2 == 13) {
                        total += diff * 3 * this.cardCost;
                    } else if (9 < c2 && c2 < 13) {
                        total += diff * 2 * this.cardCost;
                    } else {
                        total += diff * this.cardCost;
                    }
    
                    if (c1 == 0) {
                        total += this.base;
                    }
    
                    this.pointArray[p1] += total;
                    this.pointArray[p2] -= total;
                } else if (c1 > c2) { // P2 wins
                    const diff = c1 - c2;
                    let total = 0;
                    if (c1 == 13) {
                        total += diff * 3 * this.cardCost;
                    } else if (9 < c1 && c1 < 13) {
                        total += diff * 2 * this.cardCost;
                    } else {
                        total += diff * this.cardCost;
                    }
    
                    if (c2 == 0) {
                        total += this.base;
                    }
    
                    this.pointArray[p2] += total;
                    this.pointArray[p1] -= total;
                } else {} // Do nothing
            }
        }
    }
}

class Game {
    rounds: Array<Round> = new Array();
    players: Array<Player> = new Array();
    base: number
    cardCost: number

    constructor(p1Name:string, p2Name:string, p3Name:string, p4Name:string, base: number, cardCost:number) {
        this.players.push(new Player(p1Name));
        this.players.push(new Player(p2Name));
        this.players.push(new Player(p3Name));
        this.players.push(new Player(p4Name));
        this.base = base;
        this.cardCost = cardCost;
    }

    addRound(p1Card: number, p2Card: number, p3Card: number, p4Card: number) {
        const round = new Round(p1Card, p2Card, p3Card, p4Card, this.base, this.cardCost);
        this.rounds.push(round);
        for (let i = 0; i < 4; i++) {
            this.players[i].changeScore(round.pointArray[i]);
        }
    }
}
const game = new Game("Andy", "Bob", "Charlie", "Dick", 5, 1);
game.addRound(0,12,4,3);
game.addRound(12,12,0,12);
console.log(game.rounds);
console.log(game.players);