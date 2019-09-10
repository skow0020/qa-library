import Article from '../../models/article';
import data from '../data.json';

describe('Article Tests', () => {
  it('verify required article attributes', (done) => {
    const article = new Article();

    article.validate(err => {
      expect(err.errors.title).to.exist;
      expect(err.errors.author).to.exist;
      expect(err.errors.backgroundImage).to.exist;
      expect(err.errors.category).to.exist;
      expect(err.errors.url).to.exist;
      expect(err.errors.language).to.not.exist;
      done();
    });
  });

  it('article object creation', (done) => {
    const article = new Article({
      title: data.title,
      author: data.author,
      category: data.category,
      language: data.language,
      url: data.url,
      backgroundImage: data.backgroundImage,
      body: data.body
    });

    article.validate(err => {
      expect(err === null);
    });

    expect(article.title).to.equal(data.title);
    expect(article.author).to.equal(data.author);
    expect(article.category).to.equal(data.category);
    expect(article.url).to.equal(data.url);
    expect(article.backgroundImage).to.equal(data.backgroundImage);
    expect(article.body).to.equal(data.body);
    expect(article.language).to.equal(data.language);
    done();
  });
});