import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../../server';
import data from '../data.json';

chai.use(chaiHttp);

describe('Tutorial', () => {
  it('it should GET all the tutorial', (done) => {
    chai.request(server)
      .get('/api/tutorials')
      .end((err, res) => {
        if (err) assert.fail(`Getting tutorial failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        done();
      });
  });

  it('Post-Get-Delete a tutorial', (done) => {
    const tutorial = {
      title: data.title,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    let tut_id = null;
    chai.request(server)
      .post('/api/tutorials')
      .send(tutorial)
      .end((err, res) => {
        if (err) assert.fail(`Post tutorial failed: ${err}`);

        res.should.have.status(201);
        res.body.success.should.be.eql(true);
        res.body.post.hasOwnProperty('_id').should.be.eql(true);
        res.body.post.title.should.be.eql(data.title);
        res.body.post.category.should.be.eql(data.category);
        res.body.post.language.should.be.eql(data.language);
        res.body.post.url.should.be.eql(data.url);
        res.body.post.backgroundImage.should.be.eql(data.backgroundImage);
        res.body.post.body.should.be.eql(data.body);

        tut_id = res.body.post.tut_id;

        chai.request(server)
          .get('/api/tutorials')
          .end((err, res) => {
            if (err) assert.fail(`Getting tutorial failed: ${err}`);

            res.should.have.status(200);
            res.body.success.should.be.eql(true);
            res.body.data.length.should.be.above(0);

            res.body.data.forEach((tutorialInResponse) => {
              tutorialInResponse.hasOwnProperty('title').should.be.true;
              tutorialInResponse.hasOwnProperty('backgroundImage').should.be.true;
              tutorialInResponse.hasOwnProperty('url').should.be.true;
              tutorialInResponse.hasOwnProperty('category').should.be.true;
              tutorialInResponse.hasOwnProperty('language').should.be.true;
            });

            chai.request(server)
              .delete('/api/tutorials')
              .send({ tut_id: tut_id })
              .end((err, res) => {
                if (err) assert.fail(`Deleting tutorial failed: ${err}`);
                res.body.message.should.be.eql('Tutorial successfully deleted');
                done();
              });
          });
      });
  });

  it('Get tutorial search', (done) => {
    const tutorial1 = {
      title: data.title,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    const tutorial2 = {
      title: 'GOOBA GOOBA GOO!',
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    chai.request(server)
      .post('/api/tutorials')
      .send(tutorial1)
      .end((err, res) => {
        if (err) assert.fail(`Post tutorial1 failed: ${err}`);
        res.should.have.status(201);

        chai.request(server)
          .post('/api/tutorials')
          .send(tutorial2)
          .end((err, res) => {
            if (err) assert.fail(`Post tutorial2 failed: ${err}`);
            res.should.have.status(201);

            chai.request(server)
              .get('/api/tutorials?title=hippo')
              .end((err, res) => {
                if (err) assert.fail(`Get tutorial 'hippo' failed: ${err}`);
                res.should.have.status(200);
                res.body.success.should.be.eql(true);
                res.body.data.length.should.be.at.least(1);
                res.body.data.forEach(tutorial => {
                  tutorial.title.toLowerCase().should.contain('hippo');
                });
                done();
              });
          });
      });
  });

  it('Post a tutorial error', (done) => {
    const tutorial = {
    };

    chai.request(server)
      .post('/api/tutorials')
      .send(tutorial)
      .end((err, res) => {
        if (err) assert.fail(`Getting tutorial failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(false);
        res.body.hasOwnProperty('error').should.be.eql(true);

        res.body.error._message.should.be.eql('Tutorial validation failed');
        res.body.error.name.should.be.eql('ValidationError');
        done();
      });
  });

  it('Delete a tutorial error', (done) => {
    chai.request(server)
      .delete('/api/tutorials')
      .send({ tut_id: 34532452345 })
      .end((err, res) => {
        if (err) assert.fail(`Deleting tutorial failed: ${err}`);
        res.body.hasOwnProperty('error');
        res.body.error.should.be.eql('Unable to find tutorial id: 34532452345');
        done();
      });
  });

  it('Get tutorials filter by category', (done) => {

    chai.request(server)
      .get('/api/tutorials?category=API%20Automation')

      .end((err, res) => {
        if (err) assert.fail(`Get tutorials category filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(tutorials => {
          tutorials.category.should.be.eql('API Automation');
        });
        done();
      });
  });

  it('Get tutorials filter by language', (done) => {

    chai.request(server)
      .get('/api/tutorials?language=Python')

      .end((err, res) => {
        if (err) assert.fail(`Get tutorials language filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(tutorial => {
          tutorial.language.should.be.eql('Python');
        });
        done();
      });
  });

  it('Get tutorials filter by language and category', (done) => {
    chai.request(server)
      .get('/api/tutorials?language=Swift&category=API%20Automation')

      .end((err, res) => {
        if (err) assert.fail(`Get tutorials language and category filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(tutorial => {
          tutorial.language.should.be.eql('Swift');
          tutorial.category.should.be.eql('API Automation');
        });
        done();
      });
  });
});