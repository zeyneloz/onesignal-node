import 'mocha';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { API_ROOT, APPS_PATH } from '../../src/constants';

import { UserClient } from '../../src/user-client';
import { mockUtilsRequest } from './mock';
import { expectRequestToBe, expectRequestBodyToHave } from './test-helpers';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const { expect } = chai;

describe('Client', () => {
  let sandbox: sinon.SinonSandbox;
  let requestSpy: sinon.SinonSpy;
  let client: UserClient;

  const USER_AUTH_KEY = 'user-auth-key';

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    requestSpy = mockUtilsRequest(sandbox);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('with custom options', () => {
    const CUSTOM_API_ROOT = 'https://localhost/test/onesignal';

    beforeEach(() => {
      client = new UserClient(USER_AUTH_KEY, { apiRoot: CUSTOM_API_ROOT });
    });

    describe('.viewApps', () => {
      it('makes request with given api root', async () => {
        await client.viewApps();
        expect(requestSpy).to.have.callCount(1);
        expect(requestSpy.args[0][0]).to.startsWith(CUSTOM_API_ROOT);
      });
    });
  });

  describe('with default options', () => {
    beforeEach(() => {
      client = new UserClient(USER_AUTH_KEY);
    });

    describe('.viewApps', () => {
      it('makes GET request with correct path and auth', async () => {
        await client.viewApps();
        const expectedPath = `${API_ROOT}/${APPS_PATH}`;
        expectRequestToBe(requestSpy, expectedPath, 'GET', USER_AUTH_KEY);
      });
    });

    describe('.viewApp', () => {
      const appId = 'app-1';

      it('makes GET request with correct path and auth', async () => {
        await client.viewApp(appId);
        const expectedPath = `${API_ROOT}/${APPS_PATH}/${appId}`;
        expectRequestToBe(requestSpy, expectedPath, 'GET', USER_AUTH_KEY);
      });
    });

    describe('.createApp', () => {
      const postBody = {
        name: 'android-app-1',
        apns_env: 'env1',
        android_gcm_sender_id: 'f0f0f0f0',
      };

      it('makes POST request with correct path and auth', async () => {
        await client.createApp(postBody);
        const expectedPath = `${API_ROOT}/${APPS_PATH}`;
        expectRequestToBe(requestSpy, expectedPath, 'POST', USER_AUTH_KEY);
      });

      it('makes request with given body', async () => {
        await client.createApp(postBody);
        expectRequestBodyToHave(requestSpy, postBody);
      });
    });

    describe('.updateApp', () => {
      const appId = 'app1';
      const postBody = {
        android_gcm_sender_id: 'f0e0f0f0',
        email_auth_hash: 'hash',
      };

      it('makes PUT request with correct path and auth', async () => {
        await client.updateApp(appId, postBody);
        const expectedPath = `${API_ROOT}/${APPS_PATH}/${appId}`;
        expectRequestToBe(requestSpy, expectedPath, 'PUT', USER_AUTH_KEY);
      });

      it('makes request with given body', async () => {
        await client.updateApp(appId, postBody);
        expectRequestBodyToHave(requestSpy, postBody);
      });
    });
  });
});
