import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../../../server';

chai.use(chaiHttp);

describe('Users', () => {
  it('it should GET all the users', async () => {
    const getUsers = await chai.request(server)
      .get('/api/users');

    getUsers.should.have.status(200);
    getUsers.body.success.should.be.eql(true);
  });

  it('it should GET user by email', async () => {
    const getUsers = await chai.request(server)
      .get('/api/users');

    getUsers.should.have.status(200);
    getUsers.body.success.should.be.eql(true);

    const user_email = getUsers.body.data[0].email;

    const getUserByEmail = await chai.request(server)
      .get(`/api/users/${user_email}`);

    getUserByEmail.should.have.status(200);
    getUserByEmail.body.success.should.be.eql(true);
    getUserByEmail.body.data.email.should.be.eql(user_email);
  });

  it('Register-Get-Delete an user', async () => {
    const user = {
      email: faker.internet.email(),
      password: "password"
    };

    const getUsers = await chai.request(server)
      .post('/api/users/register')
      .send(user);

    getUsers.should.have.status(200);
    getUsers.body.success.should.be.eql(true);
    getUsers.body.email.should.be.eql(user.email);

    const getUserByEmail = await chai.request(server)
      .get(`/api/users/${user.email}`);

    getUserByEmail.should.have.status(200);
    getUserByEmail.body.success.should.be.eql(true);

    const user_id = getUserByEmail.body.data.user_id;
    getUserByEmail.body.data.email.should.be.eql(user.email);

    const deletedUser = await chai.request(server)
      .delete('/api/users')
      .send({ user_id: user_id });
    deletedUser.body.message.should.be.eql('User successfully deleted');
  });

  it('Register a user error', async () => {
    const user = {
    };

    const postedUser = await chai.request(server)
      .post('/api/users/register')
      .send(user);

    postedUser.should.have.status(500);
    postedUser.body.success.should.be.eql(false);
    postedUser.body.hasOwnProperty('error').should.be.eql(true);

    postedUser.body.error._message.should.be.eql('User validation failed');
    postedUser.body.error.name.should.be.eql('ValidationError');
  });

  it('Delete an user error', async () => {
    const deletedUser = await chai.request(server)
      .delete('/api/users')
      .send({ user_id: 4564564 });

    deletedUser.body.hasOwnProperty('error').should.be.eql(true);
    deletedUser.body.error.should.be.eql('Unable to find user id: 4564564');
  });
});