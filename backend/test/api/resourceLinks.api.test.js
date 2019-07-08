const chai = require('chai');
const chaiHttp = require('chai-http');
{/* eslint-disable-next-line */ }
const should = chai.should();

const server = require('../../../server');
const data = require('../data.json');

chai.use(chaiHttp);

describe('ResourceLink', () => {
  it('it should GET all the resourceLinks', (done) => {
    chai.request(server)
      .get('/api/resourceLinks')
      .end((err, res) => {
        if (err) assert.fail(`Getting resourceLinks failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        done();
      });
  });

  it('Post-Get-Delete an resourceLink', (done) => {
    const resourceLink = {
      title: data.title,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    let res_id = null;

    chai.request(server)
      .post('/api/resourceLinks')
      .send(resourceLink)
      .end((err, res) => {
        if (err) assert.fail(`Post resourceLink failed: ${err}`);

        res.should.have.status(201);
        res.body.success.should.be.eql(true);
        res.body.post.hasOwnProperty('_id').should.be.eql(true);
        res.body.post.title.should.be.eql(data.title);
        res.body.post.category.should.be.eql(data.category);
        res.body.post.language.should.be.eql(data.language);
        res.body.post.url.should.be.eql(data.url);
        res.body.post.backgroundImage.should.be.eql(data.backgroundImage);
        res.body.post.body.should.be.eql(data.body);

        res_id = res.body.post.res_id;

        chai.request(server)
          .get('/api/resourceLinks')
          .end((err, res) => {
            if (err) assert.fail(`Getting resourceLinks failed: ${err}`);

            res.should.have.status(200);
            res.body.success.should.be.eql(true);
            res.body.data.length.should.be.above(0);

            res.body.data.forEach((resLinkInResponse) => {
              resLinkInResponse.hasOwnProperty('title').should.be.true;
              resLinkInResponse.hasOwnProperty('backgroundImage').should.be.true;
              resLinkInResponse.hasOwnProperty('url').should.be.true;
              resLinkInResponse.hasOwnProperty('category').should.be.true;
              resLinkInResponse.hasOwnProperty('language').should.be.true;
            });

            chai.request(server)
              .delete('/api/resourceLinks')
              .send({ res_id: res_id })
              .end((err, res) => {
                if (err) assert.fail(`Deleting resourceLink failed: ${err}`);
                res.body.message.should.be.eql('Resource Link successfully deleted');
                done();
              });
          });
      });
  });

  it('Get resource link search', (done) => {
    const resourceLink1 = {
      title: data.title,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    const resourceLink2 = {
      title: "To be filtered",
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    chai.request(server)
      .post('/api/resourceLinks')
      .send(resourceLink1)
      .end((err, res) => {
        if (err) assert.fail(`Post resourceLink1 failed: ${err}`);
        res.should.have.status(201);

        chai.request(server)
          .post('/api/resourceLinks')
          .send(resourceLink2)
          .end((err, res) => {
            if (err) assert.fail(`Post resourceLink2 failed: ${err}`);
            res.should.have.status(201);

            chai.request(server)
              .get('/api/resourceLinks?title=hippo')
              .end((err, res) => {
                if (err) assert.fail(`Get resource link 'hippo' failed: ${err}`);
                res.should.have.status(200);
                res.body.success.should.be.eql(true);
                res.body.data.length.should.be.at.least(1);
                res.body.data.forEach(resourceLink => {
                  resourceLink.title.toLowerCase().should.contain('hippo');
                });
                done();
              });
          });
      });
  });

  it('Post a resourceLink error', (done) => {
    const resourceLink = {
    };

    chai.request(server)
      .post('/api/resourceLinks')
      .send(resourceLink)
      .end((err, res) => {
        if (err) assert.fail(`Getting resourceLinks failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(false);
        res.body.hasOwnProperty('error').should.be.eql(true);

        res.body.error._message.should.be.eql('ResourceLink validation failed');
        res.body.error.name.should.be.eql('ValidationError');
        done();
      });
  });

  it('Delete a resourceLink error', (done) => {
    chai.request(server)
      .delete('/api/resourceLinks')
      .send({ res_id: 5674567546 })
      .end((err, res) => {
        if (err) assert.fail(`Deleting resourceLink failed: ${err}`);
        res.body.hasOwnProperty('error');
        res.body.error.should.be.eql('Unable to find resource link id: 5674567546');
        done();
      });
  });

  it('Get resource links filter by category', (done) => {

    chai.request(server)
      .get('/api/resourceLinks?category=API%20Automation')

      .end((err, res) => {
        if (err) assert.fail(`Get resource links category filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(resourceLinks => {
          resourceLinks.category.should.be.eql('API Automation');
        });
        done();
      });
  });

  it('Get resource links filter by language', (done) => {

    chai.request(server)
      .get('/api/resourceLinks?language=Python')

      .end((err, res) => {
        if (err) assert.fail(`Get resource links language filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(resourceLink => {
          resourceLink.language.should.be.eql('Python');
        });
        done();
      });
  });

  it('Get resource links filter by language and category', (done) => {
    chai.request(server)
      .get('/api/resourceLinks?language=Swift&category=API%20Automation')

      .end((err, res) => {
        if (err) assert.fail(`Get resource links language and category filter failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.data.length.should.be.at.least(1);
        res.body.data.forEach(resourceLink => {
          resourceLink.language.should.be.eql('Swift');
          resourceLink.category.should.be.eql('API Automation');
        });
        done();
      });
  });
});