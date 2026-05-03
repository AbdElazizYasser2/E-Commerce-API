import Coupon from '../models/Coupon.js';

const seedCoupons = async () => {
  try {
    await Coupon.deleteMany();

    await Coupon.create([
      {
        name: "SAVE10",
        type: "percentage",
        discount: 10,
        start_at: new Date(),
        expire_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        is_active: true,
      },
      {
        name: "FLAT50",
        type: "fixed",
        discount: 50,
        start_at: new Date(),
        expire_at: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 
        is_active: true,
      }
    ]);

    console.log('Coupon seeded successfully');
  } catch (err) {
    console.error(`Error seeding coupon: ${ err }`);
    throw err;
  }
}

export default seedCoupons;