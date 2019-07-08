const User = require('../../models/user');
const expect = require('chai').expect;
const faker = require('faker');

describe('User Tests', () => {
  it('verify required user attributes', (done) => {
    const user = new User();

    user.validate(err => {
      expect(err.errors.githubName).to.exist;
      expect(err.errors.githubAvatarUrl).to.not.exist;
      expect(err.errors.email).to.exist;

      done();
    });
  });

  it('user object creation', (done) => {
    const githubName = faker.internet.userName();
    const githubAvatarUrl = faker.image.imageUrl();
    const email = faker.internet.email();
    const user = new User({
      githubName: githubName,
      githubAvatarUrl: githubAvatarUrl,
      email: email
    });

    user.validate(err => {
      expect(err === null);
    });

    expect(user.githubName).to.equal(githubName);
    expect(user.githubAvatarUrl).to.equal(githubAvatarUrl);
    expect(user.email).to.equal(email);
    done();
  });
});