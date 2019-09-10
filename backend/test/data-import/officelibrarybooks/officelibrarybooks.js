const faker = require('faker');
const data = require('../../data.json');

const categories = ["General", "UI Automation", "DeVops"];
const titles = ["How to Save a bear from a cricket", "Contemplating the tortiose", "Into the wildebeest den"];
let officeBooks = [];

const group1 = categories.map((category, index) => ({
  backgroundImage: data.backgroundImage,
  totalCopies: 5,
  copiesCheckedOut: 3,
  users: ["Hubert Farnsworth", "Dwight Schrute", "Hans Moleman"],
  author: faker.name.findName(),
  category: category,
  title: data.title,
  body: faker.lorem.sentences(2),
  office_book_id: index + 1000
}));

const group2 = titles.map((title, index) => ({
  backgroundImage: data.backgroundImage,
  totalCopies: 7,
  copiesCheckedOut: 0,
  users: [],
  author: faker.name.findName(),
  category: data.category,
  title: title,
  body: faker.lorem.sentences(2),
  office_book_id: index + 2000
}));

officeBooks = group1.concat(group2);
module.exports = officeBooks;