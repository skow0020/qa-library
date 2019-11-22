import User from '../../models/user';
import faker from 'faker';

describe('User Tests', () => {
  it('verify required user attributes', (done) => {
    const user = new User();

    user.validate(err => {
      expect(err.errors.password).to.exist;
      expect(err.errors.email).to.exist;

      done();
    });
  });

  it('user object creation', (done) => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = new User({
      email: email,
      password: password
    });

    user.validate(err => {
      expect(err === null);
    });

    expect(user.email).to.equal(email);
    expect(user.password).to.equal(password);
    done();
  });
});