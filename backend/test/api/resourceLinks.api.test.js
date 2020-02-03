import chai from 'chai';
import chaiHttp from 'chai-http';
import data from '../data.json';
import server from '../../../server';

chai.use(chaiHttp);

describe('ResourceLink', () => {
  it('it should GET all the resourceLinks', async () => {
    const getResourceLinks = await chai.request(server)
      .get('/api/resourceLinks');

    getResourceLinks.should.have.status(200);
    getResourceLinks.body.success.should.be.eql(true);
  });

  it('Post-Get-Delete an resourceLink', async () => {
    const resourceLink = {
      title: data.title,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    const postResourceLink = await chai.request(server)
      .post('/api/resourceLinks')
      .send(resourceLink);

    postResourceLink.should.have.status(201);
    postResourceLink.body.success.should.be.eql(true);
    postResourceLink.body.post.hasOwnProperty('_id').should.be.eql(true);
    postResourceLink.body.post.title.should.be.eql(data.title);
    postResourceLink.body.post.category.should.be.eql(data.category);
    postResourceLink.body.post.language.should.be.eql(data.language);
    postResourceLink.body.post.url.should.be.eql(data.url);
    postResourceLink.body.post.backgroundImage.should.be.eql(data.backgroundImage);
    postResourceLink.body.post.body.should.be.eql(data.body);

    const res_id = postResourceLink.body.post.res_id;

    const getResourceLinks = await chai.request(server)
      .get('/api/resourceLinks');

    getResourceLinks.should.have.status(200);
    getResourceLinks.body.success.should.be.eql(true);
    getResourceLinks.body.data.length.should.be.above(0);

    getResourceLinks.body.data.forEach((resLinkInResponse) => {
      resLinkInResponse.hasOwnProperty('title').should.be.true;
      resLinkInResponse.hasOwnProperty('backgroundImage').should.be.true;
      resLinkInResponse.hasOwnProperty('url').should.be.true;
      resLinkInResponse.hasOwnProperty('category').should.be.true;
      resLinkInResponse.hasOwnProperty('language').should.be.true;
    });

    const deletedResourceLink = await chai.request(server)
      .delete('/api/resourceLinks')
      .send({ res_id: res_id });

    deletedResourceLink.body.message.should.be.eql('Resource Link successfully deleted');
  });

  it('Get resource link search', async () => {
    const resourceLink1 = {
      title: data.title,
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    const resourceLink2 = {
      title: "To be filtered",
      backgroundImage: data.backgroundImage,
      category: data.category,
      language: data.language,
      url: data.url,
      body: data.body
    };

    const postResourceLink1 = await chai.request(server)
      .post('/api/resourceLinks')
      .send(resourceLink1);

    postResourceLink1.should.have.status(201);

    const postResourceLink2 = await chai.request(server)
      .post('/api/resourceLinks')
      .send(resourceLink2);

    postResourceLink2.should.have.status(201);

    const getResourceLinks = await chai.request(server)
      .get('/api/resourceLinks?search=hippo');

    getResourceLinks.should.have.status(200);
    getResourceLinks.body.success.should.be.eql(true);
    getResourceLinks.body.data.length.should.be.at.least(1);
    getResourceLinks.body.data.forEach(resourceLink => {
      resourceLink.title.toLowerCase().should.contain('hippo');
    });
  });

  it('Post a resourceLink error', async () => {
    const resourceLink = {
    };

    const postedResourceLink = await chai.request(server)
      .post('/api/resourceLinks')
      .send(resourceLink);
    postedResourceLink.should.have.status(200);
    postedResourceLink.body.success.should.be.eql(false);
    postedResourceLink.body.hasOwnProperty('error').should.be.eql(true);

    postedResourceLink.body.error._message.should.be.eql('ResourceLink validation failed');
    postedResourceLink.body.error.name.should.be.eql('ValidationError');
  });

  it('Delete a resourceLink error', async () => {
    const deletedResourceLink = await chai.request(server)
      .delete('/api/resourceLinks')
      .send({ res_id: 5674567546 });

    deletedResourceLink.body.hasOwnProperty('error');
    deletedResourceLink.body.error.should.be.eql('Unable to find resource link id: 5674567546');
  });

  it('Get resource links filter by category', async () => {
    const getResourceLinks = await chai.request(server)
      .get('/api/resourceLinks?category=API%20Automation');

    getResourceLinks.should.have.status(200);
    getResourceLinks.body.success.should.be.eql(true);
    getResourceLinks.body.data.length.should.be.at.least(1);
    getResourceLinks.body.data.forEach(resourceLinks => {
      resourceLinks.category.should.be.eql('API Automation');
    });
  });

  it('Get resource links filter by language', async () => {
    const getResourceLinks = await chai.request(server)
      .get('/api/resourceLinks?language=Python');
    getResourceLinks.should.have.status(200);
    getResourceLinks.body.success.should.be.eql(true);
    getResourceLinks.body.data.length.should.be.at.least(1);
    getResourceLinks.body.data.forEach(resourceLink => {
      resourceLink.language.should.be.eql('Python');
    });
  });

  it('Get resource links filter by language and category', async () => {
    const getResourceLinks = await chai.request(server)
      .get('/api/resourceLinks?language=Swift&category=API%20Automation');

    getResourceLinks.should.have.status(200);
    getResourceLinks.body.success.should.be.eql(true);
    getResourceLinks.body.data.length.should.be.at.least(1);
    getResourceLinks.body.data.forEach(resourceLink => {
      resourceLink.language.should.be.eql('Swift');
      resourceLink.category.should.be.eql('API Automation');
    });
  });
});