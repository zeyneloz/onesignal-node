# onesignal-node

A Node.js client library for [OneSignal](https://onesignal.com/) API.

## Table of Contents
* [Installation](#installation)
* [Usage](*usage)
  * [Creating a service client](#creating-a-client)
  * [Sending a push notification](#sending-push-notifications)
  * [Canceling a push notification](#canceling-a-push-notification)
  
  
## Installation

```
npm install onesignal-node --save
```
##Usage
``` js
var OneSignal = require('onesignal-node');
```

### Creating a client
You can create a OneSignal Client as shown below. It takes a JSON object as parameter which
contains your OneSignal API credentials.
``` js
// create a Client for a single app
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
We will pass Notification objects to Client to send them.
``` js
// contents is REQUIRED unless content_available=true or template_id is set.
var firstNotification = OneSignal.Notification({
    contents: {
        en: "Test notification",
        tr: "Test mesajı"
    }
});
```
You can also create a Notification object without contents:
``` js
var firstNotification = OneSignal.Notification({
    content_available: true
});

// or if you want to use template_id instead:
var firstNotification = OneSignal.Notification({
    template_id: "be4a8044-bbd6-11e4-a581-000c2940e62c"
});
```

You can set filters, data, buttons and all of the fields available on [OneSignal Documentation](https://documentation.onesignal.com/reference#create-notification)
by using `.setParameter(paramName, paramValue)` function:
``` js
firstNotification.setParameter('data', {"abc": "123", "foo": "bar"});
firstNotification.setParameter('headings', {"en": "English Title", "es": "Spanish Title"});
```

### Sending Push Notifications
Sending a notification using using Segments:
``` js
var OneSignal = require('../lib');

// first we need to create a client
var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});

// we need to create a notification to send
var firstNotification = OneSignal.Notification({
    contents: {
        en: "Test notification",
        tr: "Test mesajı"
    }
});

// set target users
firstNotification.setIncludedSegments(['All Users']);
firstNotification.setExcludedSegments(['Inactive Users']);

// set notification parameters
firstNotification.setParameter('data', {"abc": "123", "foo": "bar"});
firstNotification.setParameter('send_after', 'Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)');

// send this notification to All Users except Inactive ones
myClient.sendNotification(firstNotification, function (err, httpResponse,data) {
   if (err) {
       console.log('Something went wrong...');
   } else {
       console.log(data);
   }
});
```

To send a notification based on filters, use `.setFilter(filters)` method:
``` js
firstNotification.setFilters([
    {"field": "tag", "key": "level", "relation": ">", "value": "10"},
    {"field": "amount_spent", "relation": ">","value": "0"}
]);
```
To send specific devices use `.setTargetDevices(include_player_ids)` method:
``` js
firstNotification.setTargetDevices(["1dd608f2-c6a1-11e3-851d-000c2940e62c", 
    "2dd608f2-c6a1-11e3-851d-000c2940e62c"]);
```

Note that `.sendNotification(notification, callback)` function will send the notification to
the `app` specified during the creation of Client object. If you want to send notification
tp multiple apps, you must set `apps` array instead, on Client object:
``` js
myClient.apps = apps: ['id1', 'id2'];
```

### Canceling a push notification
You can cancel a notification simply by calling `.cancel`
``` js
// this will cancel the notification for current app (myClient.app)
myClient.cancelNotification('notificationId', function (err, httpResponse, data) {
    if (err) {
        
    }
})
```

##License

This project is under the MIT license.