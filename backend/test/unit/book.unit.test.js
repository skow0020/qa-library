import Book from '../../models/book';
import data from '../data.json';

describe('Book Tests', () => {
  it('verify required Book attributes', (done) => {
    const book = new Book();

    book.validate(err => {
      expect(err.errors.title).to.exist;
      expect(err.errors.author).to.exist;
      expect(err.errors.backgroundImage).to.exist;
      expect(err.errors.category).to.exist;
      expect(err.errors.url).to.exist;
      expect(err.errors.language).to.not.exist;
      done();
    });
  });

  it('book object creation', (done) => {
    const book = new Book({
      title: data.title,
      author: data.author,
      category: data.category,
      language: data.language,
      url: data.url,
      backgroundImage: data.backgroundImage,
      body: data.body,
      pdf: data.pdf
    });

    book.validate(err => {
      expect(err === null);
    });

    expect(book.title).to.equal(data.title);
    expect(book.author).to.equal(data.author);
    expect(book.category).to.equal(data.category);
    expect(book.language).to.equal(data.language);
    expect(book.url).to.equal(data.url);
    expect(book.backgroundImage).to.equal(data.backgroundImage);
    expect(book.body).to.equal(data.body);
    expect(book.pdf).to.equal(data.pdf);
    done();
  });
});