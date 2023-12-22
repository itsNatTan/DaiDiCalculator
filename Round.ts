export default class Round {
    // Stores information about each round played
    // Amount of points each win is worth
    base: number;
    // How much each point is worth in terms of real money
    cardCost: number;
    // Number of player cards remaining
    playerCard = [0, 0, 0, 0];
    // Amount of points gained/lost
    pointArray = [0, 0, 0, 0];

    constructor(playerCard: Array<number>, base: number, cardCost: number) {
        this.playerCard = playerCard;
        this.base = base;
        this.cardCost = cardCost;
    }

    checkIsValid() {
        let numberOfZero = 0;
        let withinRange = true;
        for (let i = 0; i < 4; i++) {
            let point: number = this.playerCard[i];
            if (point == 0) {
                numberOfZero += 1;
            }
            if (point < 0 || point > 13) {
                withinRange = false;
            }
            if (!Number.isInteger(point)) {
                withinRange = false;
            }
        }
        return numberOfZero == 1 && withinRange;
    }

    calculatePoints() {
        for (let p1 = 0; p1 < 3; p1++) {
            for (let p2 = p1 + 1; p2 < 4; p2++) {
                const c1 = this.playerCard[p1];
                const c2 = this.playerCard[p2];
                if (c2 > c1) {
                    // P1 wins
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
                } else if (c1 > c2) {
                    // P2 wins
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
                } else {
                } // Do nothing
            }
        }
    }
}
