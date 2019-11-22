import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../../../server';

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

        const user_email = res.body.data[0].email;
        chai.request(server)
          .get(`/api/users/${user_email}`)
          .end((err, res) => {
            if (err) assert.fail(`Getting users failed: ${err}`);

            res.should.have.status(200);
            res.body.success.should.be.eql(true);
            res.body.data.email.should.be.eql(user_email);
            done();
          });
      });
  });

  it('Register-Get-Delete an user', (done) => {
    const user = {
      email: faker.internet.email(),
      password: "password"
    };

    let user_id = null;

    chai.request(server)
      .post('/api/users/register')
      .send(user)
      .end((err, res) => {
        if (err) assert.fail(`Register user failed: ${err}`);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
  
        res.body.email.should.be.eql(user.email);

        chai.request(server)
          .get(`/api/users/${user.email}`)
          .end((err, res) => {
            if (err) assert.fail(`Getting users failed: ${err}`);

            res.should.have.status(200);
            res.body.success.should.be.eql(true);

            user_id = res.body.data.user_id;
            res.body.data.email.should.be.eql(user.email);

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

  it('Register a user error', (done) => {
    const user = {
    };

    chai.request(server)
      .post('/api/users/register')
      .send(user)
      .end((err, res) => {
        if (err) assert.fail(`Posting user failed: ${err}`);

        res.should.have.status(500);
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
        res.body.hasOwnProperty('error').should.be.eql(true);
        res.body.error.should.be.eql('Unable to find user id: 4564564');
        done();
      });
  });
});