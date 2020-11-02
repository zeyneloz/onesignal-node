import * as request from 'request';

import { HTTPError } from './errors';

/**
 * Remove trailing slash from given string,
 *
 * Ex:
 *  input: 'https://localhost/'
 *  output: 'https://localhost'
 *
 * @param {string} str String to convert
 *
 * @return {string} Stripped string.
 */
export const stripTrailingSlash = (str: string): string => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};

/**
 * Given a JSON object, create query string.
 *
 * Ex:
 *   input: { limit: 1, offset: 2 }
 *   output: 'limit=1&offset=2'
 *
 * @param {object} obj Key-value pairs for query string.
 *
 * @return {string} Query string.
 */
export const jsonToQueryString = (obj: { [key: string]: any } = {}): string => {
  return Object.keys(obj)
    .map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
    })
    .join('&');
};

/**
 * Make a request using given options and return the response if status code is 2xx.
 * Otherwise, reject with HTTPError.
 *
 * @param {request.Options} options Request options
 *
 * @return {Promise<request.ResponseAsJSON>}
 */
const makeRequest = function makeHTTPRequest(options: request.Options): Promise<request.ResponseAsJSON> {
  return new Promise((resolve, reject) => {
    request(options, (err, httpResponse) => {
      if (err) {
        return reject(err);
      }

      // Check if status code is 2xx.
      if (httpResponse.statusCode - 299 > 0) {
        return reject(new HTTPError(httpResponse.statusCode, httpResponse.body));
      }

      return resolve(httpResponse.toJSON());
    });
  });
};

/**
 * Make a request using Basic Authorization header. Return the response as JSON.
 *
 * @param {string} uri Url to make the request to.
 * @param {string} method Method of the request. Ex: GET, POST, PATCH ...
 * @param {string} authKey Authorization string to be used in header.
 * @param {{}} body Body of the request.
 *
 * @return {Promise<request.ResponseAsJSON>}
 */
export const basicAuthRequest = function basicAuthHTTPRequest(
  uri: string,
  method: string,
  authKey: string,
  body?: {},
  customOptions?: Partial<request.Options>,
): Promise<request.ResponseAsJSON> {
  const options: request.Options = {
    uri,
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${authKey}`,
    },
    json: true,
    ...customOptions,
  };

  if (body) {
    options.body = body;
  }

  return makeRequest(options);
};
