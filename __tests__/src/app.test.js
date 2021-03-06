'use strict';

// dynamic? Maybe put this in an array an repeat all tests ...
process.env.STORAGE = 'mongo';

// Mock mongoose
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
let mongoServer;

// Unmock our model (might have been mocked by a previous test)
jest.unmock('require-directory');

// Mock Server
const {server} = require('../../src/app.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, (err) => {
    if (err) console.error('Mongo Connection Error', err);
  });
});

afterAll(() => {
  mongoose.disconnect();
  mongoServer.stop();
});

describe('api server', () => {

  it('should respond with a 500 on an invalid model', () => {

    return mockRequest
      .get('/booboo')
      .then(results => {
        expect(results.status).toBe(404);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });

  });

  it('should respond with a 404 on an invalid method', () => {

    return mockRequest
      .post('/api/v1/foo/12')
      .then(results => {
        expect(results.status).toBe(404);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });

  });

  it('should respond properly on a get request to a valid model', () => {

    return mockRequest
      .get('/api/v1/categories')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });

  });

  it('should be able to post to /api/v1/categories', ()  => {

    let obj = {title:'test',text:'foo'};

    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.title).toEqual(obj.title);
      })
      .catch( err => console.error('err', err) );

  });


  it('following a post, should find a single record', () => {

    let obj = {title:'test',text:'foo'};

    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(results => {
        return mockRequest.get(`/api/v1/categories/${results.body._id}`)
          .then(list => {
            expect(list.body[0].title).toEqual(obj.title);
            expect(list.status).toBe(200);
          });
      })
      .catch( err => console.error('err', err) );

  });

  it('following multiple posts, should return the correct count', () => {

    return mockRequest
      .get('/api/v1/categories')
      .then(results => {
        expect(results.body.count).toEqual(2);
        expect(results.status).toBe(200);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });

  });

});
