# onesignal-node

A Node.js client library for [OneSignal](https://onesignal.com/) API.

## Table of Contents
* [Installation](#installation)
* [Usage](*usage)
  * [Creating a service client](#creating-a-client)
  * [Sending a push notification](#sending-push-notifications)
  * [Cancelling a push notification](#cancelling-a-push-notification)
  * [Viewing push notifications](#viewing-push-notifications)
  * [Viewing a push notification](#viewing-a-push-notification)
  * [Listing apps](#viewing-apps)
  * [Creating an app](#creating-an-app)
  * [Updating an app](#updating-an-app)
  * [Listing devices](#viewing-devices)
  * [Viewing a device](#viewing-a-device)
  * [Adding a device](#adding-a-device)
  * [Editing a device](#editing-a-device)
  * [CSV Export](#csv-export)
  * [Opening track](#opening-track)
* [Tests](#tests)

## Installation

```
npm install onesignal-node --save
```
## Usage
``` js
var OneSignal = require('onesignal-node');
```

### Creating a client
You can create a OneSignal Client as shown below. It takes a JSON object as parameter which
contains your OneSignal API credentials.
You can find your userAuthKey and REST API Key (appAuthKey) on OneSignal `Account & API Keys` page.
``` js
// create a new Client for a single app
var myClient = new OneSignal.Client({
	userAuthKey: 'XXXXXX',
	// note that "app" must have "appAuthKey" and "appId" keys
	app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});
```

You can also create a Client for multiple Apps
``` js
// create a Client for a multiple apps
var myClient = new OneSignal.Client({
	userAuthKey: 'XXXXXX',
	apps: ['id1', 'id2'] // your app ids
});
```
You can always create a Client with no credential and set them later:
``` js
// create a Client for a multiple apps
var myClient = new OneSignal.Client({});
myClient.userAuthKey = 'XXXXXX';

myClient.app = { appAuthKey: 'XXXXX', appId: 'XXXXX' };
// or
myClient.setApp({ appAuthKey: 'XXXXX', appId: 'XXXXX' });

myClient.apps = ['id1', 'id2', 'id3']; // this will override "app"
```

### Creating new notification object
We will pass Notification objects to the Client object to send them.
``` js
// contents is REQUIRED unless content_available=true or template_id is set.
var firstNotification = new OneSignal.Notification({
    contents: {
        en: "Test notification",
        tr: "Test mesajı"
    }
});
```
You can also create a Notification object without contents:
``` js
var firstNotification = new OneSignal.Notification({
    content_available: true
});

// or if you want to use template_id instead:
var firstNotification = new OneSignal.Notification({
    template_id: "be4a8044-bbd6-11e4-a581-000c2940e62c"
});
```

You can set filters, data, buttons and all of the fields available on [OneSignal Documentation](https://documentation.onesignal.com/reference#create-notification)
by using `.setParameter(paramName, paramValue)` function:
``` js
var firstNotification = new OneSignal.Notification({
    contents: {
        en: "Test notification",
        tr: "Test mesajı"
    }
});
firstNotification.setParameter('data', {"abc": "123", "foo": "bar"});
firstNotification.setParameter('headings', {"en": "English Title", "es": "Spanish Title"});
```

### Sending Push Notifications
Sending a notification using Segments:
``` js
var OneSignal = require('onesignal-node');

// first we need to create a client
var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

// we need to create a notification to send
var firstNotification = new OneSignal.Notification({
    contents: {
        en: "Test notification",
        tr: "Test mesajı"
    }
});

// set target users
firstNotification.setIncludedSegments(['All']);
firstNotification.setExcludedSegments(['Inactive Users']);

// set notification parameters
firstNotification.setParameter('data', {"abc": "123", "foo": "bar"});
firstNotification.setParameter('send_after', 'Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)');

// send this notification to All Users except Inactive ones
myClient.sendNotification(firstNotification, function (err, httpResponse,data) {
   if (err) {
       console.log('Something went wrong...');
   } else {
       console.log(data, httpResponse.statusCode);
   }
});
```

You can also use Promises:

```js
myClient.sendNotification(firstNotification)
    .then(function (response) {
        console.log(response.data, response.httpResponse.statusCode);
    })
    .catch(function (err) {
        console.log('Something went wrong...', err);
    });
```

To send a notification based on filters, use `.setFilters(filters)` method:
``` js
var OneSignal = require('onesignal-node');

var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

var firstNotification = new OneSignal.Notification({
    contents: {
        en: "Test notification",
        tr: "Test mesajı"
    }
});

firstNotification.setFilters([
    {"field": "tag", "key": "level", "relation": ">", "value": "10"},
    {"field": "amount_spent", "relation": ">","value": "0"}
]);

myClient.sendNotification(firstNotification, function (err, httpResponse,data) {
   if (err) {
       console.log('Something went wrong...');
   } else {
       console.log(data);
   }
});
```
To target one or more device, use `.setTargetDevices(include_player_ids)` method:
``` js
var OneSignal = require('onesignal-node');

var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

var firstNotification = new OneSignal.Notification({
    contents: {
        en: "Test notification",
        tr: "Test mesajı"
    }
});

firstNotification.setTargetDevices(["1dd608f2-c6a1-11e3-851d-000c2940e62c",
    "2dd608f2-c6a1-11e3-851d-000c2940e62c"]);

myClient.sendNotification(firstNotification, function (err, httpResponse,data) {
   if (err) {
       console.log('Something went wrong...');
   } else {
       console.log(data);
   }
});

```

Note that `.sendNotification(notification, callback)` function will send the notification to
the `app` specified during the creation of Client object. If you want to send notification
to multiple apps, you must set `apps` array instead, on Client object:
``` js
var myClient = new OneSignal.Client({});
myClient.userAuthKey = 'XXXXXX';
myClient.apps = ['id1', 'id2'];
```

### Cancelling a push notification
You can cancel a notification simply by calling `.cancel(notificationId, callback)` method
``` js
// this will cancel the notification for current app (myClient.app)
myClient.cancelNotification('notificationId', function (err, httpResponse, data) {
    if (err) {

    }
})
```

### Viewing push notifications
To view all push notifications for an app:

``` js
var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

myClient.viewNotifications('limit=30', function (err, httpResponse, data) {
    if (httpResponse.statusCode === 200 && !err) {
        console.log(data);
    }
});
```

### Viewing a push notification

``` js
var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

myClient.viewNotification('notificationId', function (err, httpResponse, data) {
    if (httpResponse.statusCode === 200 && !err) {
        console.log(data);
    }
});
```

### Viewing apps
``` js
myClient.viewApps(function (err, httpResponse, data) {
    console.log(data[0].name); // print the name of the app
});
```
you can also view a single app
``` js
myClient.viewApp('appId', function (err, httpResponse, data) {
    console.log(data);
});
```

### Creating an app
``` js
var OneSignal = require('onesignal-node');

var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX'
});

var appBody = {
    name: 'Test App',
    apns_env: 'production',
    gcm_key: 'xxxxx-aaaaa-bbbb'
};

myClient.createApp(appBody, function (err, httpResponse, data) {
    if (httpResponse.statusCode === 200) {
        console.log(data);
    }
});
```

### Updating an app
``` js
var OneSignal = require('onesignal-node');

var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

var appBody = {
    name: 'New Test App',
    gcm_key: 'xxxxx-aaaaa-bbbb'
};

myClient.updateApp(appBody, function (err, httpResponse, data) {
    console.log(data);
});
```

### Viewing devices
You can view devices for an app:
``` js
var myClient = new OneSignal.Client({
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

// you can set limit and offset (optional) or you can leave it empty
myClient.viewDevices('limit=100&offset=0', function (err, httpResponse, data) {
    console.log(data);
});
```

### Viewing a device
``` js
var myClient = new OneSignal.Client({
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

myClient.viewDevice('deviceId', function (err, httpResponse, data) {
    console.log(data);
});
```

### Adding a device
``` js

var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

// If you want to add device to current app, don't add app_id in deviceBody
var deviceBody = {
    device_type: 1,
    language: 'tr'
};

myClient.addDevice(deviceBody, function (err, httpResponse, data) {
    ...
});
```

### Editing a device
``` js
var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

var deviceBody = {
    device_type: 0,
    language: 'en',
    device_model: 'iPhone5,1'
};

myClient.editDevice('deviceId', deviceBody, function (err, httpResponse, data) {
    ...
});
```
### CSV Export
``` js
var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

myClient.csvExport({ extra_fields: ['location'] }, function (err, httpResponse, data) {
...
});
```

### Opening track
``` js
var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

myClient.trackOpen('notificationId', { opened: true }, function (err, httpResponse, data) {
...
});
```

## Tests

Running all tests:
```bash
$ npm test
```

## License

This project is under the MIT license.
