module.exports = class AdminClass {
    constructor() {
        this.users = require('./users.class.js');
        this.lives = require('./lives.class.js');
        this.bandTags = require('./bandTags.class.js');
        this.purchaseHistory = require('./purchaseHistory.class.js');
    }

   async getPremiumUsers() {
    return await this.users.getPremuimUsers();
   }
}