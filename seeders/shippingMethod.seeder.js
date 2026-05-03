import ShippingMethod from '../models/ShippingMethod.js';

const seedShippingMethods = async () => {
  try {
    await ShippingMethod.deleteMany();

    await ShippingMethod.create([
      {
        name: "Standard Shipping",
        description: "Regular delivery service",
        cost: 30,
        free_shipping_threshold: 500,
        estimated_days_min: 3,
        estimated_days_max: 5,
        is_active: true,
      },
      {
        name: "Express Shipping",
        description: "Fast delivery service",
        cost: 60,
        estimated_days_min: 1,
        estimated_days_max: 2,
        is_active: true,
      },
      {
        name: "Free Shipping",
        description: "Free delivery on all orders",
        cost: 0,
        estimated_days_min: 5,
        estimated_days_max: 7,
        is_active: true,
      }
    ]);

    console.log('Shipping Methods Seeded Successfully');
  } catch (err) {
    console.error(`Error seeding shipping methods: ${err}`);
    throw err;
  }
}

export default seedShippingMethods;