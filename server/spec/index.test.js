import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Handle all GET requests on / and /api/v1 routes', () => {
  it('should return 200 and success message for the / route', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Welcome to Politico');
        done(err);
      });
  });
  it('should return a 200 and success message for the /api/v1 route', (done) => {
    chai
      .request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('Welcome to Politico API v1');
        done(err);
      });
  });
});
