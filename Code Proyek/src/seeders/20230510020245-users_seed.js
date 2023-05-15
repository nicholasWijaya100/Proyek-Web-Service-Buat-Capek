'use strict';

const { faker } = require("@faker-js/faker");
const penggunas = [];

for (let i = 0; i < 100; i++) {
  const namaDepan = faker.name.firstName();
  const namaBelakang = faker.name.lastName();
  const namaLengkap = `${namaDepan} ${namaBelakang}`;
  const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const generatedStrings = [];
  let pass;
  do {
    pass = "";
    for (let i = 0; i < 7; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (generatedStrings.includes(pass));
  generatedStrings.push(pass);

  const height = Math.floor(Math.random() * (200 - 150 + 1)) + 150

  let target = 0
  do{
    target = Math.floor(Math.random() * (200 - 150 + 1)) + 150
  }while(target < height && target != height)

  penggunas.push({
    username: namaLengkap,
    password: pass,
    gender: faker.helpers.arrayElement(['P', 'L']),
    birthdate: faker.date.birthdate({min: 1990, max:2005}),
    body_weight: Math.floor(Math.random() * (150 - 50 + 1)) + 50,
    body_height: height,
    target_height: target,
    is_vegetarian: faker.helpers.arrayElement(['Y', 'N']),
    profile_picture: 'a',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", penggunas);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, { truncate: true });
  }
};
