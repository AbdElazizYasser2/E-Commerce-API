import User from '../modules/users/user.model.ts';

interface UserSeed {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const seedUsers = async (): Promise<void> => {
  try {
    await User.deleteMany();

    const users: UserSeed[] = [
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
    ];

    await User.insertMany(users);
    console.log('User Seeded Successfully');
  } catch (err) {
    console.error(`Error seeding users: ${err}`);
    throw err;
  }
};

export default seedUsers;