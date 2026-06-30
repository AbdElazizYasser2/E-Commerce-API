import Review from "../modules/reviews/review.model.ts";
import User from "../modules/users/user.model.ts";
import Product from "../modules/products/product.model.ts";

const seedReviews = async (): Promise<void> => {
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
      },
    ]);

    console.log("Reviews seeded successfully");
  } catch (err) {
    console.error(`Error seeding reviews: ${err}`);
    throw err;
  }
};

export default seedReviews;