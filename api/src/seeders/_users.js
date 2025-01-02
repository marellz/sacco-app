import { faker } from "@faker-js/faker";
import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import { ROLE_AUDIT, ROLE_MEMBER, ROLE_ADMIN } from "#enums/user.js";

const appSecret = process.env.APP_SECRET;

const seed = async () => {
  const startAt = performance.now();
  const count = 40;
  // reset db collection
  await UserModel.deleteMany();

  // make sure emails are unique
  const emails = new Set();
  const users = [];

  // common password
  const password = await bcrypt.hash("secret22", 10);

  while (emails.size < count) {
    let email = faker.internet.email();
    if (!emails.has(email)) {
      emails.add(email);

      const _roles = [ROLE_MEMBER, ROLE_ADMIN, ROLE_AUDIT];
      const limit = (min = 1, max = 10) => faker.number.int({ min, max });
      const roles = _roles.splice(0, limit(1, 2));
      const activeRole = roles[0];
      const phoneNumbers = Array(limit(1, 2))
        .fill("")
        .map((i) => faker.phone.number());
      users.push({
        firstName: faker.person.firstName(),
        otherNames: faker.person.lastName(),
        avatar: faker.image.avatar(),
        email,
        password,
        activeRole,
        roles,
        phoneNumbers,
      });
    }
  }

  // add default test.user

  users.unshift({
    firstName: "Dave",
    otherNames: "Tester",
    avatar: faker.image.avatar(),
    email: "dave@test.com",
    password,
    activeRole: "member",
    roles: ["member", "admin"],
    phoneNumbers: ['0712342134', '07351231452'],
  });

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
