import chai from 'chai';
import chaiHttp from 'chai-http';
import data from '../data.json';
import server from '../../../server';

chai.use(chaiHttp);

describe('Books', () => {
  it('it should GET all the books', async () => {
    const getBooks = await chai.request(server)
      .get('/api/books');

    getBooks.should.have.status(200);
    getBooks.body.success.should.be.eql(true);

  });

  it('Post-Get-Delete an book', async () => {
    const book = {
      title: data.title,
      author: data.author,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      pdf: data.pdf,
      body: data.body
    };

    const postedBook = await chai.request(server)
      .post('/api/books')
      .send(book);

    postedBook.should.have.status(201);
    postedBook.body.success.should.be.eql(true);
    postedBook.body.post.hasOwnProperty('_id').should.be.eql(true);
    postedBook.body.post.title.should.be.eql(data.title);
    postedBook.body.post.author.should.be.eql(data.author);
    postedBook.body.post.category.should.be.eql(data.category);
    postedBook.body.post.language.should.be.eql(data.language);
    postedBook.body.post.url.should.be.eql(data.url);
    postedBook.body.post.backgroundImage.should.be.eql(data.backgroundImage);
    postedBook.body.post.body.should.be.eql(data.body);
    postedBook.body.post.pdf.should.be.eql(data.pdf);

    const book_id = postedBook.body.post.book_id;

    const getBooks = await chai.request(server)
      .get('/api/books');

    getBooks.should.have.status(200);
    getBooks.body.success.should.be.eql(true);
    getBooks.body.data.length.should.be.above(0);

    getBooks.body.data.forEach((bookInResponse) => {
      bookInResponse.hasOwnProperty('title').should.be.true;
      bookInResponse.hasOwnProperty('author').should.be.true;
      bookInResponse.hasOwnProperty('backgroundImage').should.be.true;
      bookInResponse.hasOwnProperty('url').should.be.true;
      bookInResponse.hasOwnProperty('category').should.be.true;
      bookInResponse.hasOwnProperty('language').should.be.true;
    });

    const deletedBook = await chai.request(server)
      .delete('/api/books')
      .send({ book_id: book_id });

    deletedBook.body.message.should.be.eql('Book successfully deleted');

  });

  it('Get book search', async () => {
    const book1 = {
      title: data.title,
      author: data.author,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      pdf: data.pdf,
      body: data.body
    };

    const book2 = {
      title: 'Another book',
      author: data.author,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      pdf: data.pdf,
      body: data.body
    };

    const postedBook1 = await chai.request(server)
      .post('/api/books')
      .send(book1)
    postedBook1.should.have.status(201);

    const postedBook2 = await chai.request(server)
      .post('/api/books')
      .send(book2);
    postedBook2.should.have.status(201);

    const getBooks = await chai.request(server)
      .get('/api/books?search=hippo');

    getBooks.should.have.status(200);
    getBooks.body.success.should.be.eql(true);
    getBooks.body.data.length.should.be.at.least(1);
    getBooks.body.data.forEach(book => {
      book.title.toLowerCase().should.contain('hippo');
    });
  });

  it('Post a book error', async () => {
    const book = {
    };

    const postedBook = await chai.request(server)
      .post('/api/books')
      .send(book);

    postedBook.should.have.status(200);
    postedBook.body.success.should.be.eql(false);
    postedBook.body.hasOwnProperty('error').should.be.eql(true);
    postedBook.body.error._message.should.be.eql('Book validation failed');
    postedBook.body.error.name.should.be.eql('ValidationError');
  });

  it('Delete a book error', async () => {
    const deletedBook = await chai.request(server)
      .delete('/api/books')
      .send({ book_id: 3453245 });

    deletedBook.body.hasOwnProperty('error');
    deletedBook.body.error.should.be.eql('Unable to find book id: 3453245');
  });

  it('Get books filter by category', async () => {
    const getBooks = await chai.request(server)
      .get('/api/books?category=API%20Automation');

    getBooks.should.have.status(200);
    getBooks.body.success.should.be.eql(true);
    getBooks.body.data.length.should.be.at.least(1);
    getBooks.body.data.forEach(book => {
      book.category.should.be.eql('API Automation');
    });
  });

  it('Get books filter by language', async () => {
    const getBooks = await chai.request(server)
      .get('/api/books?language=Python');

    getBooks.should.have.status(200);
    getBooks.body.success.should.be.eql(true);
    getBooks.body.data.length.should.be.at.least(1);
    getBooks.body.data.forEach(book => {
      book.language.should.be.eql('Python');
    });
  });

  it('Get books filter by language and category', async () => {
    const getBooks = await chai.request(server)
      .get('/api/books?language=Swift&category=API%20Automation');

    getBooks.should.have.status(200);
    getBooks.body.success.should.be.eql(true);
    getBooks.body.data.length.should.be.at.least(1);
    getBooks.body.data.forEach(book => {
      book.language.should.be.eql('Swift');
      book.category.should.be.eql('API Automation');
    });
  });
});