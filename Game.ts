import Round from "./Round";
import Player from "./Player";
import Profile from "./Profile";

export default class Game {
    rounds: Array<Round> = new Array();
    players: Array<Player> = new Array();
    base: number;
    cardCost: number;

    constructor(
        p1: Profile,
        p2: Profile,
        p3: Profile,
        p4: Profile,
        base: number,
        cardCost: number
    ) {
        this.players.push(new Player(p1));
        this.players.push(new Player(p2));
        this.players.push(new Player(p3));
        this.players.push(new Player(p4));
        this.base = base;
        this.cardCost = cardCost;
    }

    addRound(p1Card: number, p2Card: number, p3Card: number, p4Card: number) {
        let playerCard: Array<number> = [0, 0, 0, 0];
        playerCard[0] = p1Card;
        playerCard[1] = p2Card;
        playerCard[2] = p3Card;
        playerCard[3] = p4Card;
        const round = new Round(playerCard, this.base, this.cardCost);
        if (round.checkIsValid()) {
            round.calculatePoints();
            this.rounds.push(round);
            for (let i = 0; i < 4; i++) {
                let currentPlayer: Player = this.players[i];
                currentPlayer.changeScore(round.pointArray[i]);
                let playerCard: number = round.playerCard[i];
                if (playerCard == 0) {
                    currentPlayer.wins += 1;
                }
                currentPlayer.totalGamesPlayed += 1;
                currentPlayer.cardArray[playerCard] += 1;
            }
        } else {
            console.log(
                "The input is incorrect, please verify there is only one winner AND/OR there are no integers not within the range of 0 - 13."
            );
        }
    }

    getRoundDetails(roundNum: number) {
        return this.rounds[roundNum];
    }

    getPlayerDetails(playerIndex: number) {
        return this.players[playerIndex];
    }

    getPlayerScores() {
        return [
            this.players[0].score,
            this.players[1].score,
            this.players[2].score,
            this.players[3].score,
        ];
    }

    // Add all values back to Profile to update data file
    endGame() {
        this.players.forEach((player) => player.updateProfile());
    }
}
