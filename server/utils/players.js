class Players {
    constructor () {
        this.players = [];
    }
    addPlayer(roomID, playerId, name, gameData){
        var player = {roomID, playerId, name, gameData};
        this.players.push(player);
        return player;
    }
    removePlayer(playerId){
        var player = this.getPlayer(playerId);
        
        if(player){
            this.players = this.players.filter((player) => player.playerId !== playerId);
        }
        return player;
    }
    getPlayer(playerId){
        return this.players.filter((player) => player.playerId === playerId)[0]
    }
    getPlayers(roomID){
        return this.players.filter((player) => player.roomID === roomID);
    }
}

module.exports = {Players};