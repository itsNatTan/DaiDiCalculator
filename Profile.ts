export default class Profile {
    id: number;
    name: string;
    gamesPlayed: number;
    gamesWon: number;
    cardDistribution: Array<number>;

    constructor(
        id: number,
        name: string,
        gamesPlayed: number,
        gamesWon: number,
        cardDistribution: Array<number>
    ) {
        this.id = id;
        this.name = name;
        this.gamesPlayed = gamesPlayed;
        this.gamesWon = gamesWon;
        this.cardDistribution = cardDistribution;
    }

    update(
        wins: number,
        gamesPlayed: number,
        currentCardDistribution: Array<number>
    ) {
        this.gamesWon += wins;
        this.gamesPlayed += gamesPlayed;
        for (let i = 0; i < 14; i++) {
            this.cardDistribution[i] += currentCardDistribution[i];
        }
        
    }
}
