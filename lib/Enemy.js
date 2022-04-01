const Potion = require('./Potion');
const Character = require('./Character');

// creates enemy object
function Enemy(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion();

    this.health = Math.floor(Math.random() * 10 + 85);
    this.strength = Math.floor(Math.random() * 5 + 5);
    this.agility = Math.floor(Math.random() * 5 + 5);

    // inhreit prototype methods from character
    Enemy.prototype = Object.create(Character.prototype);

    // returns a description of the enemy
    Enemy.prototype.getDescription = function() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    };
};

module.exports = Enemy;