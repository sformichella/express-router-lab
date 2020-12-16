const pool = require('../utils/pool');

module.exports = class Log {
  id;
  recipeId;
  dateOfEvent;
  notes;
  rating;

  constructor({ id, recipe_id, date_of_event, notes, rating }) {
    this.id = id;
    this.recipeId = recipe_id;
    this.dateOfEvent = date_of_event;
    this.notes = notes;
    this.rating = rating;
  }

  static async insert({ recipeId, dateOfEvent, notes, rating }) {
    const { rows } = await pool.query(`
      INSERT INTO logs (recipe_id, date_of_event, notes, rating)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [recipeId, dateOfEvent, notes, rating]
    );

    return new Log(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
      SELECT * FROM logs
    `);

    return rows.map(log => new Log(log));
  }
};
