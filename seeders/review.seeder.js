import Review from '../models/Review.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

const seedReviews = async () => {
  try {
    await Review.deleteMany();

    const users = await User.find();
    const products = await Product.find();

    await Review.create([
      {
        title: "Great product!",
        rating: 5,
        user: users[0]._id,
        product: products[0]._id,
      },
      {
        title: "Good value",
        rating: 4,
        user: users[1]._id,
        product: products[0]._id,
      }
    ]);

    console.log('Reviews Seeded Successfully');
  } catch (err) {
    console.error(`Error seeding reviews: ${err}`);
    throw err;
  }
}

export default seedReviews;