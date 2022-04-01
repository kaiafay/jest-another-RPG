const Potion = require('./Potion');
const Character = require('./Character');

// creates enemy object
class Enemy extends Character {
    constructor(name, weapon) {
      super(name);
  
      this.weapon = weapon;
      this.potion = new Potion();
    };
  
    // gets description of the enemy
    getDescription() {
      return `A ${this.name} holding a ${this.weapon} has appeared!`;
    };
  };
  
  module.exports = Enemy;