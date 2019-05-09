require('dotenv').config();

const knex = require('knex');
const config = require('../../knexfile');

const dbEnv = process.env.DB_ENV || 'development';

const db = knex(config[dbEnv]);

const request = require('supertest');
const server = '../../server';

beforeEach(() => {
    return db('favorites').truncate();
});

describe('FAVORITES', () => {
    describe('GET', () => {
       it('/api/favorites should return list of all favorites',  async () => {
           const res = await request(server).get('/');

           expect(res.body).toEqual([]);
       });
    });
});