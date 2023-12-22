import Profile from "./Profile";
import ProfileList from "./ProfileList";
import Game from './Game';
import * as fs from 'fs';


// const game = new Game("Andy", "Bob", "Charlie", "Dick", 5, 1);
// game.addRound(0, 12, 4, 3);
// game.addRound(0, 12, 12, 5);
// game.addRound(3, 0, 12, 5);
// console.log(game.rounds);
// console.log(game.players);
// console.log(game.getRoundDetails(0));
// console.log(game.players[0].getWinRate());
// console.log(game.getPlayerScores());

let jsonString = fs.readFileSync('./data.txt', 'utf-8');
// let jsonString =
//     '[{"name": "BOB", "id": "1", "gamesPlayed": 0, "gamesWon": 0, "cardDistribution": [0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"name": "John", "id": "2" ,"gamesPlayed": 0, "gamesWon": 0, "cardDistribution": [0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"name": "ANDY", "id": "3", "gamesPlayed": 0, "gamesWon": 0, "cardDistribution": [0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"name": "CHARLIE", "id": "4", "gamesPlayed": 0, "gamesWon": 0, "cardDistribution": [0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]';

let data = JSON.parse(jsonString) as Array<Profile>;
let profileList: ProfileList = new ProfileList(data);
const game = new Game(profileList.getProfile(1) as Profile, profileList.getProfile(2) as Profile, profileList.getProfile(3) as Profile, profileList.getProfile(4) as Profile, 5, 1)
game.addRound(0, 12, 4, 3);
game.addRound(0, 3, 4, 6)
game.addRound(10, 3, 0, 4)
console.log(game.players[0])
game.endGame();
console.log(profileList)
console.log(profileList.getProfile(1)?.cardDistribution)

fs.writeFileSync('./data.txt', JSON.stringify(profileList.profileList))

