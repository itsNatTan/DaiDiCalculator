import Profile from "./Profile";

export default class Player {
    profile: Profile;
    id: number;
    name: string;
    score: number;
    wins: number;
    totalGamesPlayed: number;
    cardArray: Array<number>;

    constructor(profile: Profile) {
        this.profile = profile;
        this.id = profile.id;
        this.name = profile.name;
        this.score = 0;
        this.wins = 0;
        this.totalGamesPlayed = 0;
        this.cardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    changeScore(change: number) {
        this.score = this.score + change;
    }

    retrieveScore() {
        return this.score;
    }

    getWinRate() {
        return this.wins / this.totalGamesPlayed;
    }

    updateProfile() {
        // this.profile.update(this.wins, this.totalGamesPlayed, this.cardArray);
        this.profile.gamesPlayed += this.totalGamesPlayed;
        this.profile.gamesWon += this.wins;
        for (let i = 0; i < 14; i++) {
            this.profile.cardDistribution[i] += this.cardArray[i];
        }
    }
}
