/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
});
describe('GET /recipes/:id', () => {
    
  it('should respond a recipe with the id and the correct title',()=>{
    return agent.get("/recipes/716381")
    .then(res => {
      expect(res.body.name).to.equal('Nigerian Snail Stew')
    })
  })
  it('should respond a recipe with the id and the correct title',()=>{
    return agent.get("/recipes/716426")
    .then(res => {
      expect(res.body.name).to.equal("Cauliflower, Brown Rice, and Vegetable Fried Rice")
    })
  })
  });