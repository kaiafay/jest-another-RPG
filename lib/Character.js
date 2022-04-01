// create character class
class Character {
    // sets name, health, strength, and agility 
    constructor(name = '') {
      this.name = name;
      this.health = Math.floor(Math.random() * 10 + 95);
      this.strength = Math.floor(Math.random() * 5 + 7);
      this.agility = Math.floor(Math.random() * 5 + 7);
    }
  
    // checks to see if character is still alive
    isAlive() {
      if (this.health === 0) {
        return false;
      }
      return true;
    }
  
    // gets the health of the character
    getHealth() {
      return `${this.name}'s health is now ${this.health}!`;
    }
  
    // gets the attack value of the character
    getAttackValue() {
      const min = this.strength - 5;
      const max = this.strength + 5;
  
      return Math.floor(Math.random() * (max - min) + min);
    }
  
    // reduces the health of the character
    reduceHealth(health) {
      this.health -= health;
  
      if (this.health < 0) {
        this.health = 0;
      }
    };
  };
  
  module.exports = Character;