import ResourceLink from '../../models/resourceLink';
import data from '../data.json';

describe('ResourceLink Tests', () => {
  it('verify required ResourceLink attributes', (done) => {
    const resourceLink = new ResourceLink();

    resourceLink.validate(err => {
      expect(err.errors.title).to.exist;
      expect(err.errors.backgroundImage).to.exist;
      expect(err.errors.category).to.exist;
      expect(err.errors.url).to.exist;
      expect(err.errors.language).to.not.exist;
      done();
    });
  });

  it('resourceLink object creation', (done) => {
    const resourceLink = new ResourceLink({
      title: data.title,
      category: data.category,
      language: data.language,
      url: data.url,
      backgroundImage: data.backgroundImage,
      body: data.body
    });

    resourceLink.validate(err => {
      expect(err === null);
    });

    expect(resourceLink.title).to.equal(data.title);
    expect(resourceLink.category).to.equal(data.category);
    expect(resourceLink.url).to.equal(data.url);
    expect(resourceLink.backgroundImage).to.equal(data.backgroundImage);
    expect(resourceLink.body).to.equal(data.body);
    expect(resourceLink.language).to.equal(data.language);
    done();
  });
});