import request from 'supertest';
import server from '../../server.js';
import User from '../../src/models/User.js';
import Product from '../../src/models/Product.js';
import Category from '../../src/models/Category.js';
import Brand from '../../src/models/Brand.js';

let adminToken;
let categoryId;
let brandId;
let productId;

describe('Products', () => {
  beforeAll(async () => {
    const admin = await User.create({
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@test.com',
      password: '12345678',
      role: 'admin',
    });

    const res = await request(server)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@test.com', password: '12345678' });

    adminToken = res.body.token;

    const category = await Category.create({
      name: 'Electronics',
    });
    categoryId = category._id;

    const brand = await Brand.create({
      name: 'Apple',
    });
    brandId = brand._id;
  });

  afterAll(async () => {
    await Product.deleteMany();
    await Category.deleteMany();
    await Brand.deleteMany();
    await User.deleteMany();
  });

  // Create Product
  describe('POST /api/v1/products', () => {
    it('should create a new product', async () => {
      const res = await request(server)
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'iPhone 15 Pro',
          description: 'Latest Apple iPhone with A17 Pro chip and titanium design',
          price: 45000,
          quantity: 100,
          image: 'iphone15pro.png',
          category: categoryId,
          brand: brandId,
          sku: 'APL-IPH15P',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.data.name).toBe('iPhone 15 Pro');
      productId = res.body.data._id;
    });

    it('should fail if not admin', async () => {
      const res = await request(server)
        .post('/api/v1/products')
        .send({
          name: 'iPhone 15 Pro',
          description: 'Latest Apple iPhone with A17 Pro chip and titanium design',
          price: 45000,
          quantity: 100,
          image: 'iphone15pro.png',
          category: categoryId,
        });

      expect(res.statusCode).toBe(401);
    });

    it('should fail if required fields are missing', async () => {
      const res = await request(server)
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'iPhone 15 Pro' });

      expect(res.statusCode).toBe(400);
    });
  });

  // Get All Products
  describe('GET /api/v1/products', () => {
    it('should get all products', async () => {
      const res = await request(server).get('/api/v1/products');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('pagination');
    });

    it('should filter products by price', async () => {
      const res = await request(server)
        .get('/api/v1/products?price[gte]=1000&price[lte]=50000');

      expect(res.statusCode).toBe(200);
    });

    it('should search products by keyword', async () => {
      const res = await request(server)
        .get('/api/v1/products?keyword=iPhone');

      expect(res.statusCode).toBe(200);
    });
  });

  // Get Single Product
  describe('GET /api/v1/products/:id', () => {
    it('should get a single product', async () => {
      const res = await request(server).get(`/api/v1/products/${productId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data._id).toBe(productId.toString());
    });

    it('should fail with invalid id', async () => {
      const res = await request(server).get('/api/v1/products/invalidid');

      expect(res.statusCode).toBe(400);
    });
  });

  // Update Product
  describe('PUT /api/v1/products/:id', () => {
    it('should update a product', async () => {
      const res = await request(server)
        .put(`/api/v1/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 40000 });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.price).toBe(40000);
    });

    it('should fail if not admin', async () => {
      const res = await request(server)
        .put(`/api/v1/products/${productId}`)
        .send({ price: 40000 });

      expect(res.statusCode).toBe(401);
    });
  });

  // Delete Product
  describe('DELETE /api/v1/products/:id', () => {
    it('should delete a product', async () => {
      const res = await request(server)
        .delete(`/api/v1/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(204);
    });

    it('should fail if not admin', async () => {
      const res = await request(server)
        .delete(`/api/v1/products/${productId}`);

      expect(res.statusCode).toBe(401);
    });
  });
});