import chai from 'chai';
import chaiHttp from 'chai-http';
import data from '../data.json';
import server from '../../../server';

chai.use(chaiHttp);

describe('Articles', () => {
  it('it should GET all the articles', async () => {
    const getArticle = await chai.request(server)
      .get('/api/articles');

    getArticle.should.have.status(200);
    getArticle.body.success.should.be.eql(true);
  });

  it('Post-Get-Delete an article', async () => {
    const article = {
      title: data.title,
      author: data.author,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    const postedArticle = await chai.request(server)
      .post('/api/articles')
      .send(article);

    postedArticle.should.have.status(201);
    postedArticle.body.success.should.be.eql(true);
    postedArticle.body.post.hasOwnProperty('_id').should.be.eql(true);
    postedArticle.body.post.title.should.be.eql(data.title);
    postedArticle.body.post.author.should.be.eql(data.author);
    postedArticle.body.post.category.should.be.eql(data.category);
    postedArticle.body.post.language.should.be.eql(data.language);
    postedArticle.body.post.url.should.be.eql(data.url);
    postedArticle.body.post.backgroundImage.should.be.eql(data.backgroundImage);
    postedArticle.body.post.body.should.be.eql(data.body);

    const article_id = postedArticle.body.post.article_id;

    const getArticles = await chai.request(server)
      .get('/api/articles');

    getArticles.should.have.status(200);
    getArticles.body.success.should.be.eql(true);
    getArticles.body.data.length.should.be.above(0);

    getArticles.body.data.forEach((articleInResponse) => {
      articleInResponse.hasOwnProperty('title').should.be.true;
      articleInResponse.hasOwnProperty('author').should.be.true;
      articleInResponse.hasOwnProperty('backgroundImage').should.be.true;
      articleInResponse.hasOwnProperty('url').should.be.true;
      articleInResponse.hasOwnProperty('category').should.be.true;
      articleInResponse.hasOwnProperty('language').should.be.true;
    });

    const deleted = await chai.request(server)
      .delete('/api/articles')
      .send({ article_id });

    deleted.body.message.should.be.eql('Article successfully deleted');
  });

  it('Get Article title search', async () => {
    const article1 = {
      title: data.title,
      author: data.author,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    const article2 = {
      title: "TITLE 2",
      author: data.author,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    const postArticle = await chai.request(server)
      .post('/api/articles')
      .send(article1);

    postArticle.should.have.status(201);

    const postArticle2 = await chai.request(server)
      .post('/api/articles')
      .send(article2);

    postArticle2.should.have.status(201);

    const getArticle = await chai.request(server)
      .get('/api/articles?search=hippo');

    getArticle.should.have.status(200);
    getArticle.body.success.should.be.eql(true);
    getArticle.body.data.length.should.be.at.least(1);
    getArticle.body.data.forEach(article => {
      article.title.toLowerCase().should.contain('hippo');
    });
  });

  it('Post an article error', async () => {
    const article = {
    };

    const postArticle = await chai.request(server)
      .post('/api/articles')
      .send(article);

    postArticle.should.have.status(200);
    postArticle.body.success.should.be.eql(false);
    postArticle.body.hasOwnProperty('error').should.be.eql(true);
    postArticle.body.error._message.should.be.eql('Article validation failed');
    postArticle.body.error.name.should.be.eql('ValidationError');
  });

  it('Delete an article error', async () => {
    const deleteArticle = await chai.request(server)
      .delete('/api/articles')
      .send({ article_id: 4564564 });

    deleteArticle.body.hasOwnProperty('error');
    deleteArticle.body.error.should.be.eql('Unable to find article id: 4564564');
  });

  it('Get articles filter by category', async () => {
    const getArticles = await chai.request(server)
      .get('/api/articles?category=API%20Automation');

    getArticles.should.have.status(200);
    getArticles.body.success.should.be.eql(true);
    getArticles.body.data.length.should.be.at.least(1);
    getArticles.body.data.forEach(article => {
      article.category.should.be.eql('API Automation');
    });
  });

  it('Get articles filter by language', async () => {
    const getArticles = await chai.request(server)
      .get('/api/articles?language=Python');

    getArticles.should.have.status(200);
    getArticles.body.success.should.be.eql(true);
    getArticles.body.data.length.should.be.at.least(1);
    getArticles.body.data.forEach(article => {
      article.language.should.be.eql('Python');
    });
  });

  it('Get articles filter by language and category', async () => {
    const getArticles = await chai.request(server)
      .get('/api/articles?language=Swift&category=API%20Automation');

    getArticles.should.have.status(200);
    getArticles.body.success.should.be.eql(true);
    getArticles.body.data.length.should.be.at.least(1);
    getArticles.body.data.forEach(article => {
      article.language.should.be.eql('Swift');
      article.category.should.be.eql('API Automation');
    });
  });
});