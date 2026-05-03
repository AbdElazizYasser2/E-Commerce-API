import Address from '../models/Address.js';
import User from '../models/User.js';

const seedAddresses = async () => {
  try {
    await Address.deleteMany();
    const user = User.find();

    await Address.create([
      {
        user: users[0]._id,
        first_name: "Ahmed",
        last_name: "Mohamed",
        phone: "01012345678",
        address_line1: "123 Tahrir St",
        city: "Cairo",
        postal_code: "11511",
        country: "Egypt",
        is_default: true,
      },
      {
        user: users[1]._id,
        first_name: "Ali",
        last_name: "Hassan",
        phone: "01098765432",
        address_line1: "456 Nile St",
        city: "Giza",
        postal_code: "12611",
        country: "Egypt",
        is_default: true,
      }
    ]);

    console.log(`Addresses seeded successfully`);
  } catch (err) {
    console.error(`Error seeding addresses: ${ err }`);
    throw err;
  }
}

export default seedAddresses;