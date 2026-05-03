import Category from '../models/Category.js';

const seedCategory = async () => {
  try {
    await Category.deleteMany();
    await Category.create([
      {
        name: "Electronics",
        description: "Electronic devices and accessories",
        order: 1,
        is_featured: true,
      },
      {
        name: "Clothing",
        description: "Men and women clothing",
        order: 2,
        is_featured: true,
      },
      {
        name: "Home & Kitchen",
        description: "Home appliances and kitchen tools",
        order: 3,
      }
    ]);

    console.log('Category Seeded successfully');
  } catch (err) {
    console.error(`Error seeding categories: ${ err }`);
    throw err;
  }
}
export default seedCategory;
