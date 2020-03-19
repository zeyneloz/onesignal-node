import 'mocha';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import {
  API_ROOT,
  NOTIFICATIONS_PATH,
  NOTIFICATIONS_HISTORY,
  DEVICES_PATH,
  DEVICES_ONSESSION,
  DEVICES_ONPURCHASE,
  DEVICES_ONFOCUS,
  DEVICES_CSVEXPORT,
  APPS_PATH,
  APPS_SEGMENTS,
  APP_ID_FIELD_NAME,
  APP_ID_QUERY_NAME,
} from '../../src/constants';

import { Client } from '../../src/client';
import { mockUtilsRequest } from './mock';
import { expectRequestToBe, expectRequestParamsToHave, expectRequestBodyToHave } from './test-helpers';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const { expect } = chai;

describe('Client', () => {
  let sandbox: sinon.SinonSandbox;
  let requestSpy: sinon.SinonSpy;
  let client: Client;

  const APP_ID = 'app-id';
  const APP_API_KEY = 'api-key';

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
      client = new Client(APP_ID, APP_API_KEY, { apiRoot: CUSTOM_API_ROOT });
    });

    describe('.createNotification', () => {
      it('makes request with given api root', async () => {
        await client.createNotification({});
        expect(requestSpy).to.have.callCount(1);
        expect(requestSpy.args[0][0]).to.startsWith(CUSTOM_API_ROOT);
      });
    });
  });

  describe('with default options', () => {
    beforeEach(() => {
      client = new Client(APP_ID, APP_API_KEY);
    });

    describe('.createNotification', () => {
      it('makes POST request with correct path and auth', async () => {
        await client.createNotification({});
        const expectedPath = `${API_ROOT}/${NOTIFICATIONS_PATH}`;
        expectRequestToBe(requestSpy, expectedPath, 'POST', APP_API_KEY);
      });

      it('includes app_id in request body', async () => {
        await client.createNotification({});
        expectRequestBodyToHave(requestSpy, { [APP_ID_FIELD_NAME]: APP_ID });
      });

      it('makes request with given body', async () => {
        const postBody = {
          included_segments: ['android'],
          contents: { en: 'hey there' },
        };

        await client.createNotification(postBody);
        expectRequestBodyToHave(requestSpy, postBody);
      });
    });

    describe('.cancelNotification', () => {
      const notificationId = 'notification-1';

      it('makes DELETE request with correct path and auth', async () => {
        await client.cancelNotification(notificationId);
        const expectedPath = `${API_ROOT}/${NOTIFICATIONS_PATH}/${notificationId}`;
        expectRequestToBe(requestSpy, expectedPath, 'DELETE', APP_API_KEY);
        expectRequestParamsToHave(requestSpy, { [APP_ID_QUERY_NAME]: APP_ID });
      });
    });

    describe('.viewNotification', () => {
      const notificationId = 'notification-1';

      it('makes GET request with correct path and auth', async () => {
        await client.viewNotification(notificationId);
        const expectedPath = `${API_ROOT}/${NOTIFICATIONS_PATH}/${notificationId}`;
        expectRequestToBe(requestSpy, expectedPath, 'GET', APP_API_KEY);
        expectRequestParamsToHave(requestSpy, { [APP_ID_QUERY_NAME]: APP_ID });
      });
    });

    describe('.viewNotifications', () => {
      it('makes GET request with correct path and auth without query', async () => {
        await client.viewNotifications();
        const expectedPath = `${API_ROOT}/${NOTIFICATIONS_PATH}`;
        expectRequestToBe(requestSpy, expectedPath, 'GET', APP_API_KEY);
        expectRequestParamsToHave(requestSpy, { [APP_ID_QUERY_NAME]: APP_ID });
      });

      it('includes query params in url when query is given', async () => {
        const query = {
          limit: 100,
          kind: 1,
        };
        await client.viewNotifications(query);
        expectRequestParamsToHave(requestSpy, { [APP_ID_QUERY_NAME]: APP_ID, ...query });
      });
    });

    describe('.notificationHistory', () => {
      const notificationId = 'notification-1';
      const postBody = {
        events: 'sent',
        email: 'test-email@1.com',
      };

      it('makes POST request with correct path and auth', async () => {
        await client.notificationHistory(notificationId, postBody);
        const expectedPath = `${API_ROOT}/${NOTIFICATIONS_PATH}/${notificationId}/${NOTIFICATIONS_HISTORY}`;
        expectRequestToBe(requestSpy, expectedPath, 'POST', APP_API_KEY);
      });

      it('includes app_id in request body', async () => {
        await client.notificationHistory(notificationId, postBody);
        expectRequestBodyToHave(requestSpy, { [APP_ID_FIELD_NAME]: APP_ID });
      });

      it('makes request with given body', async () => {
        await client.notificationHistory(notificationId, postBody);
        expectRequestBodyToHave(requestSpy, postBody);
      });
    });

    describe('.viewDevices', () => {
      it('makes GET request with correct path and auth without query', async () => {
        await client.viewDevices();
        const expectedPath = `${API_ROOT}/${DEVICES_PATH}`;
        expectRequestToBe(requestSpy, expectedPath, 'GET', APP_API_KEY);
        expectRequestParamsToHave(requestSpy, { [APP_ID_QUERY_NAME]: APP_ID });
      });

      it('includes query params in url when query is given', async () => {
        const query = {
          limit: 50,
          offset: 44,
        };
        await client.viewDevices(query);
        expectRequestParamsToHave(requestSpy, { [APP_ID_QUERY_NAME]: APP_ID, ...query });
      });
    });

    describe('.viewDevice', () => {
      const deviceId = 'player-1';

      it('makes GET request with correct path and auth', async () => {
        await client.viewDevice(deviceId);
        const expectedPath = `${API_ROOT}/${DEVICES_PATH}/${deviceId}`;
        expectRequestToBe(requestSpy, expectedPath, 'GET', APP_API_KEY);
        expectRequestParamsToHave(requestSpy, { [APP_ID_QUERY_NAME]: APP_ID });
      });
    });

    describe('.addDevice', () => {
      const postBody = {
        device_type: 1,
        language: 'tr',
        sdk: 'ios',
      };

      it('makes POST request with correct path and auth', async () => {
        await client.addDevice(postBody);
        const expectedPath = `${API_ROOT}/${DEVICES_PATH}`;
        expectRequestToBe(requestSpy, expectedPath, 'POST', APP_API_KEY);
      });

      it('includes app_id in request body', async () => {
        await client.addDevice(postBody);
        expectRequestBodyToHave(requestSpy, { [APP_ID_FIELD_NAME]: APP_ID });
      });

      it('makes request with given body', async () => {
        await client.addDevice(postBody);
        expectRequestBodyToHave(requestSpy, postBody);
      });
    });

    describe('.editDevice', () => {
      const deviceId = 'player-1';
      const postBody = {
        ad_id: 'f1ff0f0f',
        country: 'germany',
      };

      it('makes PUT request with correct path and auth', async () => {
        await client.editDevice(deviceId, postBody);
        const expectedPath = `${API_ROOT}/${DEVICES_PATH}/${deviceId}`;
        expectRequestToBe(requestSpy, expectedPath, 'PUT', APP_API_KEY);
      });

      it('includes app_id in request body', async () => {
        await client.editDevice(deviceId, postBody);
        expectRequestBodyToHave(requestSpy, { [APP_ID_FIELD_NAME]: APP_ID });
      });

      it('makes request with given body', async () => {
        await client.editDevice(deviceId, postBody);
        expectRequestBodyToHave(requestSpy, postBody);
      });
    });

    describe('.newSession', () => {
      const deviceId = 'player-1';
      const postBody = {};

      it('makes POST request with correct path and auth', async () => {
        await client.newSession(deviceId, postBody);
        const expectedPath = `${API_ROOT}/${DEVICES_PATH}/${deviceId}/${DEVICES_ONSESSION}`;
        expectRequestToBe(requestSpy, expectedPath, 'POST', APP_API_KEY);
      });

      it('includes app_id in request body', async () => {
        await client.editDevice(deviceId, postBody);
        expectRequestBodyToHave(requestSpy, { [APP_ID_FIELD_NAME]: APP_ID });
      });

      it('makes request with given body', async () => {
        await client.editDevice(deviceId, postBody);
        expectRequestBodyToHave(requestSpy, postBody);
      });
    });

    describe('.newPurchase', () => {
      const deviceId = 'player-1';
      const postBody = {
        purchases: [{ sku: 'sku1', amount: 0.5, iso: 'EUR' }],
      };

      it('makes POST request with correct path and auth', async () => {
        await client.newPurchase(deviceId, postBody);
        const expectedPath = `${API_ROOT}/${DEVICES_PATH}/${deviceId}/${DEVICES_ONPURCHASE}`;
        expectRequestToBe(requestSpy, expectedPath, 'POST', APP_API_KEY);
      });

      it('includes app_id in request body', async () => {
        await client.newPurchase(deviceId, postBody);
        expectRequestBodyToHave(requestSpy, { [APP_ID_FIELD_NAME]: APP_ID });
      });

      it('makes request with given body', async () => {
        await client.newPurchase(deviceId, postBody);
        expectRequestBodyToHave(requestSpy, postBody);
      });
    });

    describe('.incrementSessionLength', () => {
      const deviceId = 'player-2';
      const postBody = {
        state: 'ping',
        active_time: 40,
      };

      it('makes POST request with correct path and auth', async () => {
        await client.incrementSessionLength(deviceId, postBody);
        const expectedPath = `${API_ROOT}/${DEVICES_PATH}/${deviceId}/${DEVICES_ONFOCUS}`;
        expectRequestToBe(requestSpy, expectedPath, 'POST', APP_API_KEY);
      });

      it('includes app_id in request body', async () => {
        await client.incrementSessionLength(deviceId, postBody);
        expectRequestBodyToHave(requestSpy, { [APP_ID_FIELD_NAME]: APP_ID });
      });

      it('makes request with given body', async () => {
        await client.incrementSessionLength(deviceId, postBody);
        expectRequestBodyToHave(requestSpy, postBody);
      });
    });

    describe('.exportCSV', () => {
      const postBody = {
        extra_fields: ['ip', 'web_auth'],
        segment_name: 'cools',
      };

      it('makes POST request with correct path and auth', async () => {
        await client.exportCSV(postBody);
        const expectedPath = `${API_ROOT}/${DEVICES_PATH}/${DEVICES_CSVEXPORT}`;
        expectRequestToBe(requestSpy, expectedPath, 'POST', APP_API_KEY);
        expectRequestParamsToHave(requestSpy, { [APP_ID_QUERY_NAME]: APP_ID });
      });

      it('makes request with given body', async () => {
        await client.exportCSV(postBody);
        expectRequestBodyToHave(requestSpy, postBody);
      });
    });

    describe('.incrementSessionLength', () => {
      const postBody = {
        name: 'cools',
        filters: [{ field: 'session_count', relation: '>', value: 1 }, { operator: 'AND' }],
      };

      it('makes POST request with correct path and auth', async () => {
        await client.createSegment(postBody);
        const expectedPath = `${API_ROOT}/${APPS_PATH}/${APP_ID}/${APPS_SEGMENTS}`;
        expectRequestToBe(requestSpy, expectedPath, 'POST', APP_API_KEY);
      });

      it('makes request with given body', async () => {
        await client.createSegment(postBody);
        expectRequestBodyToHave(requestSpy, postBody);
      });
    });

    describe('.deleteSegment', () => {
      const segmentId = 'cools';

      it('makes DELETE request with correct path and auth', async () => {
        await client.deleteSegment(segmentId);
        const expectedPath = `${API_ROOT}/${APPS_PATH}/${APP_ID}/${APPS_SEGMENTS}/${segmentId}`;
        expectRequestToBe(requestSpy, expectedPath, 'DELETE', APP_API_KEY);
      });
    });

    describe('.deleteDevice', () => {
      const deviceId = 'player-1';

      it('makes DELETE request with correct path and auth', async () => {
        await client.deleteDevice(deviceId);
        const expectedPath = `${API_ROOT}/${DEVICES_PATH}/${deviceId}?app_id=${APP_ID}`;
        expectRequestToBe(requestSpy, expectedPath, 'DELETE', APP_API_KEY);
      });
    });
  });
});
