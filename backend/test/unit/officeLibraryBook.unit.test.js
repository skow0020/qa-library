const OfficeLibraryBook = require('../../models/officeLibraryBook');
const expect = require('chai').expect;
const data = require('../data.json');

describe('OfficeLibraryBook Tests', () => {
  it('verify required office library book attributes', (done) => {
    const officeLibraryBook = new OfficeLibraryBook();

    officeLibraryBook.validate(err => {
      expect(err.errors.title).to.exist;
      expect(err.errors.author).to.exist;
      expect(err.errors.backgroundImage).to.exist;
      expect(err.errors.category).to.exist;
      expect(err.errors.totalCopies).to.exist;
      expect(err.errors.body).to.not.exist;
      expect(err.errors.users).to.not.exist;
      expect(err.errors.copiesCheckedOut).to.not.exist;
      done();
    });
  });

  it('officeLibraryBook object creation', (done) => {
    const officeLibraryBook = new OfficeLibraryBook({
      title: data.title,
      author: data.author,
      category: data.category,
      totalCopies: 5,
      body: data.body,
      users: ["stan", "sylvie", "adolf"],
      copiesCheckedOut: 2,
      backgroundImage: data.backgroundImage
    });

    officeLibraryBook.validate(err => {
      expect(err === null);
    });

    expect(officeLibraryBook.title).to.equal(data.title);
    expect(officeLibraryBook.author).to.equal(data.author);
    expect(officeLibraryBook.category).to.equal(data.category);
    expect(officeLibraryBook.totalCopies).to.equal(5);
    expect(officeLibraryBook.body).to.equal(data.body);
    expect(officeLibraryBook.users[0]).to.eql('stan');
    expect(officeLibraryBook.copiesCheckedOut).to.equal(2);
    expect(officeLibraryBook.backgroundImage).to.eql(data.backgroundImage);
    done();
  });

  it('officeLibraryBook totalCopies and copiesCheckedOut negative errors', (done) => {
    const officeLibraryBook = new OfficeLibraryBook({
      title: data.title,
      author: data.author,
      category: data.category,
      totalCopies: 0,
      body: data.body,
      users: ["stan", "sylvie", "adolf"],
      copiesCheckedOut: -6,
      backgroundImage: data.backgroundImage
    });

    officeLibraryBook.validate(err => {
      expect(err.errors.totalCopies.message).to.eql('Must be at least 1 copy');
      expect(err.errors.copiesCheckedOut.message).to.eql('copies checked out cannot be negative');
      done();
    });
  });
});