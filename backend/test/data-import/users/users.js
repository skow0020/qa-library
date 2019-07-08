const faker = require('faker');

const usernames = ["Davy Crikey", "Sandy Day Oconner", "Felix Mandelbrot"];

const users = usernames.map((username, index) => ({
  githubName: username,
  githubAvatarUrl: faker.image.imageUrl(),
  email: faker.internet.email(),
  user_id: index + 1000
}));

module.exports = users;