import request from 'supertest';
import server from '../../server.js';
import User from '../../src/models/User.js';
import Product from '../../src/models/Product.js';
import Category from '../../src/models/Category.js';
import Cart from '../../src/models/Cart.js';
import Order from '../../src/models/Order.js';

let adminToken;
let userToken;
let productId;
let categoryId;
let orderId;

describe('Orders', () => {
  beforeAll(async () => {
    await User.create({
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@test.com',
      password: '12345678',
      role: 'admin',
    });

    const adminRes = await request(server)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@test.com', password: '12345678' });
    adminToken = adminRes.body.token;

    await User.create({
      first_name: 'Customer',
      last_name: 'User',
      email: 'customer@test.com',
      password: '12345678',
      role: 'customer',
    });

    const userRes = await request(server)
      .post('/api/v1/auth/login')
      .send({ email: 'customer@test.com', password: '12345678' });
    userToken = userRes.body.token;

    const category = await Category.create({ name: 'Electronics' });
    categoryId = category._id;

    const product = await Product.create({
      name: 'iPhone 15 Pro',
      description: 'Latest Apple iPhone with A17 Pro chip and titanium design',
      price: 45000,
      quantity: 100,
      image: 'iphone15pro.png',
      category: categoryId,
      sku: 'APL-IPH15P',
    });
    productId = product._id;
  });

  afterAll(async () => {
    await Order.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();
  });

  // Create Order
  describe('POST /api/v1/orders/cash', () => {
    beforeEach(async () => {
      // Create cart for customer
      await Cart.create({
        user: (await User.findOne({ email: 'customer@test.com' }))._id,
        cartItems: [
          {
            product: productId,
            quantity: 2,
            price: 45000,
          }
        ],
        totalCartPrice: 90000,
      });
    });

    it('should create a cash order', async () => {
      const res = await request(server)
        .post('/api/v1/payments/cash')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          shippingAddress: {
            details: '123 Tahrir St',
            phone: '01012345678',
            city: 'Cairo',
            postalCode: '11511',
          }
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.data.paymentMethodType).toBe('cash');
      expect(res.body.data.payment_status).toBe('pending');
      orderId = res.body.data._id;
    });

    it('should fail if no cart found', async () => {
      await Cart.deleteMany();

      const res = await request(server)
        .post('/api/v1/payments/cash')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          shippingAddress: {
            details: '123 Tahrir St',
            phone: '01012345678',
            city: 'Cairo',
            postalCode: '11511',
          }
        });

      expect(res.statusCode).toBe(404);
    });

    it('should fail if not logged in', async () => {
      const res = await request(server)
        .post('/api/v1/payments/cash')
        .send({
          shippingAddress: {
            details: '123 Tahrir St',
            phone: '01012345678',
            city: 'Cairo',
            postalCode: '11511',
          }
        });

      expect(res.statusCode).toBe(401);
    });
  });

  // Get All Orders
  describe('GET /api/v1/orders', () => {
    it('should get all orders as admin', async () => {
      const res = await request(server)
        .get('/api/v1/orders')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data');
    });

    it('should fail if not admin', async () => {
      const res = await request(server)
        .get('/api/v1/orders')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(403);
    });
  });

  // Get Single Order
  describe('GET /api/v1/orders/:id', () => {
    it('should get a single order', async () => {
      const res = await request(server)
        .get(`/api/v1/orders/${orderId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data._id).toBe(orderId.toString());
    });

    it('should fail with invalid id', async () => {
      const res = await request(server)
        .get('/api/v1/orders/invalidid')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(400);
    });
  });

  // Update Order Status
  describe('PUT /api/v1/orders/:id', () => {
    it('should update order status as admin', async () => {
      const res = await request(server)
        .put(`/api/v1/orders/${orderId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'processing' });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.status).toBe('processing');
    });

    it('should fail if not admin', async () => {
      const res = await request(server)
        .put(`/api/v1/orders/${orderId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ status: 'processing' });

      expect(res.statusCode).toBe(403);
    });
  });
});