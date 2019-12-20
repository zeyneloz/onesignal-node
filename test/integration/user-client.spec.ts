import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import './onesignal-mock';
import * as response from './response';
import { APP1, MOCKED_API_HOST, MOCKED_FAILING_400_API_HOST, USER_AUTH_KEY } from './constants';
import { UserClient } from '../../src/user-client';
import { HTTPError } from '../../src/errors';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Test UserClient for (MOCKED_API_HOST)', () => {
  const client = new UserClient(USER_AUTH_KEY, { apiRoot: MOCKED_API_HOST });

  describe('(viewApps)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.viewApps();
      expect(resp.statusCode).to.be.equal(response.viewAppsResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.viewAppsResponse['200OK'].response);
    });
  });

  describe('(viewApp)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.viewApp(APP1.appId);
      expect(resp.statusCode).to.be.equal(response.viewAppResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.viewAppResponse['200OK'].response);
    });
  });

  describe('(createApp)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.createApp({ name: 'new app' });
      expect(resp.statusCode).to.be.equal(response.createAppResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.createAppResponse['200OK'].response);
    });
  });

  describe('(updateApp)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.updateApp(APP1.appId, {});
      expect(resp.statusCode).to.be.equal(response.updateAppResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.updateAppResponse['200OK'].response);
    });
  });
});

describe('Test UserClient for (MOCKED_FAILING_400_API_HOST)', () => {
  const client = new UserClient(USER_AUTH_KEY, { apiRoot: MOCKED_FAILING_400_API_HOST });

  describe('(createNotification)', () => {
    it('rejects with HTTPError for 400 BAD_REQUEST', async () => {
      const promise = client.createApp({ name: 'new app' });
      expect(promise).to.be.rejectedWith(HTTPError);
    });
  });
});
