import { URL } from 'url';

import 'mocha';

import * as chai from 'chai';
import * as chaiString from 'chai-string';
import * as sinon from 'sinon';

chai.use(chaiString);
const { expect } = chai;

export const expectRequestToBe = (spy: sinon.SinonSpy, path: string, method: string, key: string): void => {
  expect(spy.args[0][0]).to.be.startsWith(path);
  expect(spy.args[0][1]).to.be.equal(method);
  expect(spy.args[0][2]).to.be.equal(key);
};

export const expectRequestParamsToHave = (spy: sinon.SinonSpy, expectedParams: {}): void => {
  const url = new URL(spy.args[0][0]);

  for (const [key, value] of Object.entries(expectedParams)) {
    expect(url.searchParams.get(key)).to.be.eql(`${value}`);
  }
};

export const expectRequestBodyToHave = (spy: sinon.SinonSpy, body: {}): void => {
  for (const [key, value] of Object.entries(body)) {
    expect(spy.args[0][3]).to.have.property(key, value);
  }
};
