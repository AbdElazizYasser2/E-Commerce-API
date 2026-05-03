import User from '../models/User.js';

const seedUsers = async () => {
  try {
    await User.deleteMany();
    
    await User.insertMany([
      {
        first_name: "Abdelaziz",
        last_name: "Yasser",
        email: "abdelaziz@test.com",
        password: "12345678"
      },
      {
        first_name: "Ahmed",
        last_name: "Mohamed",
        email: "ahmed@test.com",
        password: "12345678"
      }      
    ]);

    console.log('User Seeded Successfully');
  } catch (err) {
    console.error(`Error seeding users: ${ err }`);
    throw err;
  }
}

export default seedUsers;