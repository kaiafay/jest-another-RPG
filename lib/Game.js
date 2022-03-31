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

            // calls start new battle method
            this.startNewBattle();
        });
    };

    // starts the next battle round
    Game.prototype.startNewBattle = function() {
        if(this.player.agility > this.currentEnemy.agility) {
            this.isPlayerTurn = true;
        } else {
            this.isPlayerTurn = false;
        }

        // prints player's stats to the console in a nice table
        console.log("Your stats are as follows:");
        console.table(this.player.getStats());

        // prints a description of the enemy
        console.log(this.currentEnemy.getDescription());

        // calls battle method
        this.battle();
    };

};

module.exports = Game;