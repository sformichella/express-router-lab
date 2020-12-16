const pool = require('../utils/pool');

module.exports = class Log {
  id;
  recipeId;
  dateOfEvent;
  notes;
  rating;

  constructor({ id, recipeId, dateOfEvent, notes, rating }) {
    this.id = id;
    this.recipeId = recipeId;
    this.dateOfEvent = dateOfEvent;
    this.notes = notes;
    this.rating = rating;
  }


};
