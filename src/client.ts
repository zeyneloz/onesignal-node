import {
  defaultClientOptions,
  NOTIFICATIONS_PATH,
  DEVICES_PATH,
  APPS_PATH,
  NOTIFICATIONS_HISTORY,
  DEVICES_ONSESSION,
  DEVICES_ONPURCHASE,
  DEVICES_ONFOCUS,
  DEVICES_CSVEXPORT,
  APPS_SEGMENTS,
} from './constants';

import { stripTrailingSlash, jsonToQueryString, basicAuthRequest } from './utils';

import {
  ClientOptions,
  Options,
  ClientResponse,
  ViewNotificationsQuery,
  NotificationHistoryBody,
  CreateNotificationBody,
  LimitOffsetQuery,
  AddDeviceBody,
  EditDeviceBody,
  NewSessionBody,
  NewPurchaseBody,
  IncrementSessionLengthBody,
  ExportCSVBody,
  CreateSegmentBody,
} from './types';

export class Client {
  public appId: string;
  public apiKey: string;
  public options: Options;

  constructor(appId: string, apiKey: string, options?: ClientOptions) {
    this.appId = appId;
    this.apiKey = apiKey;

    this.options = { ...defaultClientOptions, ...(options || {}) };
    this.options.apiRoot = stripTrailingSlash(this.options.apiRoot);
  }

  /**
   * Sends notifications to your users.
   * Reference https://documentation.onesignal.com/reference#create-notification.
   *
   * @param {CreateNotificationBody} body Request body.
   * @returns {Promise<Response>} Http response of One Signal server.
   */
  public createNotification(body: CreateNotificationBody): Promise<ClientResponse> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const postBody = { ...{ app_id: this.appId }, ...body };
    const uri = `${this.options.apiRoot}/${NOTIFICATIONS_PATH}`;
    return basicAuthRequest(uri, 'POST', this.apiKey, postBody);
  }

  /**
   * Used to stop a scheduled or currently outgoing notification.
   * Reference: https://documentation.onesignal.com/reference#cancel-notification
   *
   * @param {string} notificationId Notification id.
   *
   * @return {Promise<Response>} Http response of One Signal server.
   */
  public cancelNotification(notificationId: string): Promise<ClientResponse> {
    const uri = `${this.options.apiRoot}/${NOTIFICATIONS_PATH}/${notificationId}?app_id=${this.appId}`;
    return basicAuthRequest(uri, 'DELETE', this.apiKey);
  }

  /**
   * View the details of a single notification.
   * Reference: https://documentation.onesignal.com/reference#view-notification
   *
   * @param {string} notificationId Notification id.
   *
   * @return {Promise<Response>} Http response of One Signal server.
   */
  public viewNotification(notificationId: string): Promise<ClientResponse> {
    const uri = `${this.options.apiRoot}/${NOTIFICATIONS_PATH}/${notificationId}?app_id=${this.appId}`;
    return basicAuthRequest(uri, 'GET', this.apiKey);
  }

  /**
   * View the details of multiple notifications.
   * Reference https://documentation.onesignal.com/reference#view-notifications
   *
   * @param {ViewNotificationsQuery} query Query too apply to the request.
   *
   * @return {Promise<Response>} Http response of One Signal server.
   */
  public viewNotifications(query?: ViewNotificationsQuery): Promise<ClientResponse> {
    const queryString = jsonToQueryString(query);
    const uri = `${this.options.apiRoot}/${NOTIFICATIONS_PATH}?app_id=${this.appId}&${queryString}`;
    return basicAuthRequest(uri, 'GET', this.apiKey);
  }

  /**
   * View the devices sent a notification.
   * Reference: https://documentation.onesignal.com/reference#view-notifications
   *
   * @param {string} notificationId Notification id.
   * @param {NotificationHistoryBody} body Post body to send.
   *
   * @return {Promise<Response>} Http response of One Signal server.
   */
  public notificationHistory(notificationId: string, body: NotificationHistoryBody): Promise<ClientResponse> {
    const uri = `${this.options.apiRoot}/${NOTIFICATIONS_PATH}/${notificationId}/${NOTIFICATIONS_HISTORY}`;
    // eslint-disable-next-line @typescript-eslint/camelcase
    const postBody = { ...{ app_id: this.appId }, ...body };
    return basicAuthRequest(uri, 'POST', this.apiKey, postBody);
  }

  /**
   * View the details of multiple devices in one of your OneSignal apps.
   * Reference: https://documentation.onesignal.com/reference#view-devices
   *
   * @param {LimitOffsetQuery} query Query too apply to the request.
   *
   * @return {Promise<Response>} Http response of One Signal server.
   */
  public viewDevices(query?: LimitOffsetQuery): Promise<ClientResponse> {
    const queryString = jsonToQueryString(query);
    const uri = `${this.options.apiRoot}/${DEVICES_PATH}?app_id=${this.appId}&${queryString}`;
    return basicAuthRequest(uri, 'GET', this.apiKey);
  }

  /**
   * View the details of an existing device in one of your OneSignal apps.
   * Reference: https://documentation.onesignal.com/reference#view-device
   *
   * @param identifier Player's One Signal ID or email_auth_hash.
   *
   * @return {Promise<Response>} Http response of One Signal server.
   */
  public viewDevice(identifier: string): Promise<ClientResponse> {
    const uri = `${this.options.apiRoot}/${DEVICES_PATH}/${identifier}?app_id=${this.appId}`;
    return basicAuthRequest(uri, 'GET', this.apiKey);
  }

  /**
   * Update an existing device in one of your OneSignal apps
   * Reference: https://documentation.onesignal.com/reference#add-a-device
   *
   * @param {AddDeviceBody} body Request body.
   *
   * @return {Promise<ClientResponse>} Http response of One Signal server.
   */
  public addDevice(body: AddDeviceBody): Promise<ClientResponse> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const postBody = { ...{ app_id: this.appId }, ...body };
    const uri = `${this.options.apiRoot}/${DEVICES_PATH}`;
    return basicAuthRequest(uri, 'POST', this.apiKey, postBody);
  }

  /**
   * Update an existing device in one of your OneSignal apps.
   * Reference: https://documentation.onesignal.com/reference#edit-device
   *
   * @param deviceId The device's OneSignal ID.
   * @param {EditDeviceBody} body Request body.
   *
   * @return {Promise<ClientResponse>} Http response of One Signal server.
   */
  public editDevice(deviceId: string, body: EditDeviceBody): Promise<ClientResponse> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const postBody = { ...{ app_id: this.appId }, ...body };
    const uri = `${this.options.apiRoot}/${DEVICES_PATH}/${deviceId}`;
    return basicAuthRequest(uri, 'PUT', this.apiKey, postBody);
  }

  /**
   * Update a device's session information.
   * Reference: https://documentation.onesignal.com/reference#new-session
   *
   * @param {string} deviceId The device's OneSignal ID.
   * @param {NewSessionBody} body Request body.
   *
   * @return {Promise<ClientResponse>} Http response of One Signal server.
   */
  public newSession(deviceId: string, body: NewSessionBody): Promise<ClientResponse> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const postBody = { ...{ app_id: this.appId }, ...body };
    const uri = `${this.options.apiRoot}/${DEVICES_PATH}/${deviceId}/${DEVICES_ONSESSION}`;
    return basicAuthRequest(uri, 'POST', this.apiKey, postBody);
  }

  /**
   * Track a new purchase in your app.
   * Reference: https://documentation.onesignal.com/reference#new-session
   *
   * @param {string} deviceId The device's OneSignal ID.
   * @param {NewPurchaseBody} body Request body.
   *
   * @return {Promise<ClientResponse>} Http response of One Signal server.
   */
  public newPurchase(deviceId: string, body: NewPurchaseBody): Promise<ClientResponse> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const postBody = { ...{ app_id: this.appId }, ...body };
    const uri = `${this.options.apiRoot}/${DEVICES_PATH}/${deviceId}/${DEVICES_ONPURCHASE}`;
    return basicAuthRequest(uri, 'POST', this.apiKey, postBody);
  }

  /**
   * Update a device's session length upon app resuming.
   * Reference: https://documentation.onesignal.com/reference#increment-session-length
   *
   * @param {string} deviceId The device's OneSignal ID.
   * @param {IncrementSessionLengthBody} body Request body.
   *
   * @return {Promise<ClientResponse>} Http response of One Signal server.
   */
  public incrementSessionLength(deviceId: string, body: IncrementSessionLengthBody): Promise<ClientResponse> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const postBody = { ...{ app_id: this.appId }, ...body };
    const uri = `${this.options.apiRoot}/${DEVICES_PATH}/${deviceId}/${DEVICES_ONFOCUS}`;
    return basicAuthRequest(uri, 'POST', this.apiKey, postBody);
  }

  /**
   * Generate a compressed CSV export of all of your current user data.
   * Reference: https://documentation.onesignal.com/reference#increment-session-length
   *
   * @param {ExportCSVBody} body Request body.
   *
   * @return {Promise<ClientResponse>} Http response of One Signal server.
   */
  public exportCSV(body: ExportCSVBody): Promise<ClientResponse> {
    const uri = `${this.options.apiRoot}/${DEVICES_PATH}/${DEVICES_CSVEXPORT}?app_id=${this.appId}`;
    return basicAuthRequest(uri, 'POST', this.apiKey, body);
  }

  /**
   * Create segments visible and usable in the dashboard and API.
   * Reference: https://documentation.onesignal.com/reference#notification-history
   *
   * @param {CreateSegmentBody} body Request body.
   *
   * @return {Promise<ClientResponse>} Http response of One Signal server.
   */
  public createSegment(body: CreateSegmentBody): Promise<ClientResponse> {
    const uri = `${this.options.apiRoot}/${APPS_PATH}/${this.appId}/${APPS_SEGMENTS}`;
    return basicAuthRequest(uri, 'POST', this.apiKey, body);
  }

  /**
   * Delete a segment.
   * Reference: https://documentation.onesignal.com/reference#delete-segments.
   *
   * @param {string} segmentId Id of the segment.
   *
   * @return {Promise<ClientResponse>} Http response of One Signal server.
   */
  public deleteSegment(segmentId: string): Promise<ClientResponse> {
    const uri = `${this.options.apiRoot}/${APPS_PATH}/${this.appId}/${APPS_SEGMENTS}/${segmentId}`;
    return basicAuthRequest(uri, 'DELETE', this.apiKey);
  }
}
