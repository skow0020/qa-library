import chai from 'chai';
import chaiHttp from 'chai-http';
import data from '../data.json';
import server from '../../../server';

chai.use(chaiHttp);

describe('Articles', () => {
  it('it should GET all the articles', (done) => {
    chai.request(server)
      .get('/api/articles')
      .end((err, res) => {
        if (err) assert.fail(`Getting articles failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        done();
      });
  });

  it('Post-Get-Delete an article', (done) => {
    const article = {
      title: data.title,
      author: data.author,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    let article_id = null;

    chai.request(server)
      .post('/api/articles')
      .send(article)
      .end((err, res) => {
        if (err) assert.fail(`Post article failed: ${err}`);

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

        article_id = res.body.post.article_id;

        chai.request(server)
          .get('/api/articles')
          .end((err, res) => {
            if (err) assert.fail(`Getting articles failed: ${err}`);

            res.should.have.status(200);
            res.body.success.should.be.eql(true);
            res.body.data.length.should.be.above(0);

            res.body.data.forEach((articleInResponse) => {
              articleInResponse.hasOwnProperty('title').should.be.true;
              articleInResponse.hasOwnProperty('author').should.be.true;
              articleInResponse.hasOwnProperty('backgroundImage').should.be.true;
              articleInResponse.hasOwnProperty('url').should.be.true;
              articleInResponse.hasOwnProperty('category').should.be.true;
              articleInResponse.hasOwnProperty('language').should.be.true;
            });

            chai.request(server)
              .delete('/api/articles')
              .send({ article_id: article_id })
              .end((err, res) => {
                if (err) assert.fail(`Deleting article failed: ${err}`);
                res.body.message.should.be.eql('Article successfully deleted');
                done();
              });
          });
      });
  });

  it('Get Article title search', (done) => {
    const article1 = {
      title: data.title,
      author: data.author,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    const article2 = {
      title: "TITLE 2",
      author: data.author,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    chai.request(server)
      .post('/api/articles')
      .send(article1)
      .end((err, res) => {
        if (err) assert.fail(`Post article1 failed: ${err}`);
        res.should.have.status(201);

        chai.request(server)
          .post('/api/articles')
          .send(article2)
          .end((err, res) => {
            if (err) assert.fail(`Post article1 failed: ${err}`);
            res.should.have.status(201);

            chai.request(server)
              .get('/api/articles?search=hippo')

              .end((err, res) => {
                if (err) assert.fail(`Get article 'hippo' failed: ${err}`);
                res.should.have.status(200);
                res.body.success.should.be.eql(true);
                res.body.data.length.should.be.at.least(1);
                res.body.data.forEach(article => {
                  article.title.toLowerCase().should.contain('hippo');
                });
                done();
              });
          });
      });
  });

  it('Post an article error', (done) => {
    const article = {
    };

    chai.request(server)
      .post('/api/articles')
      .send(article)
      .end((err, res) => {
        if (err) assert.fail(`Post article failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(false);
        res.body.hasOwnProperty('error').should.be.eql(true);

        res.body.error._message.should.be.eql('Article validation failed');
        res.body.error.name.should.be.eql('ValidationError');
        done();
      });
  });

  it('Delete an article error', (done) => {
    chai.request(server)
      .delete('/api/articles')
      .send({ article_id: 4564564 })
      .end((err, res) => {
        if (err) assert.fail(`Deleting article failed: ${err}`);
        res.body.hasOwnProperty('error');
        res.body.error.should.be.eql('Unable to find article id: 4564564');
        done();
      });
  });

  it('Get articles filter by category', (done) => {
    chai.request(server)
      .get('/api/articles?category=API%20Automation')

      .end((err, res) => {
        if (err) assert.fail(`Get article category filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(article => {
          article.category.should.be.eql('API Automation');
        });
        done();
      });
  });

  it('Get articles filter by language', (done) => {
    chai.request(server)
      .get('/api/articles?language=Python')

      .end((err, res) => {
        if (err) assert.fail(`Get article language filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(article => {
          article.language.should.be.eql('Python');
        });
        done();
      });
  });

  it('Get articles filter by language and category', (done) => {
    chai.request(server)
      .get('/api/articles?language=Swift&category=API%20Automation')

      .end((err, res) => {
        if (err) assert.fail(`Get article language and category filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(article => {
          article.language.should.be.eql('Swift');
          article.category.should.be.eql('API Automation');
        });
        done();
      });
  });
});