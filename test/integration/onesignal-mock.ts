import { ParsedUrlQuery } from 'querystring';

import * as nock from 'nock';

import * as response from './response';
import {
  APP1,
  APP1_DEVICE1,
  APP1_NOTIFICATION1,
  APP1_SEGMENT1,
  APP1_EXTERNAL_USER_ID1,
  MOCKED_API_HOST,
  MOCKED_FAILING_400_API_HOST,
  USER_AUTH_KEY,
} from './constants';
import {
  APP_ID_FIELD_NAME,
  APP_ID_QUERY_NAME,
  APPS_PATH,
  APPS_SEGMENTS,
  APPS_USERS,
  DEVICES_CSVEXPORT,
  DEVICES_ONFOCUS,
  DEVICES_ONPURCHASE,
  DEVICES_ONSESSION,
  DEVICES_PATH,
  NOTIFICATIONS_HISTORY,
  NOTIFICATIONS_PATH,
} from '../../src/constants';

// Client paths.
const APP1_CREATE_NOTIFICATION_PATH = `/${NOTIFICATIONS_PATH}`;
const APP1_CANCEL_NOTIFICATION1_PATH = `/${NOTIFICATIONS_PATH}/${APP1_NOTIFICATION1}`;
const APP1_VIEW_NOTIFICATION1_PATH = `/${NOTIFICATIONS_PATH}/${APP1_NOTIFICATION1}`;
const APP1_VIEW_NOTIFICATIONS_PATH = `/${NOTIFICATIONS_PATH}`;
const APP1_NOTIFICATION_HISTORY_PATH = `/${NOTIFICATIONS_PATH}/${APP1_NOTIFICATION1}/${NOTIFICATIONS_HISTORY}`;
const APP1_VIEW_DEVICES_PATH = `/${DEVICES_PATH}`;
const APP1_VIEW_DEVICE1_PATH = `/${DEVICES_PATH}/${APP1_DEVICE1}`;
const APP1_ADD_DEVICE_PATH = `/${DEVICES_PATH}`;
const APP1_EDIT_DEVICE1_PATH = `/${DEVICES_PATH}/${APP1_DEVICE1}`;
const APP1_EDIT_TAGS_WITH_EXTERNAL_USER_ID_PATH = `/${APPS_PATH}/${APP1.appId}/${APPS_USERS}/${APP1_EXTERNAL_USER_ID1}`;
const APP1_DELETE_DEVICE1_PATH = `/${DEVICES_PATH}/${APP1_DEVICE1}`;
const APP1_DEV1_NEW_SESSION_PATH = `/${DEVICES_PATH}/${APP1_DEVICE1}/${DEVICES_ONSESSION}`;
const APP1_DEV1_NEW_PURCHASE_PATH = `/${DEVICES_PATH}/${APP1_DEVICE1}/${DEVICES_ONPURCHASE}`;
const APP1_DEV1_INCREMENT_SESSION_LENGTH_PATH = `/${DEVICES_PATH}/${APP1_DEVICE1}/${DEVICES_ONFOCUS}`;
const APP1_EXPORT_CSV_PATH = `/${DEVICES_PATH}/${DEVICES_CSVEXPORT}`;
const APP1_CREATE_SEGMENT_PATH = `/${APPS_PATH}/${APP1.appId}/${APPS_SEGMENTS}`;
const APP1_DELETE_SEGMENT1_PATH = `/${APPS_PATH}/${APP1.appId}/${APPS_SEGMENTS}/${APP1_SEGMENT1}`;

// User Client paths.
const VIEW_APPS_PATH = `/${APPS_PATH}`;
const VIEW_APP1_PATH = `/${APPS_PATH}/${APP1.appId}`;
const CREATE_APP_PATH = `/${APPS_PATH}`;
const UPDATE_APP1_PATH = `/${APPS_PATH}/${APP1.appId}`;

// APP1 options for nock.
const app1NockOptions = {
  reqheaders: {
    authorization: `Basic ${APP1.apiKey}`,
    'Content-Type': 'application/json; charset=utf-8',
  },
};

// User auth key options for nock.
const userNockOptions = {
  reqheaders: {
    authorization: `Basic ${USER_AUTH_KEY}`,
    'Content-Type': 'application/json; charset=utf-8',
  },
};

// expect app_id field to be in request query string.
const expectAppIdInQuery = (appId: string) => {
  return (queryObject: ParsedUrlQuery): boolean => {
    return queryObject && queryObject[APP_ID_QUERY_NAME] === appId;
  };
};

// expect app_id field to be in request body.
const expectAppIdInBody = (appId: string) => {
  return (body: any): boolean => {
    return body && body[APP_ID_FIELD_NAME] === appId;
  };
};

// Client - 200 OK responses for MOCKED_API_HOST and APP1
nock(MOCKED_API_HOST, app1NockOptions)
  .post(APP1_CREATE_NOTIFICATION_PATH, expectAppIdInBody(APP1.appId))
  .reply(response.createNotificationResponse['200OK'].status, response.createNotificationResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .delete(APP1_CANCEL_NOTIFICATION1_PATH)
  .query(expectAppIdInQuery(APP1.appId))
  .reply(response.cancelNotificationResponse['200OK'].status, response.cancelNotificationResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .get(APP1_VIEW_NOTIFICATION1_PATH)
  .query(expectAppIdInQuery(APP1.appId))
  .reply(response.viewNotificationResponse['200OK'].status, response.viewNotificationResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .get(APP1_VIEW_NOTIFICATIONS_PATH)
  .query(expectAppIdInQuery(APP1.appId))
  .reply(response.viewNotificationsResponse['200OK'].status, response.viewNotificationsResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .post(APP1_NOTIFICATION_HISTORY_PATH, expectAppIdInBody(APP1.appId))
  .reply(response.notificationHistoryResponse['200OK'].status, response.notificationHistoryResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .get(APP1_VIEW_DEVICES_PATH)
  .query(expectAppIdInQuery(APP1.appId))
  .reply(response.viewDevicesResponse['200OK'].status, response.viewDevicesResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .get(APP1_VIEW_DEVICES_PATH)
  .query(expectAppIdInQuery(APP1.appId))
  .reply(response.viewDevicesResponse['200OK'].status, response.viewDevicesResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .get(APP1_VIEW_DEVICE1_PATH)
  .query(expectAppIdInQuery(APP1.appId))
  .reply(response.viewDeviceResponse['200OK'].status, response.viewDeviceResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .post(APP1_ADD_DEVICE_PATH, expectAppIdInBody(APP1.appId))
  .reply(response.addDeviceResponse['200OK'].status, response.addDeviceResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .put(APP1_EDIT_DEVICE1_PATH, expectAppIdInBody(APP1.appId))
  .reply(response.editDeviceResponse['200OK'].status, response.editDeviceResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .put(APP1_EDIT_TAGS_WITH_EXTERNAL_USER_ID_PATH, expectAppIdInBody(APP1.appId))
  .reply(
    response.editTagsWithExternalUserIdResponse['200OK'].status,
    response.editTagsWithExternalUserIdResponse['200OK'].response,
  )
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .delete(APP1_DELETE_DEVICE1_PATH)
  .query(expectAppIdInQuery(APP1.appId))
  .reply(response.deleteDeviceResponse['200OK'].status, response.deleteDeviceResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .post(APP1_DEV1_NEW_SESSION_PATH, expectAppIdInBody(APP1.appId))
  .reply(response.newSessionResponse['200OK'].status, response.newSessionResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .post(APP1_DEV1_NEW_PURCHASE_PATH, expectAppIdInBody(APP1.appId))
  .reply(response.newPurchaseResponse['200OK'].status, response.newPurchaseResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .post(APP1_DEV1_INCREMENT_SESSION_LENGTH_PATH, expectAppIdInBody(APP1.appId))
  .reply(
    response.incrementSessionLengthResponse['200OK'].status,
    response.incrementSessionLengthResponse['200OK'].response,
  )
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .post(APP1_EXPORT_CSV_PATH)
  .query(expectAppIdInQuery(APP1.appId))
  .reply(response.exportCSVResponse['200OK'].status, response.exportCSVResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .post(APP1_CREATE_SEGMENT_PATH)
  .reply(response.createSegmentResponse['200OK'].status, response.createSegmentResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, app1NockOptions)
  .delete(APP1_DELETE_SEGMENT1_PATH)
  .reply(response.deleteSegmentResponse['200OK'].status, response.deleteSegmentResponse['200OK'].response)
  .persist();

// Client - 400 BAD_REQUEST responses for MOCKED_FAILING_400_API_HOST and APP1
nock(MOCKED_FAILING_400_API_HOST, app1NockOptions)
  .post(APP1_CREATE_NOTIFICATION_PATH, expectAppIdInBody(APP1.appId))
  .reply(response.createNotificationResponse['400BAD'].status, response.createNotificationResponse['400BAD'].response)
  .persist();

// UserClient - 200 OK responses for MOCKED_API_HOST and APP1
nock(MOCKED_API_HOST, userNockOptions)
  .get(VIEW_APPS_PATH)
  .reply(response.viewAppsResponse['200OK'].status, response.viewAppsResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, userNockOptions)
  .get(VIEW_APP1_PATH)
  .reply(response.viewAppResponse['200OK'].status, response.viewAppResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, userNockOptions)
  .post(CREATE_APP_PATH)
  .reply(response.createAppResponse['200OK'].status, response.createAppResponse['200OK'].response)
  .persist();

nock(MOCKED_API_HOST, userNockOptions)
  .put(UPDATE_APP1_PATH)
  .reply(response.updateAppResponse['200OK'].status, response.updateAppResponse['200OK'].response)
  .persist();

// UserClient - 400 BAD_REQUEST responses for MOCKED_FAILING_400_API_HOST and APP1
nock(MOCKED_FAILING_400_API_HOST, userNockOptions)
  .post(CREATE_APP_PATH)
  .reply(response.createAppResponse['400BAD'].status, response.createAppResponse['400BAD'].response)
  .persist();
