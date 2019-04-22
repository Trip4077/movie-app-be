const request = require('supertest');
const server = require('./server');

describe('SERVER', () => {
    describe('Environment', () => {
        it('should set test environment', () => {
            const env = process.env.DB_CONNECT;

            expect(env).toBe('testing');
        });
    });
});