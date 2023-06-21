import chai from 'chai';
import { Resource } from '../Resource';

describe('Resource', () => {
  class Platform {
    id!: string;
    name!: string;
  }

  it('should create a resource with a selfUri', () => {
    const platform = new Platform();
    platform.id = '123456';
    platform.name = 'xbox';

    const resource = new Resource(platform, '/platforms').getResource();

    chai.expect(resource.getLinks()).not.be.undefined;
    chai
      .expect(resource.getLinks())
      .to.be.deep.equal({ self: { href: '/platforms' } });
  });

  it('should create many links', () => {
    const platform = new Platform();
    platform.id = '123456';
    platform.name = 'xbox';

    const resource = new Resource(platform, '/platforms/123456')
      .addLink('list', '/platforms')
      .addLink('update', '/platforms/123456')
      .getResource();

    chai.expect(resource.getLinks()).not.be.undefined;
    chai.expect(resource.getLinks()).to.be.deep.equal({
      self: { href: '/platforms/123456' },
      list: { href: '/platforms' },
      update: { href: '/platforms/123456' },
    });
  });
});
