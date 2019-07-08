const chai = require('chai');
const chaiHttp = require('chai-http');
{/* eslint-disable-next-line */ }
const should = chai.should();

const server = require('../../../server');
const data = require('../data.json');

chai.use(chaiHttp);

describe('Office Books', () => {
  it('it should GET all the officeLibraryBooks', (done) => {
    chai.request(server)
      .get('/api/officeLibraryBooks')
      .end((err, res) => {
        if (err) assert.fail(`Getting officeLibraryBooks failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        done();
      });
  });

  it('it should GET officeLibraryBook by id', (done) => {
    chai.request(server)
      .get('/api/officeLibraryBooks/1000')
      .end((err, res) => {
        if (err) assert.fail(`Getting officeLibraryBooks failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.eql(1);
        done();
      });
  });

  it('Post-Get-Delete an officeLibraryBook', (done) => {
    const officeLibraryBook = {
      title: data.title,
      author: data.author,
      totalCopies: 5,
      category: data.category,
      backgroundImage: data.backgroundImage,
      body: data.body,
      users: []
    };

    let office_book_id = null;

    chai.request(server)
      .post('/api/officeLibraryBooks')
      .send(officeLibraryBook)
      .end((err, res) => {
        if (err) assert.fail(`Post officeLibraryBook failed: ${err}`);

        res.should.have.status(201);
        res.body.success.should.be.eql(true);
        res.body.post.hasOwnProperty('_id').should.be.eql(true);
        res.body.post.title.should.be.eql(data.title);
        res.body.post.author.should.be.eql(data.author);
        res.body.post.category.should.be.eql(data.category);
        res.body.post.body.should.be.eql(data.body);
        res.body.post.totalCopies.should.be.eql(5);
        res.body.post.copiesCheckedOut.should.be.eql(0);

        office_book_id = res.body.post.office_book_id;

        chai.request(server)
          .get('/api/officeLibraryBooks')
          .end((err, res) => {
            if (err) assert.fail(`Getting officeLibraryBooks failed: ${err}`);

            res.should.have.status(200);
            res.body.success.should.be.eql(true);
            res.body.data.length.should.be.above(0);

            res.body.data.forEach((bookInResponse) => {
              bookInResponse.hasOwnProperty('title').should.be.true;
              bookInResponse.hasOwnProperty('author').should.be.true;
              bookInResponse.hasOwnProperty('category').should.be.true;
            });

            chai.request(server)
              .delete('/api/officeLibraryBooks')
              .send({ office_book_id: office_book_id })
              .end((err, res) => {
                if (err) assert.fail(`Deleting officeLibraryBook failed: ${err}`);
                res.body.message.should.be.eql('Office book successfully deleted');
                done();
              });
          });
      });
  });

  it('Get officeLibraryBook search', (done) => {
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

    chai.request(server)
      .post('/api/officeLibraryBooks')
      .send(book1)
      .end((err, res) => {
        if (err) assert.fail(`Post book1 failed: ${err}`);
        res.should.have.status(201);

        chai.request(server)
          .post('/api/officeLibraryBooks')
          .send(book2)
          .end((err, res) => {
            if (err) assert.fail(`Post book2 failed: ${err}`);
            res.should.have.status(201);

            chai.request(server)
              .get('/api/officeLibraryBooks?title=hippo')
              .end((err, res) => {
                if (err) assert.fail(`Get officeLibraryBook 'hippo' failed: ${err}`);
                res.should.have.status(200);
                res.body.success.should.be.eql(true);
                res.body.data.length.should.be.at.least(1);
                res.body.data.forEach(officeLibraryBook => {
                  officeLibraryBook.title.toLowerCase().should.contain('hippo');
                });
                done();
              });
          });
      });
  });

  it('Post a officeLibraryBook error', (done) => {
    const officeLibraryBook = {
    };

    chai.request(server)
      .post('/api/officeLibraryBooks')
      .send(officeLibraryBook)
      .end((err, res) => {
        if (err) assert.fail(`Getting officeLibraryBooks failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(false);
        res.body.hasOwnProperty('error').should.be.eql(true);

        res.body.error._message.should.be.eql('OfficeLibraryBook validation failed');
        res.body.error.name.should.be.eql('ValidationError');
        done();
      });
  });

  it('Delete a officeLibraryBook error', (done) => {
    chai.request(server)
      .delete('/api/officeLibraryBooks')
      .send({ office_book_id: 3453245 })
      .end((err, res) => {
        if (err) assert.fail(`Deleting officeLibraryBook failed: ${err}`);
        res.body.hasOwnProperty('error');
        res.body.error.should.be.eql('Unable to find officeLibraryBook id: 3453245');
        done();
      });
  });

  it('Get officeLibraryBooks filter by category', (done) => {
    chai.request(server)
      .get('/api/officeLibraryBooks?category=API%20Automation')

      .end((err, res) => {
        if (err) assert.fail(`Get officeLibraryBooks category filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(officeLibraryBook => {
          officeLibraryBook.category.should.be.eql('API Automation');
        });
        done();
      });
  });

  it('Increment copiesCheckedOut', (done) => {
    chai.request(server)
      .patch('/api/officeLibraryBooks/incrementCopiesCheckedOut')
      .send({ office_book_id: 2, user: 'fakegithubuser' })
      .end((err, res) => {
        if (err) assert.fail(`incrementCopiesCheckedOut endpoint did not return: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.book.copiesCheckedOut.should.be.eql(1);
        res.body.book.users.should.contain('fakegithubuser');
        done();
      });
  });

  it('Increment copiesCheckedOut when user has book checked out', (done) => {
    chai.request(server)
      .patch('/api/officeLibraryBooks/incrementCopiesCheckedOut')
      .send({ office_book_id: 3, user: 'fakegithubuser' })
      .end((err, res) => {
        if (err) assert.fail(`incrementCopiesCheckedOut endpoint did not return: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.book.copiesCheckedOut.should.be.eql(1);

        chai.request(server)
          .patch('/api/officeLibraryBooks/incrementCopiesCheckedOut')
          .send({ office_book_id: 3, user: 'fakegithubuser' })
          .end((err, res) => {
            if (err) assert.fail(`incrementCopiesCheckedOut endpoint did not return: ${err}`);
            res.should.have.status(200);
            res.body.success.should.be.eql(false);
            res.body.error.should.be.eql('User fakegithubuser already has this book checked out');
            done();
          });
      });
  });

  it('Decrement copiesCheckedOut', (done) => {
    chai.request(server)
      .patch('/api/officeLibraryBooks/incrementCopiesCheckedOut')
      .send({ office_book_id: 1000, user: 'fakegithubuser' })
      .end((err, res) => {
        if (err) assert.fail(`incrementCopiesCheckedOut endpoint did not return: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.book.copiesCheckedOut.should.be.eql(4);
        res.body.book.users.should.contain('fakegithubuser');

        chai.request(server)
          .patch('/api/officeLibraryBooks/decrementCopiesCheckedOut')
          .send({ office_book_id: 1000, user: 'fakegithubuser' })
          .end((err, res) => {
            if (err) assert.fail(`decrementCopiesCheckedOut endpoint did not return: ${err}`);
            res.should.have.status(200);
            res.body.success.should.be.eql(true);
            res.body.book.copiesCheckedOut.should.be.eql(3);
            res.body.book.users.should.not.contain('fakegithubuser');
            done();
          });
      });
  });

  it('Decrement copiesCheckedOut when 0', (done) => {
    chai.request(server)
      .patch('/api/officeLibraryBooks/decrementCopiesCheckedOut')
      .send({ office_book_id: 2001, user: 'fakegithubuser' })
      .end((err, res) => {
        if (err) assert.fail(`decrementeCopiesCheckedOut endpoint did not return: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(false);
        res.body.error.should.be.eql('All copies are currently returned and available');
        done();
      });
  });

  it('Decrement copiesCheckedOut when 0', (done) => {
    chai.request(server)
      .patch('/api/officeLibraryBooks/decrementCopiesCheckedOut')
      .send({ office_book_id: 1000, user: 'userHasNobook' })
      .end((err, res) => {
        if (err) assert.fail(`DecrementCopiesCheckedOut endpoint did not return: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(false);
        res.body.error.should.be.eql('User userHasNobook does not have this book to return');
        done();
      });
  });
});