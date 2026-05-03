import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedUsers from "./user.seeder.js";
import seedBrands from './brand.seeder.js';
import seedCategory from './category.seeder.js';
import seedAddresses from './Address.seeder.js';
import seedCoupons from './coupon.seeder.js';
import seedProducts from './product.seeder.js';
import seedReviews from './review.seeder.js';
import seedShippingMethods from './shippingMethod.seeder.js';

dotenv.config();

const runSeeders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Seeding Started');

    await seedUsers();
    await seedBrands();
    await seedCategory();
    await seedProducts();
    await seedAddresses();
    await seedCoupons();
    await seedReviews();
    await seedShippingMethods();

    console.log('All Seeders Done');
    await mongoose.disconnect();
    process.exit();
  } catch (err) {
    console.log(`Error: ${ err }`);
    process.exit(1);
  }
}
runSeeders();