import { stripTrailingSlash, basicAuthRequest } from './utils';
import { ClientOptions, CreateAppBody, UpdateAppBody, ClientResponse, Options } from './types';
import { defaultClientOptions, APPS_PATH } from './constants';

export class UserClient {
  public userAuthKey: string;
  public options: Options;

  constructor(userAuthKey: string, options?: ClientOptions) {
    this.userAuthKey = userAuthKey;

    this.options = { ...defaultClientOptions, ...(options || {}) };
    this.options.apiRoot = stripTrailingSlash(this.options.apiRoot);
  }

  /**
   * View the details of all of your current OneSignal apps.
   * Reference: https://documentation.onesignal.com/reference#view-apps-apps
   *
   * @return {Promise<Response>} Http response of One Signal server.
   */
  public viewApps(): Promise<ClientResponse> {
    const uri = `${this.options.apiRoot}/${APPS_PATH}`;
    return basicAuthRequest(uri, 'GET', this.userAuthKey);
  }

  /**
   * View the details of a single OneSignal app.
   * Reference: https://documentation.onesignal.com/reference#view-an-app
   *
   * @param {string} appId Application id.
   *
   * @return {Promise<Response>} Http response of One Signal server.
   */
  public viewApp(appId: string): Promise<ClientResponse> {
    const uri = `${this.options.apiRoot}/${APPS_PATH}/${appId}`;
    return basicAuthRequest(uri, 'GET', this.userAuthKey);
  }

  /**
   * Creates a new OneSignal app.
   * Reference: https://documentation.onesignal.com/reference#create-an-app
   *
   * @param {CreateAppBody} body Request body.
   * @returns {Promise<Response>} Http response of One Signal server.
   */
  public createApp(body: CreateAppBody): Promise<ClientResponse> {
    const uri = `${this.options.apiRoot}/${APPS_PATH}`;
    return basicAuthRequest(uri, 'POST', this.userAuthKey, body);
  }

  /**
   * Updates the name or configuration settings of an existing OneSignal app
   * Reference: https://documentation.onesignal.com/reference#update-an-app
   *
   * @param {string} appId Application id.
   * @param {CreateAppBody} body Request body.
   * @returns {Promise<Response>} Http response of One Signal server.
   */
  public updateApp(appId: string, body: UpdateAppBody): Promise<ClientResponse> {
    const uri = `${this.options.apiRoot}/${APPS_PATH}/${appId}`;
    return basicAuthRequest(uri, 'PUT', this.userAuthKey, body);
  }
}
