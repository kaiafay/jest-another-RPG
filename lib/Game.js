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

    // battle between player and enemy
    Game.prototype.battle = function() {
        if(this.isPlayerTurn) {
            // prompt player for action choices
            inquirer.prompt({
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Attack', 'Use potion']
            }).then(( {action} ) => {
                if(action === 'Use potion') {
                    // check to see if inventory is empty
                    if(!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return;
                    } 
                    
                    // prompt user to select a potion
                    inquirer.prompt({
                        type: 'list',
                        name: 'action',
                        message: 'Which potion would you like to use?',
                        // map over inventory and display potions in a list
                        choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                    // desctructure action from the prompt object
                    }).then (({ action }) => {
                        // set potionDetails variable to the index and potion name by splitting
                        const potionDetails = action.split(': ');

                        // subtract one from the index to get the original array index
                        this.player.usePotion(potionDetails[0] - 1);
                        console.log(`You used a ${potionDetails[1]} potion.`);
                    });
                } else {
                    // set damage variable to player's attack value
                    const damage = this.player.getAttackValue();
                    // reduce enemy's health by damage amount
                    this.currentEnemy.reduceHealth(damage);

                    // print attack and enemy's remaining health
                    console.log(`You attacked the ${this.currentEnemy.name}!`);
                    console.log(this.currentEnemy.getHealth());
                }
            });
        } else {
            // set damage variable to enemy's attack value
            const damage = this.currentEnemy.getAttackValue();
            // reduce player's health by damage amount
            this.player.reduceHealth(damage);

            // print attack and player's remaining health
            console.log(`You were attacked by the ${this.currentEnemy.name}!`);
            console.log(this.player.getHealth());
        }
    }

};

module.exports = Game;