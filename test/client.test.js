'use strict';

var expect = require('chai').expect;
var OneSignal = require('../lib');
var ClientMock = require('./mocks/client');
var NotificationMock = require('./mocks/notification');
var Constants = require('../lib/constants');

describe('Client Tests', function () {
  describe('Create Client', function () {
    it('Expect to throw an error with non object data when creating a client', function () {
      var client = ClientMock.invalidClientWithEmptyData;
      try {
        var response = new OneSignal.Client(client);
        expect(response).to.equal(undefined);
      } catch (err) {
        expect(err).to.be.an('string');
        expect(err).to.equal('credentials parameter must be a JSON object');
      }
    })

    it('Expect to throw an error with invalid userAuthKey format', function () {
      var client = ClientMock.invalidUserAuthKey;
      try {
        var response = new OneSignal.Client(client);
        expect(response).to.be.equal(undefined);
      } catch (err) {
        expect(err).to.be.an('string');
        expect(err).to.equal('userAuthKey must be a string');
      }
    })

    it('Expect to throw an error without app object', function () {
      var client = ClientMock.invalidAppProperty;
      try {
        var response = new OneSignal.Client(client);
        expect(response).to.equal(undefined);
      } catch (err) {
        expect(err).to.be.an('object');
      }
    })

    it('Expect to throw an error without appAuthKey property on app object', function () {
      var client = ClientMock.invalidAppWithouAuthProperty;
      try {
        var response = new OneSignal.Client(client);
        expect(response).to.equal(undefined);
      } catch (err) {
        expect(err).to.be.an('string');
        expect(err).to.equal('app must contain appAuthKey');
      }
    })

    it('Expect to throw an error without appId property on app object', function () {
      var client = ClientMock.invalidAppWithoutIdProperty;
      try {
        var response = new OneSignal.Client(client);
        expect(response).to.equal(undefined);
      } catch (err) {
        expect(err).to.be.an('string');
        expect(err).to.equal('app must contain appId');
      }
    })

    it('Expect to valid a JSON object to create a client', function () {
      var client = ClientMock.validClient;
      var response = new OneSignal.Client(client);
      expect(response).to.be.an('object');
      expect(response.API_URI).to.be.an('string');
      expect(response.API_URI).to.equal(Constants.API_ROOT);
      expect(response.userAuthKey).to.equal(client.userAuthKey);
      expect(response.app).to.be.an('object');
      expect(response.app.appAuthKey).to.equal(client.app.appAuthKey);
      expect(response.app.appId).to.equal(client.app.appId);
    })

    it('Expect to create empty client', function () {
      var client = ClientMock.validEmptyClient;
      var response = new OneSignal.Client(client);
      expect(response).to.be.an('object');
      expect(response.API_URI).to.equal(Constants.API_ROOT);
    })

    it('Expect to set userAuthKey and app object for empty client', function () {
      var client = ClientMock.validEmptyClient;
      var response = new OneSignal.Client(client);
      response.userAuthKey = ClientMock.validUserAuth;
      response.setApp(ClientMock.validSetApp);
      expect(response).to.be.an('object');
      expect(response.API_URI).to.be.an('string');
      expect(response.API_URI).to.equal(Constants.API_ROOT);
      expect(response.userAuthKey).to.equal(ClientMock.validUserAuth);
      expect(response.app).to.be.an('object');
      expect(response.app.appAuthKey).to.equal(ClientMock.validSetApp.appAuthKey);
      expect(response.app.appId).to.equal(ClientMock.validSetApp.appId);
    })
  })

  describe('Send Notification', function () {
    it('Expect to throw an error when sending a notification withou a notification object', function () {
      var client = ClientMock.validClient;
      var clientObject = new OneSignal.Client(client);
      var notification = NotificationMock.emptyNotification;
      try {
        var response = clientObject.sendNotification(notification);
        expect(response).to.equal(undefined);
      } catch (err) {
        expect(err).to.be.an('string');
        expect(err).to.equal('notification parameter must be a typeof Notification object.');
      }
    })

    it('Expect to throw an error when sending a notification for client without app', function () {
      var client = ClientMock.validEmptyClient;
      var clientObject = new OneSignal.Client(client);
      var notification = NotificationMock.validWithContents;
      var notificationObject = new OneSignal.Notification(notification);
      try {
        var response = clientObject.sendNotification(notificationObject);
        expect(response).to.equal(undefined);
      } catch (err) {
        expect(err).to.be.an('string');
        expect(err).to.equal('You must set either an "app" or "apps" on Client');
      }
    })
  })
})
