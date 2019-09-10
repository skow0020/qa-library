import Tutorial from '../../models/tutorial';
import data from '../data.json';

describe('Tutorial Tests', () => {
  it('verify required Tutorial attributes', (done) => {
    const tutorial = new Tutorial();

    tutorial.validate(err => {
      expect(err.errors.title).to.exist;
      expect(err.errors.backgroundImage).to.exist;
      expect(err.errors.category).to.exist;
      expect(err.errors.url).to.exist;
      expect(err.errors.language).to.not.exist;
      done();
    });
  });

  it('tutorial object creation', (done) => {
    const tutorial = new Tutorial({
      title: data.title,
      category: data.category,
      language: data.language,
      url: data.url,
      backgroundImage: data.backgroundImage,
      body: data.body
    });

    tutorial.validate(err => {
      expect(err === null);
    });

    expect(tutorial.title).to.equal(data.title);
    expect(tutorial.category).to.equal(data.category);
    expect(tutorial.url).to.equal(data.url);
    expect(tutorial.backgroundImage).to.equal(data.backgroundImage);
    expect(tutorial.body).to.equal(data.body);
    expect(tutorial.language).to.equal(data.language);
    done();
  });
});