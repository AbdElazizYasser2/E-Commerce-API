import dotenv from 'dotenv';
import mongoose from 'mongoose';

import seedUsers from "./user.seeder.ts";
import seedBrands from './brand.seeder.ts';
import seedCategory from './category.seeder.ts';
import seedAddresses from './address.seeder.ts';
import seedCoupons from './coupon.seeder.ts';
import seedProducts from './product.seeder.ts';
import seedReviews from './review.seeder.ts';
import seedShippingMethods from './shippingMethod.seeder.ts';

dotenv.config();

const runSeeders = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
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
    process.exit(0);
  } catch (err) {
    console.log(`Error: ${err}`);
    process.exit(1);
  }
};

runSeeders();