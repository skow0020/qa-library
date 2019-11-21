import chai from 'chai';
import chaiHttp from 'chai-http';
import data from '../data.json';
import server from '../../../server';

chai.use(chaiHttp);

describe('Tutorial', () => {
  it('it should GET all the tutorial', async () => {
    const getTutorials = await chai.request(server)
      .get('/api/tutorials');

    getTutorials.should.have.status(200);
    getTutorials.body.success.should.be.eql(true);
  });

  it('Post-Get-Delete a tutorial', async () => {
    const tutorial = {
      title: data.title,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    const postTutorial = await chai.request(server)
      .post('/api/tutorials')
      .send(tutorial);

    postTutorial.should.have.status(201);
    postTutorial.body.success.should.be.eql(true);
    postTutorial.body.post.hasOwnProperty('_id').should.be.eql(true);
    postTutorial.body.post.title.should.be.eql(data.title);
    postTutorial.body.post.category.should.be.eql(data.category);
    postTutorial.body.post.language.should.be.eql(data.language);
    postTutorial.body.post.url.should.be.eql(data.url);
    postTutorial.body.post.backgroundImage.should.be.eql(data.backgroundImage);
    postTutorial.body.post.body.should.be.eql(data.body);

    const tut_id = postTutorial.body.post.tut_id;

    const getTutorials = await chai.request(server)
      .get('/api/tutorials');

    getTutorials.should.have.status(200);
    getTutorials.body.success.should.be.eql(true);
    getTutorials.body.data.length.should.be.above(0);

    getTutorials.body.data.forEach((tutorialInResponse) => {
      tutorialInResponse.hasOwnProperty('title').should.be.true;
      tutorialInResponse.hasOwnProperty('backgroundImage').should.be.true;
      tutorialInResponse.hasOwnProperty('url').should.be.true;
      tutorialInResponse.hasOwnProperty('category').should.be.true;
      tutorialInResponse.hasOwnProperty('language').should.be.true;
    });

    const deleteTutorial = await chai.request(server)
      .delete('/api/tutorials')
      .send({ tut_id: tut_id });

    deleteTutorial.body.message.should.be.eql('Tutorial successfully deleted');
  });

  it('Get tutorial search', async () => {
    const tutorial1 = {
      title: data.title,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    const tutorial2 = {
      title: 'GOOBA GOOBA GOO!',
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    const postTutorial1 = await chai.request(server)
      .post('/api/tutorials')
      .send(tutorial1);

    postTutorial1.should.have.status(201);

    const postTutorial2 = await chai.request(server)
      .post('/api/tutorials')
      .send(tutorial2);

    postTutorial2.should.have.status(201);

    const getTutorials = await chai.request(server)
      .get('/api/tutorials?search=hippo');

    getTutorials.should.have.status(200);
    getTutorials.body.success.should.be.eql(true);
    getTutorials.body.data.length.should.be.at.least(1);
    getTutorials.body.data.forEach(tutorial => {
      tutorial.title.toLowerCase().should.contain('hippo');
    });
  });

  it('Post a tutorial error', async () => {
    const tutorial = {
    };

    const postedTutorial = await chai.request(server)
      .post('/api/tutorials')
      .send(tutorial);

    postedTutorial.should.have.status(200);
    postedTutorial.body.success.should.be.eql(false);
    postedTutorial.body.hasOwnProperty('error').should.be.eql(true);

    postedTutorial.body.error._message.should.be.eql('Tutorial validation failed');
    postedTutorial.body.error.name.should.be.eql('ValidationError');
  });

  it('Delete a tutorial error', async () => {
    const deletedTutorial = await chai.request(server)
      .delete('/api/tutorials')
      .send({ tut_id: 34532452345 });

    deletedTutorial.body.hasOwnProperty('error');
    deletedTutorial.body.error.should.be.eql('Unable to find tutorial id: 34532452345');
  });

  it('Get tutorials filter by category', async () => {

    const getTutorials = await chai.request(server)
      .get('/api/tutorials?category=API%20Automation');

    getTutorials.should.have.status(200);
    getTutorials.body.success.should.be.eql(true);
    getTutorials.body.data.length.should.be.at.least(1);
    getTutorials.body.data.forEach(tutorials => {
      tutorials.category.should.be.eql('API Automation');
    });
  });

  it('Get tutorials filter by language', async () => {
    const getTutorials = await chai.request(server)
      .get('/api/tutorials?language=Python');

    getTutorials.should.have.status(200);
    getTutorials.body.success.should.be.eql(true);
    getTutorials.body.data.length.should.be.at.least(1);
    getTutorials.body.data.forEach(tutorial => {
      tutorial.language.should.be.eql('Python');
    });
  });

  it('Get tutorials filter by language and category', async () => {
    const getTutorials = await chai.request(server)
      .get('/api/tutorials?language=Swift&category=API%20Automation');

    getTutorials.should.have.status(200);
    getTutorials.body.success.should.be.eql(true);
    getTutorials.body.data.length.should.be.at.least(1);
    getTutorials.body.data.forEach(tutorial => {
      tutorial.language.should.be.eql('Swift');
      tutorial.category.should.be.eql('API Automation');
    });
  });
});