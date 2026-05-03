import request from 'supertest';
import server from '../../server.js';
import User from '../../src/models/User.js';

describe('Auth', () => {
  // Register
  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(server)
        .post('/api/v1/auth/register')
        .send({
          first_name: 'Ahmed',
          last_name: 'Mohamed',
          email: 'ahmed@test.com',
          password: '12345678',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.data.email).toBe('ahmed@test.com');
    });

    it('should fail if email already exists', async () => {
      await request(server)
        .post('/api/v1/auth/register')
        .send({
          first_name: 'Ahmed',
          last_name: 'Mohamed',
          email: 'ahmed@test.com',
          password: '12345678',
        });

      const res = await request(server)
        .post('/api/v1/auth/register')
        .send({
          first_name: 'Ahmed',
          last_name: 'Mohamed',
          email: 'ahmed@test.com',
          password: '12345678',
        });

      expect(res.statusCode).toBe(400);
    });

    it('should fail if required fields are missing', async () => {
      const res = await request(server)
        .post('/api/v1/auth/register')
        .send({ email: 'test@test.com' });

      expect(res.statusCode).toBe(400);
    });
  });

  // Login
  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      await User.create({
        first_name: 'Ali',
        last_name: 'Hassan',
        email: 'ali@test.com',
        password: '12345678',
      });
    });

    it('should login with correct credentials', async () => {
      const res = await request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'ali@test.com',
          password: '12345678',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should fail with wrong password', async () => {
      const res = await request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'ali@test.com',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toBe(401);
    });

    it('should fail with wrong email', async () => {
      const res = await request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'wrong@test.com',
          password: '12345678',
        });

      expect(res.statusCode).toBe(401);
    });
  });
});