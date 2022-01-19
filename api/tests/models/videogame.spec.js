const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No puede conectarse con la base de datos:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('Debe arrojar error si el nombre es null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('debe funcionar si es un nombre valido', () => {
        Videogame.create({ name: 'Shaun white snowboarding' });
      });
      it('debe arrojar error si la descripcion es null', (done) => {
        Videogame.create({name: 'Shaun white snowboarding'})
        .then(() => done(new Error('Requiere descripcion')))
        .catch(() => done());
      });
    });
  });
});
