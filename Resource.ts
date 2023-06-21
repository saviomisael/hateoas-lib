import { Link } from './Link';

type ResourceInstance = {
  [key: string]: any;
  _links: Record<string, Link>;
  getLinks: () => Record<string, Link>;
};

export class Resource<T> {
  resource: ResourceInstance = {
    _links: {},
    getLinks() {
      return this._links;
    },
  };

  constructor(data: T, selfUri: string) {
    Object.assign(this.resource, data);
    this.resource._links = {};
    this.resource._links.self = { href: selfUri };
  }

  addLink(rel: string, uri: string) {
    this.resource._links[rel] = { href: uri };
    return this;
  }

  getResource() {
    return this.resource;
  }
}
