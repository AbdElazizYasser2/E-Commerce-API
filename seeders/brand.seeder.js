import Brand from '../models/Brand.js';

const seedBrands = async () => {
  try {
    await Brand.deleteMany();

    await Brand.create([
      {
        name: "Apple",
        logo: "apple.png"
      },
      {
        name: "Samsung",
        logo: "samsung.png"
      }
    ]);

    console.log('Brand Seeded Successfully');
  } catch (err) {
    console.error(`Error seeding brands: ${ err }`);
    throw err;
  }
}

export default seedBrands; 