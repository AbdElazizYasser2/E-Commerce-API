import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Brand from '../models/Brand.js';

const seedProducts = async () => {
  try {
    await Product.deleteMany();

    const categories = await Category.find();
    const brands = await Brand.find();
    
    await Product.create([
      {
        name: "iPhone 15 Pro",
        description: "Latest Apple iPhone with A17 Pro chip and titanium design",
        price: 45000,
        compare_price: 50000,
        quantity: 100,
        image: "iphone15pro.png",
        category: categories[0]._id,
        brand: brands[0]._id,
        is_featured: true,
        sku: "APL-IPH15P",
      },
      {
        name: "Samsung Galaxy S24",
        description: "Samsung flagship phone with AI features and stunning display",
        price: 38000,
        compare_price: 42000,
        quantity: 80,
        image: "galaxys24.png",
        category: categories[0]._id,
        brand: brands[1]._id,
        is_featured: true,
        sku: "SAM-GS24",
      }
    ]);

    console.log('Products seeded successfully');
  } catch (err) {
    console.error(`Error seeding product: ${ err }`);
    throw err;
  }
}

export default seedProducts;