const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Recipe = require('../lib/models/recipe');
const Log = require('../lib/models/log');

describe('recipe-lab routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a recipe', () => {
    return request(app)
      .post('/api/v1/recipes')
      .send({
        name: 'cookies',
        directions: [
          'preheat oven to 375',
          'mix ingredients',
          'put dough on cookie sheet',
          'bake for 10 minutes'
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ]
        });
      });
  });

  it('gets all recipes', async() => {
    const recipes = await Promise.all([
      { name: 'cookies', directions: [] },
      { name: 'cake', directions: [] },
      { name: 'pie', directions: [] }
    ].map(recipe => Recipe.insert(recipe)));

    return request(app)
      .get('/api/v1/recipes')
      .then(res => {
        recipes.forEach(recipe => {
          expect(res.body).toContainEqual(recipe);
        });
      });
  });

  it('updates a recipe by id', async() => {
    const recipe = await Recipe.insert({
      name: 'cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
    });

    return request(app)
      .put(`/api/v1/recipes/${recipe.id}`)
      .send({
        name: 'good cookies',
        directions: [
          'preheat oven to 375',
          'mix ingredients',
          'put dough on cookie sheet',
          'bake for 10 minutes'
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'good cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ]
        });
      });
  });

  it('finds a recipe by id', async() => {
    const recipeData = {
      name: 'cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
    };

    const recipe = await Recipe.insert(recipeData);

    return request(app)
      .get(`/api/v1/recipes/${recipe.id}`)
      .then(res => {
        expect(res.body).toEqual({ id: expect.any(String), ...recipeData });
      });
  });

  it('deletes a recipe', async() => {
    const recipeData = {
      name: 'cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
    };

    const recipe = await Recipe.insert(recipeData);

    return request(app)
      .delete(`/api/v1/recipes/${recipe.id}`)
      .then(res => {
        expect(res.body).toEqual({ id: expect.any(String), ...recipeData });
      });
  });
});

describe('log routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new log', () => {
    const logData = {
      recipeId: '1',
      dateOfEvent: '11-26-20',
      notes: 'Pull the turkey earlier',
      rating: '8/10'
    };

    return request(app)
      .post('/api/v1/logs')
      .send(logData)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          ...logData
        });
      });
  });

  it('gets all logs', async() => {
    const logs = await Promise.all([
      { recipeId: '1', dateOfEvent: '11-26-20', notes: 'Pull the turkey earlier', rating: '8/10' },
      { recipeId: '2', dateOfEvent: '01-01-01', notes: 'This was a long time ago', rating: '8/8' }
    ].map(log => Log.insert(log)));

    return request(app)
      .get('/api/v1/logs')
      .then(res => {
        logs.forEach(log => {
          expect(res.body).toContainEqual(log);
        });
      });
  });

  it('finds a log by id', async() => {
    const logData = {
      recipeId: '1',
      dateOfEvent: '11-26-20',
      notes: 'Pull the turkey earlier',
      rating: '8/10'
    };

    const log = await Log.insert(logData);

    return request(app)
      .get(`/api/v1/logs/${log.id}`)
      .then(res => {
        expect(res.body).toEqual({ id: expect.any(String), ...logData });
      });
  });

  it('updates a log', async() => {

  });

  it('deletes a log', async() => {

  });
});
