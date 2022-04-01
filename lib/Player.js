const Potion = require('../lib/Potion');
const Character = require('./Character');

// creates player object
function Player(name = '') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
    this.inventory = [new Potion('health'), new Potion()];

    // inhreit prototype methods from character
    Player.prototype = Object.create(Character.prototype);

    // returns an object with various player properties
    Player.prototype.getStats = function() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };

    // returns the inventory array or false if empty
    Player.prototype.getInventory = function() {
        if(this.inventory.length) {
            return this.inventory;
        }
        return false;
    };

    // adds potion to player's inventory
    Player.prototype.addPotion = function(potion) {
        this.inventory.push(potion);
    };

    // updates stats and inventory when player uses a potion
    Player.prototype.usePotion = function(index) {
        const potion = this.getInventory().splice(index, 1)[0];

        switch(potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    };
};

module.exports = Player;