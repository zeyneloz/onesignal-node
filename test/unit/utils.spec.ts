import 'mocha';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as nock from 'nock';

import { HTTPError } from '../../src/errors';
import { stripTrailingSlash, jsonToQueryString, basicAuthRequest } from '../../src/utils';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('utils', () => {
  describe('.stripTrailingSlash', () => {
    const testData = [
      ['https://localhost/', 'https://localhost'],
      ['', ''],
      ['///', '//'],
      ['no-slash', 'no-slash'],
      ['/', ''],
    ];

    it('returns stripped strings', () => {
      const results = testData.map(d => stripTrailingSlash(d[0]));
      const expected = testData.map(d => d[1]);
      expect(results).to.be.eql(expected);
    });
  });

  describe('.jsonToQueryString', () => {
    const testData = [
      [{}, ''],
      [{ a: 1 }, 'a=1'],
      [{ offset: '22' }, 'offset=22'],
      [{ offset: '22', limit: -1 }, 'offset=22&limit=-1'],
      [{ offset: '22', limit: '', kind: 'red' }, 'offset=22&limit=&kind=red'],
      [{ op: '%' }, 'op=%25'],
      [{ part: 'mode', word: '/path' }, 'part=mode&word=%2Fpath'],
    ];

    it('returns encodedQueryString strings', () => {
      const results = testData.map(d => jsonToQueryString(d[0]));
      const expected = testData.map(d => d[1]);
      expect(results).to.be.eql(expected);
    });
  });

  describe('.basicAuthRequest', () => {
    const requestHost = 'https://onesignal.com/api/v1';
    const successRequestPath = '/success-endpoint';
    const notFoundRequestPath = '/non-existent-endpoint';
    const internalServerRequestPath = '/gimme-error';
    const coreErrorPath = '/core-error';
    const successRequestUrl = `${requestHost}${successRequestPath}`;
    const notFoundRequestUrl = `${requestHost}${notFoundRequestPath}`;
    const internalServerRequestUrl = `${requestHost}${internalServerRequestPath}`;
    const coreErrorRequestUrl = `${requestHost}${coreErrorPath}`;
    const authKey = 'secret-key';

    const expectedGetResponse: [number, {}] = [
      200,
      {
        success: true,
        id: 10082016,
      },
    ];
    const expectedPostResponse: [number, {}] = [
      201,
      {
        color: 'blue',
      },
    ];
    const expectedDeleteResponse: [number, {}] = [
      200,
      {
        deleted: true,
      },
    ];
    const expectedPutResponse: [number, {}] = [
      200,
      {
        upsert: true,
        id: 0,
      },
    ];
    const notFoundResponse: [number, {}] = [
      404,
      {
        found: false,
      },
    ];
    const internalServerResponse: [number, {}] = [
      500,
      {
        found: false,
      },
    ];

    const postBody = {
      name: 'bojack',
      id: 104,
      age: 50,
    };

    const putBody = {
      age: 51,
    };

    beforeEach(() => {
      const nockOptions = {
        reqheaders: {
          authorization: `Basic ${authKey}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      };

      nock(requestHost, nockOptions)
        .get(successRequestPath)
        .reply(...expectedGetResponse);

      nock(requestHost, nockOptions)
        .post(successRequestPath)
        .reply(...expectedPostResponse);

      nock(requestHost, nockOptions)
        .delete(successRequestPath)
        .reply(...expectedDeleteResponse);

      nock(requestHost, nockOptions)
        .put(successRequestPath)
        .reply(...expectedPutResponse);

      nock(requestHost, nockOptions)
        .get(notFoundRequestPath)
        .reply(...notFoundResponse);

      nock(requestHost, nockOptions)
        .get(internalServerRequestPath)
        .reply(...internalServerResponse);

      nock(requestHost, nockOptions)
        .get(coreErrorPath)
        .replyWithError('someone cut the wire');
    });

    it('returns correct response for GET request', async () => {
      const response = await basicAuthRequest(successRequestUrl, 'GET', authKey);
      expect(response.statusCode).to.be.equal(expectedGetResponse[0]);
      expect(response.body).to.be.eql(expectedGetResponse[1]);
    });

    it('returns correct response for POST request', async () => {
      const response = await basicAuthRequest(successRequestUrl, 'POST', authKey, postBody);
      expect(response.statusCode).to.be.equal(expectedPostResponse[0]);
      expect(response.body).to.be.eql(expectedPostResponse[1]);
    });

    it('returns correct response for PUT request', async () => {
      const response = await basicAuthRequest(successRequestUrl, 'PUT', authKey, putBody);
      expect(response.statusCode).to.be.equal(expectedPutResponse[0]);
      expect(response.body).to.be.eql(expectedPutResponse[1]);
    });

    it('returns correct response for DELETE request', async () => {
      const response = await basicAuthRequest(successRequestUrl, 'DELETE', authKey);
      expect(response.statusCode).to.be.equal(expectedDeleteResponse[0]);
      expect(response.body).to.be.eql(expectedDeleteResponse[1]);
    });

    it('rejects with HTTP error when 404 is returned from server', async () => {
      const promise = basicAuthRequest(notFoundRequestUrl, 'GET', authKey);
      await expect(promise).to.be.rejectedWith(HTTPError);
    });

    it('rejects with HTTP error when 500 is returned from server', async () => {
      const promise = basicAuthRequest(internalServerRequestUrl, 'GET', authKey);
      await expect(promise).to.be.rejectedWith(HTTPError);
    });

    it('rejects with ERROR when request fails with an error', async () => {
      const promise = basicAuthRequest(coreErrorRequestUrl, 'GET', authKey);
      await expect(promise).to.be.rejectedWith(Error);
    });
  });
});
