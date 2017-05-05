import App from '../app';
import * as Chai from 'chai';
const expect = Chai.expect;

describe('App', () => {
  describe('#hello()', () => {
    it('should result in hello', () => {
      const app = new App();
      expect(app.hello()).to.eq('hello');
    });
  });
});