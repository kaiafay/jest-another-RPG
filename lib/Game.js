const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

// create game object
function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;

    // initializes the game
    Game.prototype.initializeGame = function() {
        this.enemies.push(new Enemy('goblin', 'sword'));
        this.enemies.push(new Enemy('orc', 'baseball bat'));
        this.enemies.push(new Enemy('skeleton', 'axe'));

        // tracks which enemy object is currently fighting
        this.currentEnemy = this.enemies[0];

        // prompt user for their name
        inquirer.prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
            // destructure name from the prompt object
        }).then(({ name }) => {
            this.player = new Player(name);

            // starts new battle round
            this.startNewBattle();
        });
    };
};

module.exports = Game;