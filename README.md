# onesignal-node      

<p align="center">
  <a href="https://www.npmjs.com/package/onesignal-node">
    <img src="https://img.shields.io/npm/v/onesignal-node.svg" alt="Dependency Status" />
  </a>
  <a href="https://www.npmjs.com/package/onesignal-node">
    <img src="https://img.shields.io/npm/dm/onesignal-node.svg" alt="Download Count" />
  </a>
  <a href="https://circleci.com/gh/zeyneloz/onesignal-node">
    <img src="https://circleci.com/gh/zeyneloz/onesignal-node/tree/v3.x.svg?style=shield" alt="Build Status" />
  </a>
  <a href="https://snyk.io/test/github/zeyneloz/onesignal-node?targetFile=package.json">
    <img src="https://snyk.io/test/github/zeyneloz/onesignal-node/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/zeyneloz/onesignal-node?targetFile=package.json" style="max-width:100%;">
  </a>
  <a href="https://codecov.io/gh/zeyneloz/onesignal-node">
    <img src="https://codecov.io/gh/zeyneloz/onesignal-node/branch/master/graph/badge.svg" />
  </a>
</p>
<br>

A Node.js client library for [OneSignal](https://onesignal.com/) API.  
**IMPORTANT:** This documentation belongs to v3.x.x which has no backward compatibility.
Please see [this page](https://github.com/zeyneloz/onesignal-node/tree/v2.x) for v2.x.x.  
      
## Table of Contents      
* [Overview](#overview)
* [Installation](#installation)      
* [Usage](#usage)        
  * [Client Types](#client-types)
  * [Creating Client](#creating-client)      
  * [Create notification](#create-notification)      
  * [Cancel notification](#cancel-notification)      
  * [View notifications](#view-notifications)      
  * [View notification](#view-notification)      
  * [View apps](#view-apps)      
  * [Create an app](#create-an-app)      
  * [Update an app](#update-an-app)      
  * [View devices](#view-devices)      
  * [View device](#view-device)      
  * [Add a device](#add-a-device)      
  * [Edit a device](#edit-a-device)
  * [Edit tags with external user id](#edit-tags-with-external-user-id)
  * [New session](#new-session)  
  * [New purchase](#new-purchase)  
  * [Increment Session Length](#increment-session-length)  
  * [CSV Export](#csv-export)      
* [Tests](#tests)
* [Contributing](#contributing)
      

## Overview  

This is a wrapper library over [OneSignal REST API](https://documentation.onesignal.com/reference). You can create notifications,
view apps, edit a device and all other actions you can take on OneSignal REST API.

## Installation      
      
```      
npm install onesignal-node --save      
```      

## Usage
      
``` js      
const OneSignal = require('onesignal-node');    
```      

### Client Types:

For all the actions that require your OneSignal app id and app api key, you should use `OneSignal.Client`.
Sample actions: create notification, add device, csv export, create segment...

``` js      
const client = new OneSignal.Client('appId', 'apiKey');
``` 

For all the actions that require your User Auth Key you should use `OneSignal.UserClient`.
Sample actions: view apps, update an app, create an app...

``` js      
const userClient = new OneSignal.UserClient('userAuthKey');
```      
      
### Creating client      

You can create a `Client` object as shown below. It requires two parameters: `appId` and `apiKey`, which you can find them on
your applications page on OneSignal dashboard.  

There is also an optional parameter called `options`. You can set OneSignal rest api endpoint if you wish to using options.
By default the library uses `https://onesignal.com/api/v1` for api endpoint.
  
```js      
// With default options
const client = new OneSignal.Client('appId', 'apiKey');

// With custom API endpoint
const client = new OneSignal.Client('appId', 'apiKey', { apiRoot: 'https://onesignal.com/api/v2'});
```      

### Creating UserClient      

You can create a `UserClient` object as shown below. It requires one parameter: `userAuthKey`, which you can find it on
your OneSignal dashboard.

There is also an optional parameter called `options`. You can set OneSignal rest api endpoint if you wish to using options.
By default the library uses `https://onesignal.com/api/v1` for api endpoint.
  
```js      
// With default options
const userClient = new OneSignal.UserClient('userAuthKey');

// With custom API endpoint
const userClient = new OneSignal.UserClient('userAuthKey', { apiRoot: 'https://onesignal.com/api/v2'});
```     

### Create notification      

https://documentation.onesignal.com/reference/create-notification 

```ts
.createNotification(body: CreateNotificationBody): Promise<ClientResponse>
```

Please read the sections above to learn how to create a `Client` object.

```js      
// See all fields: https://documentation.onesignal.com/reference/create-notification
const notification = {
  contents: {
    'tr': 'Yeni bildirim',
    'en': 'New notification',
  },
  included_segments: ['Subscribed Users'],
  filters: [
    { field: 'tag', key: 'level', relation: '>', value: 10 }
  ]
};

// using async/await
try {
  const response = await client.createNotification(notification);
  console.log(response.body.id);
} catch (e) {
  if (e instanceof OneSignal.HTTPError) {
    // When status code of HTTP response is not 2xx, HTTPError is thrown.
    console.log(e.statusCode);
    console.log(e.body);
  }
}

// or you can use promise style:
client.createNotification(notification)
  .then(response => {})
  .catch(e => {});
```      
    
### Cancel notification   

https://documentation.onesignal.com/reference/cancel-notification

```ts
.cancelNotification(notificationId: string): Promise<ClientResponse>
```  
 
```js      
const response = await client.cancelNotification('notification-id');
console.log(response.body);
console.log(response.headers);
console.log(response.statusCode);    
```      
      
### View notifications      

https://documentation.onesignal.com/reference/view-notifications

```ts
.viewNotifications(query?: ViewNotificationsQuery): Promise<ClientResponse>
```  
 
```js      
// without query
const response = await client.viewNotifications();
console.log(response.body);

// with query
const response = await client.viewNotifications({ limit:10, kind: 2, offset: 2 });
```      
      
### View notification      

https://documentation.onesignal.com/reference/view-notification

```ts
.viewNotification(notificationId: string): Promise<ClientResponse>
```  
 
```js      
const response = await client.viewNotification('notification-id');
console.log(response.body);  
```       
      
### View apps   

https://documentation.onesignal.com/reference/view-apps-apps 

You should use `UserClient` for view apps since it requires User Auth Key  
   
```ts
.viewApps(): Promise<ClientResponse>
```  
 
```js      
const response = await userClient.viewApps();
console.log(response.body);
```      
      
### Create an app      

https://documentation.onesignal.com/reference/create-an-app

You should use `UserClient` for view apps since it requires User Auth Key  
   
```ts
.createApp(body: CreateAppBody): Promise<ClientResponse>
```  
 
```js      
const response = await userClient.createApp( { name: 'APP 1' });
console.log(response.body);
```      
      
### Update an app      

https://documentation.onesignal.com/reference/update-an-app

You should use `UserClient` for view apps since it requires User Auth Key  
   
```ts
.updateApp(appId: string, body: UpdateAppBody): Promise<ClientResponse>
```  
 
```js      
const response = await userClient.updateApp( 'app-id',{ site_name: 'test' });
console.log(response.body);
```         
      
### View devices      

https://documentation.onesignal.com/reference/view-devices

```ts
.viewDevices(query?: LimitOffsetQuery): Promise<ClientResponse>
```  
 
```js      
const response = await client.viewDevices({ limit: 200, offset: 0 });
console.log(response.body);
```       
         
      
### View device   
   
https://documentation.onesignal.com/reference/view-device

```ts
.viewDevice(identifier: string): Promise<ClientResponse>
```  
 
```js      
const response = await client.viewDevice('device-id');
console.log(response.body);
```         
      
### Add a device      
   
https://documentation.onesignal.com/reference/add-a-device 

```ts
.addDevice(body: AddDeviceBody): Promise<ClientResponse>
```  
 
```js      
const response = await client.addDevice({
  device_type: 'ios',
  identifier: 'id1',
});
console.log(response.body);
```         
      
### Edit a device      
   
https://documentation.onesignal.com/reference/edit-device

```ts
.editDevice(deviceId: string, body: EditDeviceBody): Promise<ClientResponse>
```  
 
```js      
const response = await client.editDevice('device-id',{
  identifier: 'id2',
});
console.log(response.body);
```     

### Edit tags with external user id
   
https://documentation.onesignal.com/reference/edit-tags-with-external-user-id

```ts
.editTagsWithExternalUserIdDevice(externalUserId: string, body: EditTagsBody): Promise<ClientResponse>
```  
 
```js      
const response = await client.editTagsWithExternalUserIdDevice('external-user-id', {
  tags: {
    customTag: "customValue"
  },
});
console.log(response.body);
```     

### New Session     
   
https://documentation.onesignal.com/reference/new-session

```ts
.newSession(deviceId: string, body: NewSessionBody): Promise<ClientResponse>
```  
 
```js      
const response = await client.newSession('device-id',{
  language: 'tr',
});
console.log(response.body);
```     
  
### New Purchase  
   
https://documentation.onesignal.com/reference/new-purchase

```ts
.newPurchase(deviceId: string, body: NewPurchaseBody): Promise<ClientResponse>
```  
 
```js      
const response = await client.newPurchase('device-id',{
  purchases: [...],
});
console.log(response.body);
```     
  
### Increment Session Length  
   
https://documentation.onesignal.com/reference#increment-session-length

```ts
.incrementSessionLength(deviceId: string, body: IncrementSessionLengthBody): Promise<ClientResponse>
```  
 
```js      
const response = await client.incrementSessionLength('device-id',{
  state: '',
  active_time: 11,
});
console.log(response.body);
```     
  
### CSV Export      
   
https://documentation.onesignal.com/reference/csv-export

```ts
.exportCSV(body: ExportCSVBody): Promise<ClientResponse>
```  
 
```js      
const response = await client.exportCSV({});
console.log(response.body);
```      
      
### Create Segment   
   
https://documentation.onesignal.com/reference/create-segments

```ts
.createSegment(body: CreateSegmentBody): Promise<ClientResponse>
```  
 
```js      
const response = await client.createSegment({
  name: 'new-segment',
  filters: [..]
});
console.log(response.body);
```         

### Delete Segment   
   
https://documentation.onesignal.com/reference/delete-segments

```ts
.deleteSegment(segmentId: string): Promise<ClientResponse>
```  
 
```js      
const response = await client.deleteSegment('segment-id1');
console.log(response.body);
```   
      
## Tests      
      
Running all tests, coverage, build:      
```bash      
$ npm run test      
$ npm run test-integration      
$ npm run coverage      
$ npm run build      
```      
## Contributing

### TL;DR

To send a pull request:  
 - Fork the repo  
 - Clone the forked repo on your computer  
 - Switch to master branch  
 - Create a feature branch (`git checkout -b feature/new-feature-name`)  
 - Make your changes and add new tests if necessary  
 - Push your changes to your fork  
 - Open a pull request

## License      
      
This project is under the MIT license.
