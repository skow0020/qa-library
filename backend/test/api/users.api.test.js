import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../../server';
import faker from 'faker';

chai.use(chaiHttp);

describe('Users', () => {
  it('it should GET all the users', (done) => {
    chai.request(server)
      .get('/api/users')
      .end((err, res) => {
        if (err) assert.fail(`Getting users failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        done();
      });
  });

  it('it should GET user by email', (done) => {
    chai.request(server)
      .get('/api/users')
      .end((err, res) => {
        if (err) assert.fail(`Getting users failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(true);

        chai.request(server)
          .get(`/api/users/${res.body.data[0].email}`)
          .end((err, res) => {
            if (err) assert.fail(`Getting users failed: ${err}`);

            res.should.have.status(200);
            res.body.success.should.be.eql(true);
            res.body.data.length.should.be.eql(1);
            done();
          });
      });
  });

  it('Post-Get-Delete an user', (done) => {
    const user = {
      githubName: faker.internet.userName(),
      githubAvatarUrl: faker.image.imageUrl(),
      email: faker.internet.email()
    };

    let user_id = null;

    chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        if (err) assert.fail(`Post user failed: ${err}`);

        res.should.have.status(201);
        res.body.success.should.be.eql(true);
        res.body.post.hasOwnProperty('_id').should.be.eql(true);
        res.body.post.githubName.should.be.eql(user.githubName);
        res.body.post.githubAvatarUrl.should.be.eql(user.githubAvatarUrl);
        res.body.post.email.should.be.eql(user.email);

        user_id = res.body.post.user_id;

        chai.request(server)
          .get('/api/users')
          .end((err, res) => {
            if (err) assert.fail(`Getting users failed: ${err}`);

            res.should.have.status(200);
            res.body.success.should.be.eql(true);
            res.body.data.length.should.be.above(0);

            res.body.data.forEach((articleInResponse) => {
              articleInResponse.hasOwnProperty('githubName').should.be.true;
              articleInResponse.hasOwnProperty('githubAvatarUrl').should.be.true;
              articleInResponse.hasOwnProperty('email').should.be.true;
            });

            chai.request(server)
              .delete('/api/users')
              .send({ user_id: user_id })
              .end((err, res) => {
                if (err) assert.fail(`Deleting user failed: ${err}`);
                res.body.message.should.be.eql('User successfully deleted');
                done();
              });
          });
      });
  });

  it('Post a user error', (done) => {
    const user = {
    };

    chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        if (err) assert.fail(`Posting user failed: ${err}`);

        res.should.have.status(200);
        res.body.success.should.be.eql(false);
        res.body.hasOwnProperty('error').should.be.eql(true);

        res.body.error._message.should.be.eql('User validation failed');
        res.body.error.name.should.be.eql('ValidationError');
        done();
      });
  });

  it('Delete an user error', (done) => {
    chai.request(server)
      .delete('/api/users')
      .send({ user_id: 4564564 })
      .end((err, res) => {
        if (err) assert.fail(`Deleting user failed: ${err}`);
        res.body.hasOwnProperty('error');
        res.body.error.should.be.eql('Unable to find user id: 4564564');
        done();
      });
  });
});