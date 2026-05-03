## 📁 Project Structure

```
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth/
│   │   │   ├── AuthenticatedSession.controller.js
│   │   │   ├── RegisteredUser.controller.js
│   │   │   ├── PasswordResetLink.controller.js
│   │   │   ├── PasswordUpdate.controller.js
│   │   │   └── ProfileUpdate.controller.js
│   │   ├── brand.controller.js
│   │   ├── category.controller.js
│   │   ├── product.controller.js
│   │   ├── order.controller.js
│   │   ├── cart.controller.js
│   │   ├── wishlist.controller.js
│   │   ├── review.controller.js
│   │   ├── coupon.controller.js
│   │   ├── address.controller.js
│   │   ├── shippingMethod.controller.js
│   │   └── transaction.controller.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   ├── imageProcessingMiddleware.js
│   │   ├── rateLimitMiddleware.js
│   │   └── loggerMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Cart.js
│   │   ├── Wishlist.js
│   │   ├── Review.js
│   │   ├── Coupon.js
│   │   ├── Category.js
│   │   ├── Brand.js
│   │   ├── Address.js
│   │   ├── ShippingMethod.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── user.route.js
│   │   ├── product.route.js
│   │   ├── order.route.js
│   │   ├── cart.route.js
│   │   ├── wishlist.route.js
│   │   ├── review.route.js
│   │   ├── coupon.route.js
│   │   ├── category.route.js
│   │   ├── brand.route.js
│   │   ├── address.route.js
│   │   ├── shippingMethod.route.js
│   │   └── transaction.route.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   └── ApiFeatures.js
│   └── validators/
├── seeders/
├── tests/
│   ├── integration/
│   │   ├── auth.test.js
│   │   ├── product.test.js
│   │   └── order.test.js
│   └── setup.js
├── uploads/
│   ├── brands/
│   ├── categories/
│   ├── products/
│   └── users/
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

---
