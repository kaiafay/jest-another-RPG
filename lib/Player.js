const Potion = require('../lib/Potion');
const Character = require('./Character');

// creates player object
class Player extends Character {
    constructor(name = '') {
      super(name);
  
      this.inventory = [new Potion('health'), new Potion()];
    }
  
    // gets player's stats
    getStats() {
      return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
      };
    }
  
    // gets player's inventory
    getInventory() {
      if (this.inventory.length) {
        return this.inventory;
      }
      return false;
    }
  
    // adds potion to player's inventory
    addPotion(potion) {
      this.inventory.push(potion);
    }
  
    // uses potion
    usePotion(index) {
      const potion = this.inventory.splice(index, 1)[0];
  
      switch (potion.name) {
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