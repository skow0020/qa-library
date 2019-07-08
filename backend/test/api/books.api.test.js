const chai = require('chai');
const chaiHttp = require('chai-http');
{/* eslint-disable-next-line */ }
const should = chai.should();

const server = require('../../../server');
const data = require('../data.json');

chai.use(chaiHttp);

describe('Books', () => {
  it('it should GET all the books', (done) => {
    chai.request(server)
      .get('/api/books')
      .end((err, res) => {
        if (err) assert.fail(`Getting books failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        done();
      });
  });

  it('Post-Get-Delete an book', (done) => {
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

    let book_id = null;

    chai.request(server)
      .post('/api/books')
      .send(book)
      .end((err, res) => {
        if (err) assert.fail(`Post book failed: ${err}`);

        res.should.have.status(201);
        res.body.success.should.be.eql(true);
        res.body.post.hasOwnProperty('_id').should.be.eql(true);
        res.body.post.title.should.be.eql(data.title);
        res.body.post.author.should.be.eql(data.author);
        res.body.post.category.should.be.eql(data.category);
        res.body.post.language.should.be.eql(data.language);
        res.body.post.url.should.be.eql(data.url);
        res.body.post.backgroundImage.should.be.eql(data.backgroundImage);
        res.body.post.body.should.be.eql(data.body);
        res.body.post.pdf.should.be.eql(data.pdf);

        book_id = res.body.post.book_id;

        chai.request(server)
          .get('/api/books')
          .end((err, res) => {
            if (err) assert.fail(`Getting books failed: ${err}`);

            res.should.have.status(200);
            res.body.success.should.be.eql(true);
            res.body.data.length.should.be.above(0);

            res.body.data.forEach((bookInResponse) => {
              bookInResponse.hasOwnProperty('title').should.be.true;
              bookInResponse.hasOwnProperty('author').should.be.true;
              bookInResponse.hasOwnProperty('backgroundImage').should.be.true;
              bookInResponse.hasOwnProperty('url').should.be.true;
              bookInResponse.hasOwnProperty('category').should.be.true;
              bookInResponse.hasOwnProperty('language').should.be.true;
            });

            chai.request(server)
              .delete('/api/books')
              .send({ book_id: book_id })
              .end((err, res) => {
                if (err) assert.fail(`Deleting book failed: ${err}`);
                res.body.message.should.be.eql('Book successfully deleted');
                done();
              });
          });
      });
  });

  it('Get book search', (done) => {
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

    chai.request(server)
      .post('/api/books')
      .send(book1)
      .end((err, res) => {
        if (err) assert.fail(`Post book1 failed: ${err}`);
        res.should.have.status(201);

        chai.request(server)
          .post('/api/books')
          .send(book2)
          .end((err, res) => {
            if (err) assert.fail(`Post book2 failed: ${err}`);
            res.should.have.status(201);

            chai.request(server)
              .get('/api/books?title=hippo')
              .end((err, res) => {
                if (err) assert.fail(`Get book 'hippo' failed: ${err}`);
                res.should.have.status(200);
                res.body.success.should.be.eql(true);
                res.body.data.length.should.be.at.least(1);
                res.body.data.forEach(book => {
                  book.title.toLowerCase().should.contain('hippo');
                });
                done();
              });
          });
      });
  });

  it('Post a book error', (done) => {
    const book = {
    };

    chai.request(server)
      .post('/api/books')
      .send(book)
      .end((err, res) => {
        if (err) assert.fail(`Getting books failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(false);
        res.body.hasOwnProperty('error').should.be.eql(true);

        res.body.error._message.should.be.eql('Book validation failed');
        res.body.error.name.should.be.eql('ValidationError');
        done();
      });
  });

  it('Delete a book error', (done) => {
    chai.request(server)
      .delete('/api/books')
      .send({ book_id: 3453245 })
      .end((err, res) => {
        if (err) assert.fail(`Deleting book failed: ${err}`);
        res.body.hasOwnProperty('error');
        res.body.error.should.be.eql('Unable to find book id: 3453245');
        done();
      });
  });

  it('Get books filter by category', (done) => {
    chai.request(server)
      .get('/api/books?category=API%20Automation')

      .end((err, res) => {
        if (err) assert.fail(`Get books category filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(book => {
          book.category.should.be.eql('API Automation');
        });
        done();
      });
  });

  it('Get books filter by language', (done) => {
    chai.request(server)
      .get('/api/books?language=Python')

      .end((err, res) => {
        if (err) assert.fail(`Get books language filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(book => {
          book.language.should.be.eql('Python');
        });
        done();
      });
  });

  it('Get books filter by language and category', (done) => {
    chai.request(server)
      .get('/api/books?language=Swift&category=API%20Automation')

      .end((err, res) => {
        if (err) assert.fail(`Get books language and category filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(book => {
          book.language.should.be.eql('Swift');
          book.category.should.be.eql('API Automation');
        });
        done();
      });
  });
});