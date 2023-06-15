'use strict';

const { faker } = require("@faker-js/faker");
const penggunas = [];

for (let i = 0; i < 50; i++) {
  const namaDepan = faker.person.firstName();
  const namaBelakang = faker.person.lastName();
  const namaLengkap = `${namaDepan} ${namaBelakang}`;
  const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const generatedStrings = [];
  let apiKey;
  do {
    apiKey = "";
    for (let i = 0; i < 7; i++) {
      apiKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (generatedStrings.includes(apiKey));
  generatedStrings.push(apiKey);

  const height = Math.floor(Math.random() * (200 - 150 + 1)) + 150
  const weight = Math.floor(Math.random() * (150 - 50 + 1)) + 50

  let target = 0
  do{
    target = Math.floor(Math.random() * (160 - 50 + 1)) + 60
  }while(target < weight)

  penggunas.push({
    username: namaLengkap,
    password: '123',
    gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    birth_date: faker.date.birthdate({min: 1990, max:2005}),
    body_weight: weight,
    body_height: height,
    target_weight: target,
    role: faker.helpers.arrayElement(['consultant', 'user']),
    saldo: 0,
    api_hit: 0,
    api_key: apiKey,
    profile_picture: `${namaLengkap}.jpg`,
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
