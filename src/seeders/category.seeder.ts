import Category from "../modules/categories/category.model.ts";

const seedCategories = async (): Promise<void> => {
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
      },
    ]);
    console.log("Categories seeded successfully");
  } catch (err) {
    console.error(`Error seeding categories: ${err}`);
    throw err;
  }
};

export default seedCategories;