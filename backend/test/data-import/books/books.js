const faker = require('faker');
const data = require('../../data.json');

const categories = ["General", "UI Automation", "DevOps"];
const languages = ["Python", "CSharp", "Ruby"];
const titles = ["How to Save a bear from a cricket", "Contemplating the tortiose", "Into the wildebeest den"];
let books = [];

const group1 = categories.map((category, index) => ({
  backgroundImage: data.backgroundImage,
  author: faker.name.findName(),
  category: category,
  language: data.language,
  url: data.url,
  title: data.title,
  pdf: data.pdf,
  body: faker.lorem.sentences(2),
  book_id: index + 1000
}));

const group2 = languages.map((language, index) => ({
  backgroundImage: data.backgroundImage,
  author: faker.name.findName(),
  category: data.category,
  language: language,
  url: data.url,
  title: data.title,
  pdf: data.pdf,
  body: faker.lorem.sentences(2),
  book_id: index + 2000
}));

const group3 = titles.map((title, index) => ({
  backgroundImage: data.backgroundImage,
  author: faker.name.findName(),
  category: data.category,
  language: data.language,
  url: data.url,
  title: title,
  pdf: data.pdf,
  body: faker.lorem.sentences(2),
  book_id: index + 3000
}));

books = group1.concat(group2).concat(group3);
module.exports = books;