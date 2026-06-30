import Brand from "../modules/brands/brand.model.ts";

const seedBrands = async (): Promise<void> => {
  try {
    await Brand.deleteMany();
    await Brand.create([
      {
        name: "Apple",
        logo: "apple.png",
      },
      {
        name: "Samsung",
        logo: "samsung.png",
      },
    ]);
    console.log("Brands seeded successfully");
  } catch (err) {
    console.error(`Error seeding brands: ${err}`);
    throw err;
  }
};

export default seedBrands;