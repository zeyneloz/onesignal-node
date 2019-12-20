import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import './onesignal-mock';
import * as response from './response';
import {
  APP1,
  APP1_DEVICE1,
  APP1_NOTIFICATION1,
  APP1_SEGMENT1,
  MOCKED_API_HOST,
  MOCKED_FAILING_400_API_HOST,
} from './constants';
import { Client } from '../../src/client';
import { HTTPError } from '../../src/errors';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Test Client for (APP1, MOCKED_API_HOST)', () => {
  const client = new Client(APP1.appId, APP1.apiKey, { apiRoot: MOCKED_API_HOST });

  describe('(createNotification)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.createNotification({ contents: { en: 'testing' } });
      expect(resp.statusCode).to.be.equal(response.createNotificationResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.createNotificationResponse['200OK'].response);
    });
  });

  describe('(cancelNotification)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.cancelNotification(APP1_NOTIFICATION1);
      expect(resp.statusCode).to.be.equal(response.cancelNotificationResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.cancelNotificationResponse['200OK'].response);
    });
  });

  describe('(viewNotification)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.viewNotification(APP1_NOTIFICATION1);
      expect(resp.statusCode).to.be.equal(response.viewNotificationResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.viewNotificationResponse['200OK'].response);
    });
  });

  describe('(viewNotifications)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.viewNotifications();
      expect(resp.statusCode).to.be.equal(response.viewNotificationsResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.viewNotificationsResponse['200OK'].response);
    });

    it('returns 200 OK and correct response with query', async () => {
      const resp = await client.viewNotifications({ limit: 1, kind: 2 });
      expect(resp.statusCode).to.be.equal(response.viewNotificationsResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.viewNotificationsResponse['200OK'].response);
    });
  });

  describe('(notificationHistory)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.notificationHistory(APP1_NOTIFICATION1, { events: '', email: '' });
      expect(resp.statusCode).to.be.equal(response.notificationHistoryResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.notificationHistoryResponse['200OK'].response);
    });
  });

  describe('(viewDevices)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.viewDevices();
      expect(resp.statusCode).to.be.equal(response.viewDevicesResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.viewDevicesResponse['200OK'].response);
    });

    it('returns 200 OK and correct response with query', async () => {
      const resp = await client.viewDevices({ limit: 3, offset: 2 });
      expect(resp.statusCode).to.be.equal(response.viewDevicesResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.viewDevicesResponse['200OK'].response);
    });
  });

  describe('(viewDevice)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.viewDevice(APP1_DEVICE1);
      expect(resp.statusCode).to.be.equal(response.viewDeviceResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.viewDeviceResponse['200OK'].response);
    });
  });

  describe('(addDevice)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.addDevice({ device_type: 2, ad_id: '452' });
      expect(resp.statusCode).to.be.equal(response.addDeviceResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.addDeviceResponse['200OK'].response);
    });
  });

  describe('(editDevice)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.editDevice(APP1_DEVICE1, { ad_id: '1204' });
      expect(resp.statusCode).to.be.equal(response.editDeviceResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.editDeviceResponse['200OK'].response);
    });
  });

  describe('(newSession)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.newSession(APP1_DEVICE1, { device_os: 'ios' });
      expect(resp.statusCode).to.be.equal(response.newSessionResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.newSessionResponse['200OK'].response);
    });
  });

  describe('(newPurchase)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.newPurchase(APP1_DEVICE1, { purchases: [{ sku: 'sku1', amount: 22, iso: '1' }] });
      expect(resp.statusCode).to.be.equal(response.newPurchaseResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.newPurchaseResponse['200OK'].response);
    });
  });

  describe('(incrementSessionLength)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.incrementSessionLength(APP1_DEVICE1, { state: '', active_time: 0 });
      expect(resp.statusCode).to.be.equal(response.incrementSessionLengthResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.incrementSessionLengthResponse['200OK'].response);
    });
  });

  describe('(exportCSV)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.exportCSV({});
      expect(resp.statusCode).to.be.equal(response.exportCSVResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.exportCSVResponse['200OK'].response);
    });
  });

  describe('(createSegment)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.createSegment({
        name: 'test',
        filters: [{ field: 'name' }],
      });
      expect(resp.statusCode).to.be.equal(response.createSegmentResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.createSegmentResponse['200OK'].response);
    });
  });

  describe('(deleteSegment)', () => {
    it('returns 200 OK and correct response', async () => {
      const resp = await client.deleteSegment(APP1_SEGMENT1);
      expect(resp.statusCode).to.be.equal(response.deleteSegmentResponse['200OK'].status);
      expect(resp.body).to.be.eql(response.deleteSegmentResponse['200OK'].response);
    });
  });
});

describe('Test Client for (APP1, MOCKED_FAILING_400_API_HOST)', () => {
  const client = new Client(APP1.appId, APP1.apiKey, { apiRoot: MOCKED_FAILING_400_API_HOST });

  describe('(createNotification)', () => {
    it('rejects with HTTPError for 400 BAD_REQUEST', async () => {
      const promise = client.createNotification({ contents: { en: 'testing' } });
      expect(promise).to.be.rejectedWith(HTTPError);
    });
  });
});
