import { faker } from "@faker-js/faker";
import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";


const seed = async () => {
  const startAt = performance.now();
  const count = 100;
  // reset db collection
  await UserModel.deleteMany();

  // make sure emails are unique
  const emails = new Set();
  const users = [];

  // common password
  const password = await bcrypt.hash("secret", 10);

  while (emails.size < count) {
    let email = faker.internet.email();
    if (!emails.has(email)) {
      emails.add(email);
      users.push({
        avatar: faker.image.avatar(),
        email,
        password,
        name: [faker.person.firstName(), faker.person.lastName()].join(" "),
      });
    } else {
      console.log("unique at ", emails.size);
    }
  }

  try {
    const batchSize = 20;

    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      await UserModel.insertMany(batch);
    }
  } catch (error) {
    console.error(error);
    throw "Unable to seed users;";
  } finally {
    const endAt = performance.now();

    console.log(`Time: ${Math.floor(endAt - startAt) / 1000}s`);
  }
};

export default seed;
