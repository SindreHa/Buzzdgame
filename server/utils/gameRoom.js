class GameRoom {
    constructor () {
        this.games = [];
    }
    addGame(gameID, gameType){
        var game = {gameID, gameType};
        this.games.push(game);
        return game;
    }
    removeGame(gameID){
        var game = this.getGame(gameID);
        
        if(game){
            this.games = this.games.filter((game) => game.gameID !== gameID);
        }
        return game;
    }
    getGame(gameID){
        return this.games.filter((game) => game.gameID === gameID)[0]
    }
}

module.exports = {GameRoom};