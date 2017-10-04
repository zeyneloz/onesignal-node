'use strict';

var request = require('request');
var constants = require('./constants');

var ALLOWED_CREDENTIALS = [
	{ name: 'userAuthKey', type: 'string' },
	{ name: 'app', type: 'object', requiredFields: ['appAuthKey', 'appId'] },
	{ name: 'apps', type: 'object' }
];

/**
 * make a basic request
 * @param url
 * @param apiKey
 * @param method :  [ GET, POSt, PUT ...]
 * @param body
 * @param callback  (err, httpResponse, body)
 */
var basicRequest = function (url, apiKey, method, body, callback) {
	var options = {
		url: url,
		method: method
	};
	if (apiKey) {
		options.headers = {
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': 'Basic ' + apiKey
		}
	}
	if (body) {
		options.body = body;
		options.json = true;
	}
	request(options, callback);
};

/**
 * check if the credential is valid
 * @param credentialName
 * @param credential
 * @returns {boolean}
 */
var checkCredential = function (credentialName, credential) {
	for (var i = 0; i < ALLOWED_CREDENTIALS.length; i++) {
		if (ALLOWED_CREDENTIALS[i].name === credentialName) {
			if (typeof credential !== ALLOWED_CREDENTIALS[i].type) {
				throw credentialName + ' must be a ' + ALLOWED_CREDENTIALS[i].type;
			}
			if (ALLOWED_CREDENTIALS[i].requiredFields) {
				for (var j = 0; j < ALLOWED_CREDENTIALS[i].requiredFields.length; j++) {
					if (!(ALLOWED_CREDENTIALS[i].requiredFields[j] in credential)) {
						throw credentialName + ' must contain ' + ALLOWED_CREDENTIALS[i].requiredFields[j]
					}
				}
			}
			return true;
		}
	}
	return false;
};

/**
 *
 * @param credentials { JSON }
 * @constructor
 */
var Client = function (credentials) {
	if (typeof credentials !== 'object') {
		throw 'credentials parameter must be a JSON object'
	}
	this.API_URI = constants.API_ROOT;
	for (var key in credentials) {
		if (credentials.hasOwnProperty(key) && checkCredential(key, credentials[key])) {
			this[key] = credentials[key];
		}
	}
};


/**
 *
 * @param rootUrl { String }   default 'https://onesignal.com/api/v1';
 */
Client.prototype.setRootUrl = function (rootUrl) {
	if (!rootUrl) {
		throw 'You must set a valid rootUsrl.'
	}
	this.API_URI = rootUrl;
};

/**
 * set an app object
 * @param app { JSON }  {}
 */
Client.prototype.setApp = function (app) {
	checkCredential('app', app);
	this.app = app;
};

/**
 * create a notification
 * @param notification { Notification }
 * @param callback
 */
Client.prototype.sendNotification = function (notification, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!notification || !notification.postBody) {
			throw 'notification parameter must be a typeof Notification object.';
		}
		var postBody = notification.postBody;
		if (this.apps && this.apps.length > 0) {
			postBody.app_ids = this.apps;
			basicRequest(this.API_URI + constants.NOTIFICATIONS_PATH, this.userAuthKey, 'POST', postBody, function (error, httpResponse, data) {
				if (error) {
					reject(error);
					return callback(error);
				}

				resolve(data);
				return callback(null, httpResponse, data);
			});
		} else if (this.app) {
			postBody.app_id = this.app.appId;
			basicRequest(this.API_URI + constants.NOTIFICATIONS_PATH, this.app.appAuthKey, 'POST', postBody, function (error, httpResponse, data) {
				if (error) {
					reject(error);
					return callback(error);
				}

				resolve(data);
				return callback(null, httpResponse, data);
			});
		} else {
			throw 'You must set either an "app" or "apps" on Client';
		}
	});
};

/**
 * Used to stop a scheduled or currently outgoing notification.
 * @param notificationId	{ String }   Notification id
 * @param callback
 */
Client.prototype.cancelNotification = function (notificationId, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!this.app) {
			throw 'You must define an "app" object.'
		}
		var notificationUri = this.API_URI + constants.NOTIFICATIONS_PATH + '/' + notificationId + '?app_id=' + this.app.appId;
		basicRequest(notificationUri, this.app.appAuthKey, 'DELETE', null, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}

			resolve(data);
			return callback(null, httpResponse, data);
		});
	});
};

/**
 *
 * @param notificationId { String }
 * @param callback
 */
Client.prototype.viewNotification = function (notificationId, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!this.app) {
			throw 'You must define an "app" object.'
		}
		var notificationUri = this.API_URI + constants.NOTIFICATIONS_PATH + '/' + notificationId + '?app_id=' + this.app.appId;
		basicRequest(notificationUri, this.app.appAuthKey, 'GET', null, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}

			resolve(data);
			return callback(null, httpResponse, data);
		});
	});
};

/**
 *
 * @param query { String }  ex: limit:100&offset=9
 * @param callback
 */
Client.prototype.viewNotifications = function (query, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {

		if (!this.app) {
			throw 'You must define an "app" object.'
		}
		var appUri = this.API_URI + constants.NOTIFICATIONS_PATH + '?app_id=' + this.app.appId + '&' + query;
		basicRequest(appUri, this.app.appAuthKey, 'GET', null, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}

			resolve(data);
			return callback(null, httpResponse, data);
		});
	});
};


/**
 *
 * @param callback
 */
Client.prototype.viewApps = function (callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!this.userAuthKey) {
			throw 'You must define "userAuthKey" on Client'
		}
		basicRequest(this.API_URI + constants.APPS_PATH, this.userAuthKey, 'GET', null, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}
			resolve(data);
			return callback(null, httpResponse, data);
		});
	});
};

/**
 *
 * @param appId { String }
 * @param callback
 */
Client.prototype.viewApp = function (appId, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!this.userAuthKey) {
			throw 'You must define "userAuthKey" on Client'
		}
		basicRequest(this.API_URI + constants.APPS_PATH + '/' + appId, this.userAuthKey, 'GET', null, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}

			resolve(data);
			return callback(null, httpResponse, data);
		});
	});
};

/**
 *
 * @param body { JSON }
 * @param callback
 */
Client.prototype.createApp = function (body, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!body.name) {
			throw 'You must specify a name in body';
		}
		if (!this.userAuthKey) {
			throw 'You must define "userAuthKey" on Client'
		}
		basicRequest(this.API_URI + constants.APPS_PATH, this.userAuthKey, 'POST', body, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}

			resolve(data);
			return callback(null, httpResponse, data);
		});
	});
};

/**
 * Updates currently defined app
 * @param body	{ JSON }
 * @param callback
 */
Client.prototype.updateApp = function (body, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!this.app) {
			throw 'You must define an "app" object.'
		}
		if (!this.userAuthKey) {
			throw 'You must define "userAuthKey" on Client'
		}
		basicRequest(this.API_URI + constants.APPS_PATH + '/' + this.app.appId, this.userAuthKey, 'PUT', body, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}

			resolve(data);
			return callback(null, httpResponse, data);
		});
	});
};


/**
 *
 * @param query  { String }  ex: limit=200&offset=10
 * @param callback
 */
Client.prototype.viewDevices = function (query, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!this.app) {
			throw 'You must define an "app" object.'
		}
		var viewUri = this.API_URI + constants.DEVICES_PATH + '?app_id=' + this.app.appId + '&' + query;
		basicRequest(viewUri, this.app.appAuthKey, 'GET', null, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}

			resolve(data);
			return callback(null, httpResponse, data);
		});
	});
};

/**
 *
 * @param deviceId { String }
 * @param callback
 */
Client.prototype.viewDevice = function (deviceId, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!this.app) {
			throw 'You must define an "app" object.'
		}
		var viewUri = this.API_URI + constants.DEVICES_PATH + '/' + deviceId + '?app_id=' + this.app.appId;
		basicRequest(viewUri, this.app.appAuthKey, 'GET', null, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}

			resolve(data);
			return callback(null, httpResponse, data);
		});
	});
};


/**
 *
 * @param body { JSON }
 * @param callback
 */
Client.prototype.addDevice = function (body, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!this.app) {
			throw 'You must define an "app" object.'
		}
		if (!('app_id' in body)) {
			body.app_id = this.app.appId;
		}
		basicRequest(this.API_URI + constants.DEVICES_PATH, this.app.appAuthKey, 'POST', body, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}

			resolve(data);
			return callback(null, httpResponse, data);
		});
	});
};

/**
 *
 * @param deviceId { String }
 * @param body { JSON }
 * @param callback
 */
Client.prototype.editDevice = function (deviceId, body, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!this.app) {
			throw 'You must define an "app" object.'
		}
		basicRequest(this.API_URI + constants.DEVICES_PATH + '/' + deviceId, this.app.appAuthKey, 'PUT', body, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}

			resolve(data);
			return callback(null, httpResponse, data);
		});
	});
};

/**
 *
 * @param notificationId { String }
 * @param body { JSON }
 * @param callback
 */
Client.prototype.trackOpen = function (notificationId, body, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!this.app) {
			throw 'You must define an "app" object.'
		}
		if (!('app_id' in body)) {
			body.app_id = this.app.appId;
		}
		basicRequest(this.API_URI + constants.NOTIFICATIONS_PATH + '/' + notificationId, this.app.appAuthKey, 'PUT', body, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}

			resolve(data);
			return callback(null, httpResponse, data);
		});
	});
};

/**
 *
 * @param body
 * @param callback
 */
Client.prototype.csvExport = function (body, callback) {
	callback = callback || function () { };
	return new Promise((resolve, reject) => {
		if (!this.app) {
			throw 'You must define an "app" object.'
		}
		var csvUri = this.API_URI + constants.DEVICES_PATH + '/csv_export' + '?app_id=' + this.app.appId;
		basicRequest(csvUri, this.app.appAuthKey, 'POST', body, function (error, httpResponse, data) {
			if (error) {
				reject(error);
				return callback(error);
			}

			resolve(data);
			return callback(null, httpResponse, data);
		}



	);
	});
};


module.exports = Client;
