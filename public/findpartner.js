
var selectOccupation = document.getElementById('occupation');
var selectFavoriteGame = document.getElementById('favorite-game');

async function init(){
    // here be fetch/api call
    // var user = await fetch('/api/user')
    var user = {
        email: 'some@email.com',
        occupation: 'CS',
        favoriteGame: 'Chess'
    };
    selectOccupation.value = user.occupation;
    selectFavoriteGame.value = user.favoriteGame;

};
init();
