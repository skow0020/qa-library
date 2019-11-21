import chai from 'chai';
import chaiHttp from 'chai-http';
import data from '../data.json';
import server from '../../../server';

chai.use(chaiHttp);

describe('Office Books', () => {
  it('it should GET all the officeLibraryBooks', async () => {
    const getBooks = await chai.request(server)
      .get('/api/officeLibraryBooks');

    getBooks.should.have.status(200);
    getBooks.body.success.should.be.eql(true);
  });

  it('it should GET officeLibraryBook by id', async () => {
    const getBooks = await chai.request(server)
      .get('/api/officeLibraryBooks/1000');

    getBooks.should.have.status(200);
    getBooks.body.success.should.be.eql(true);
    getBooks.body.data.length.should.be.eql(1);
  });

  it('Post-Get-Delete an officeLibraryBook', async () => {
    const officeLibraryBook = {
      title: data.title,
      author: data.author,
      totalCopies: 5,
      category: data.category,
      backgroundImage: data.backgroundImage,
      body: data.body,
      users: []
    };

    const postedBook = await chai.request(server)
      .post('/api/officeLibraryBooks')
      .send(officeLibraryBook);

    postedBook.should.have.status(201);
    postedBook.body.success.should.be.eql(true);
    postedBook.body.post.hasOwnProperty('_id').should.be.eql(true);
    postedBook.body.post.title.should.be.eql(data.title);
    postedBook.body.post.author.should.be.eql(data.author);
    postedBook.body.post.category.should.be.eql(data.category);
    postedBook.body.post.body.should.be.eql(data.body);
    postedBook.body.post.totalCopies.should.be.eql(5);
    postedBook.body.post.copiesCheckedOut.should.be.eql(0);

    const office_book_id = postedBook.body.post.office_book_id;

    const getBooks = await chai.request(server)
      .get('/api/officeLibraryBooks');

    getBooks.should.have.status(200);
    getBooks.body.success.should.be.eql(true);
    getBooks.body.data.length.should.be.above(0);

    getBooks.body.data.forEach((bookInResponse) => {
      bookInResponse.hasOwnProperty('title').should.be.true;
      bookInResponse.hasOwnProperty('author').should.be.true;
      bookInResponse.hasOwnProperty('category').should.be.true;
    });

    const deletedBook = await chai.request(server)
      .delete('/api/officeLibraryBooks')
      .send({ office_book_id });

    deletedBook.body.message.should.be.eql('Office book successfully deleted');
  });

  it('Get officeLibraryBook search', async () => {
    const book1 = {
      title: data.title,
      author: data.author,
      totalCopies: 5,
      category: data.category,
      body: data.body,
      backgroundImage: data.backgroundImage,
      users: []
    };

    const book2 = {
      title: 'Another officeLibraryBook',
      author: data.author,
      totalCopies: 102,
      category: data.category,
      body: data.body,
      backgroundImage: data.backgroundImage,
      users: []
    };

    const postedBook1 = await chai.request(server)
      .post('/api/officeLibraryBooks')
      .send(book1);

    postedBook1.should.have.status(201);

    const postedBook2 = await chai.request(server)
      .post('/api/officeLibraryBooks')
      .send(book2);

    postedBook2.should.have.status(201);

    const getBooks = await chai.request(server)
      .get('/api/officeLibraryBooks?search=hippo');

    getBooks.should.have.status(200);
    getBooks.body.success.should.be.eql(true);
    getBooks.body.data.length.should.be.at.least(1);
    getBooks.body.data.forEach(officeLibraryBook => {
      officeLibraryBook.title.toLowerCase().should.contain('hippo');
    });
  });

  it('Post a officeLibraryBook error', async () => {
    const officeLibraryBook = {
    };

    const postedBook = await chai.request(server)
      .post('/api/officeLibraryBooks')
      .send(officeLibraryBook);

    postedBook.should.have.status(200);
    postedBook.body.success.should.be.eql(false);
    postedBook.body.hasOwnProperty('error').should.be.eql(true);

    postedBook.body.error._message.should.be.eql('OfficeLibraryBook validation failed');
    postedBook.body.error.name.should.be.eql('ValidationError');
  });

  it('Delete a officeLibraryBook error', async () => {
    const deletedBook = await chai.request(server)
      .delete('/api/officeLibraryBooks')
      .send({ office_book_id: 3453245 });

    deletedBook.body.hasOwnProperty('error');
    deletedBook.body.error.should.be.eql('Unable to find officeLibraryBook id: 3453245');
  });

  it('Get officeLibraryBooks filter by category', async () => {
    const getBooks = await chai.request(server)
      .get('/api/officeLibraryBooks?category=API%20Automation');

    getBooks.should.have.status(200);
    getBooks.body.success.should.be.eql(true);
    getBooks.body.data.length.should.be.at.least(1);
    getBooks.body.data.forEach(officeLibraryBook => {
      officeLibraryBook.category.should.be.eql('API Automation');
    });
  });

  it('Increment copiesCheckedOut', async () => {
    const updatedBook = await chai.request(server)
      .patch('/api/officeLibraryBooks/incrementCopiesCheckedOut')
      .send({ office_book_id: 2001, user: 'fakegithubuser' });

    updatedBook.should.have.status(200);
    updatedBook.body.success.should.be.eql(true);
    updatedBook.body.book.copiesCheckedOut.should.be.eql(1);
    updatedBook.body.book.users.should.contain('fakegithubuser');
  });

  it('Increment copiesCheckedOut when user has book checked out', async () => {
    const updatedBook = await chai.request(server)
      .patch('/api/officeLibraryBooks/incrementCopiesCheckedOut')
      .send({ office_book_id: 2001, user: 'fakegithubuser2' });

    updatedBook.should.have.status(200);
    updatedBook.body.success.should.be.eql(true);

    const updatedBookTry = await chai.request(server)
      .patch('/api/officeLibraryBooks/incrementCopiesCheckedOut')
      .send({ office_book_id: 2001, user: 'fakegithubuser2' });

    updatedBookTry.should.have.status(200);
    updatedBookTry.body.success.should.be.eql(false);
    updatedBookTry.body.error.should.be.eql('User fakegithubuser2 already has this book checked out');
  });

  it('Decrement copiesCheckedOut', async () => {
    const updatedBook = await chai.request(server)
      .patch('/api/officeLibraryBooks/incrementCopiesCheckedOut')
      .send({ office_book_id: 1000, user: 'fakegithubuser' });

    updatedBook.should.have.status(200);
    updatedBook.body.success.should.be.eql(true);
    updatedBook.body.book.copiesCheckedOut.should.be.eql(4);
    updatedBook.body.book.users.should.contain('fakegithubuser');

    const updatedBookTry = await chai.request(server)
      .patch('/api/officeLibraryBooks/decrementCopiesCheckedOut')
      .send({ office_book_id: 1000, user: 'fakegithubuser' });

    updatedBookTry.should.have.status(200);
    updatedBookTry.body.success.should.be.eql(true);
    updatedBookTry.body.book.copiesCheckedOut.should.be.eql(3);
    updatedBookTry.body.book.users.should.not.contain('fakegithubuser');
  });

  it('Decrement copiesCheckedOut when 0', async () => {
    const updatedBook = await chai.request(server)
      .patch('/api/officeLibraryBooks/decrementCopiesCheckedOut')
      .send({ office_book_id: 2002, user: 'fakegithubuser' });

    updatedBook.should.have.status(200);
    updatedBook.body.success.should.be.eql(false);
    updatedBook.body.error.should.be.eql('User fakegithubuser does not have this book to return');
  });

  it('Decrement copiesCheckedOut when 0', async () => {
    const updatedBook = await chai.request(server)
      .patch('/api/officeLibraryBooks/decrementCopiesCheckedOut')
      .send({ office_book_id: 1000, user: 'userHasNobook' });

    updatedBook.should.have.status(200);
    updatedBook.body.success.should.be.eql(false);
    updatedBook.body.error.should.be.eql('User userHasNobook does not have this book to return');
  });
});